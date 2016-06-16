'use strict';

angular.module('ka-profile')
  .service('profile', function ($http, helper, session) {
    var user = {};

    return {
      updateProfile: function (profile) {
        var username = session.viewUserCtx.username || session.userCtx.username;
        return $http.put('/api/' + username + '/profile', profile);
      },
      getProfile: function (overrideUsername) {
        // Default username to use is the one we have stored in the user context.
        var username = session.viewUserCtx.username || session.userCtx.username;

        // If a username is passed to us, override the user context
        // and try and fetch this user's profile instead.
        if (overrideUsername) {
          username = overrideUsername;
        }

        var getUserProfile = function () {
          return $http.get('/api/' + username + '/profile')
            .then(function (res) {
              user.session = res.data;

              if (session.viewUserCtx.username) {
                session.updateViewUserCtx(res.data);
              }
            });
        };
        var getUserPhoto = function () {
          user.profilePhoto = '';
          return $http.get('/api/profile-photo/' + username)
            .then(function (res) {
                user.profilePhoto = 'data:image/jpg;base64,' + res.data;
                return user;
              },
              function () {
                user.profilePhoto = '';
                return user;
              });
        };
        return R.pCompose(getUserPhoto, getUserProfile)();
      }
    };
  })
  .service('profileViewHelper', function (medicalConditions, householdPets,
    currentMedications, knownAllergies) {
    var fenoVariable;
    var fev1Variable;
    var getData = function (data) {
      return R.map(R.compose(R.head, R.props(['id'])))(data);
    };
    var compareItem = function (x, category, model) {
      if (R.contains(x)(category)) {
        var newObj = {
          id: ''
        };
        newObj.id = x;
        model.push(newObj);
      }
    };
    return {
      compareItem: compareItem,
      getData: getData,
      loadDropDownMenus: function (vm) {

        function isKeyApplicable(sessionKey) {
          var checkAllCategoryTypes = R.curry(function (type, xx) {
            if (R.contains(sessionKey, getData(type[xx.type]))) {
              compareItem(sessionKey,
                getData(type[xx.type]),
                vm[xx.model]);
            }
          });

          //Known Allergies
          R.map(checkAllCategoryTypes(knownAllergies), vm.foodSetup);

          //Current Medications
          R.map(checkAllCategoryTypes(currentMedications), vm.setup);

          //Medical Conditions
          if (R.contains(sessionKey,
            getData(medicalConditions))) {
            compareItem(sessionKey,
              getData(medicalConditions),
              vm.medsModel);
          }

          //Household Pets
          if (R.contains(sessionKey,
            getData(householdPets))) {
            compareItem(sessionKey,
              getData(householdPets),
              vm.petsModel);
          }
        }
        R.compose(R.map(isKeyApplicable), R.keysIn)(vm.session);
      },
      updateProfile: R.curry(function (vm, itemGroup, item) {
        var isSet = R.propEq('id', item.id);
        var results = R.filter(isSet, itemGroup);
        if (R.head(results) !== undefined) {
          vm.session[item.id] = true;
        } else {
          vm.session[item.id] = false;
        }
      }),
      getGender: function (gender, vm) {
        if (gender === 'male') {
          vm.genderSelectedMale = true;
        } else if (gender === 'female') {
          vm.genderSelectedFemale = true;
        }
      },
      setGender: function (male, female, vm) {
        vm.session.gender = '';
        if (male) {
          vm.session.gender = 'male';
        }
        if (female) {
          vm.session.gender = 'female';
        }
      },
      loadDefaultResults: function (vmResult) {
        if (vmResult) {
          vmResult.date = moment().toDate().toString();
          vmResult.value = 0;
          angular.extend(vmResult, this.parseDate(vmResult.date));
        }
      },
      loadFENO: function (vm) {
        if (!vm.session.feno) {
          return;
        }

        angular.extend (vm.session.feno, this.parseDate(vm.session.feno.date));
        vm.session.feno.value = Number(vm.session.feno.value);
        // fev1Variable is used to check if new entry was created by user.
        fenoVariable = jQuery.extend({}, vm.session.feno);

      },
      loadFEV1: function (vm) {
        if (!vm.session.fev1) {
          return;
        }

        var strValue = Number(vm.session.fev1.value).toFixed(2).toString();
        angular.extend (vm.session.fev1, this.parseDate(vm.session.fev1.date));
        vm.session.fev1.wholeNum = Number(strValue.replace (/(\.[0-9]+)$/g, '')) || 0;
        vm.session.fev1.firstDecimal = Number(strValue.replace(/^[0-9]+\./g, '').substring(0, 1)) || 0;
        vm.session.fev1.secondDecimal = Number(strValue.replace(/^[0-9]+\./g, '').substring(1, 2)) || 0;
        // fev1Variable is used to check if new entry was created by user.
        fev1Variable = jQuery.extend({}, vm.session.fev1);
      },
      setFENO: function (vm, feno) {
        var selectedMDate = moment(feno.year + '-' + feno.month + '-' + feno.day, 'YYYY-MM-DD');
        var tempFeno = {
          value: Number(feno.value),
          date: selectedMDate.isSame(moment(), 'day') ? moment().toDate().toString() : selectedMDate.toDate().toString(),
          saveDate: moment()
        };
        if (typeof feno === 'undefined') {
          vm.session.feno = {};
          return;
        // check to see if a new FENO value was entered by a user, if not just return
        } else if (fenoVariable.value === tempFeno.value &&
                   moment(fenoVariable.date).format('YYYY-MM-DD') === selectedMDate.format('YYYY-MM-DD')) {
          vm.session.feno.saveDate = moment().subtract(1, 'year');
          return;
        }

        // set FENO
        vm.session.feno = tempFeno;

      },
      setFEV1: function (vm, fev1) {
        var selectedMDate = moment(fev1.year + '-' + fev1.month + '-' + fev1.day, 'YYYY-MM-DD');
        var val = Number(fev1.wholeNum) +
          Number(fev1.firstDecimal / 10) +
          Number(fev1.secondDecimal / 100);
        var tempFev1 = {
          value: val.toFixed(2),
          date: selectedMDate.isSame(moment(), 'day') ? moment().toDate().toString() : selectedMDate.toDate().toString(),
          saveDate: moment()
        };
        if (typeof fev1 === 'undefined') {
          vm.session.fev1 = {};
          return;
        //check to see if a new FEV1 value was entered by a user, if not just return
        } else if (fev1Variable.value &&
          fev1Variable.value.toFixed(2) === tempFev1.value &&
          moment(fev1Variable.date).format('YYYY-MM-DD') === selectedMDate.format('YYYY-MM-DD')) {
          vm.session.fev1.saveDate = moment().subtract(1, 'year');
          return;
        }

        //set FEV1
        vm.session.fev1 = tempFev1;
      },
      resetModels: function (vm) {
        //Household Pets MODEL
        vm.petsModel = [];

        //Medical Conditions MODEL
        vm.medsModel = [];

        //Current Medications MODEL
        vm.medsAdrenalineModel = [];
        vm.medsAllergenModel = [];
        vm.medsEyesModel = [];
        vm.medsSpraysModel = [];
        vm.medsSpraysAntihistaminesModel = [];
        vm.medsPillsModel = [];
        vm.asthmaPillsModel = [];
        vm.bronchodilatorsModel = [];
        vm.inhaledSteroidsModel = [];
        vm.inhaledSteroidsBronchodilatorsModel = [];

        //Known Allergies MODEL
        vm.animalsModel = [];
        vm.dustMitesModel = [];
        vm.drugsModel = [];
        vm.grassModel = [];
        vm.moldModel = [];
        vm.treesModel = [];
        vm.weedsModel = [];
        vm.otherModel = [];
        vm.foodFishModel = [];
        vm.foodFruitModel = [];
        vm.foodFungiModel = [];
        vm.foodMeatModel = [];
        vm.foodNutModel = [];
        vm.foodShellfishModel = [];
        vm.foodSpicesModel = [];
        vm.foodVegetablesModel = [];
        vm.foodOtherModel = [];
      },
      parseDate: function (date) {

        // Backend is saving dates in UTC and we convert back to local time on the frontend
        var mDate = moment(date);

        // Month is zero-indexed
        var month = (mDate.month() + 1 < 10 ? '0' : '') + (mDate.month() + 1);
        var day = (mDate.date() < 10 ? '0' : '') + mDate.date();
        return {
          month: month.toString(),
          day: day.toString(),
          year: mDate.year().toString()
        };
      },
      getYears: function () {
        var y = new Date().getFullYear(),
          minusOneHundred = y - 100;

        var years = [];
        while (y >= minusOneHundred) {
          years.push(String(y));
          y--;
        }
        return years;
      },
      getResultYears: function () {
        var EARLIEST_YEAR = moment().year() - 1;
        var years = [];

        var present = moment().year();
        while (present >= EARLIEST_YEAR) {
          years.push(String(present));
          present--;
        }

        return years;
      },
      getDays: function () {
        var day = 1;
        var days = [];
        while (day <= 31) {
          if (day < 10) {
            day = '0' + day;
          }
          days.push(String(day));
          day++;
        }
        return days;
      },
      currentMedicationsConfig: [{
        title: 'Eyes',
        data: 'medsEyesData',
        model: 'medsEyesModel',
        type: 'eyes'
      }, {
        title: 'Adrenaline Injections',
        data: 'medsAdrenalineData',
        model: 'medsAdrenalineModel',
        type: 'adrenalineInjections'
      }, {
        title: 'Allergen Immunotherapy',
        data: 'medsAllergenData',
        model: 'medsAllergenModel',
        type: 'allergenImmunotherapy'
      }, {
        title: 'Asthma Pills (Lungs)',
        data: 'asthmaPillsData',
        model: 'asthmaPillsModel',
        type: 'asthmaPills'
      }, {
        title: 'Bronchodilators (Lungs)',
        data: 'bronchodilatorsData',
        model: 'bronchodilatorsModel',
        type: 'bronchodilators'
      }, {
        title: 'Inhaled Steroids (Lungs)',
        data: 'inhaledSteroidsData',
        model: 'inhaledSteroidsModel',
        type: 'inhaledSteroids'
      }, {
        title: 'Inhaled Steroids with Long Acting Bronchodilators (Lungs)',
        data: 'inhaledSteroidsBronchodilatorsData',
        model: 'inhaledSteroidsBronchodilatorsModel',
        type: 'inhaledSteroidsBronchodilators'
      }, {
        title: 'Nasal Sprays (Nose and Sinuses)',
        data: 'medsSpraysData',
        model: 'medsSpraysModel',
        type: 'nasalSpraysNoseSteroids'
      }, {
        title: 'Nasal Sprays Antihistamines (Nose and Sinuses)',
        data: 'medsSpraysAntihistaminesData',
        model: 'medsSpraysAntihistaminesModel',
        type: 'nasalSpraysNoseAntihistamines'
      }, {
        title: 'Pills (Nose and Sinuses)',
        data: 'medsPillsData',
        model: 'medsPillsModel',
        type: 'pillsNose'
      }],
      knownAllergiesConfig: [{
        title: 'Animals',
        data: 'animalsData',
        model: 'animalsModel',
        type: 'animals'
      }, {
        title: 'Dust Mites',
        data: 'dustMitesData',
        model: 'dustMitesModel',
        type: 'dustMites'
      }, {
        title: 'Drugs',
        data: 'drugsData',
        model: 'drugsModel',
        type: 'drugs'
      }, {
        title: 'Grass',
        data: 'grassData',
        model: 'grassModel',
        type: 'grass'
      }, {
        title: 'Mold Spores',
        data: 'moldData',
        model: 'moldModel',
        type: 'mold'
      }, {
        title: 'Trees',
        data: 'treesData',
        model: 'treesModel',
        type: 'trees'
      }, {
        title: 'Weeds',
        data: 'weedsData',
        model: 'weedsModel',
        type: 'weeds'
      }, {
        title: 'Other',
        data: 'otherData',
        model: 'otherModel',
        type: 'other'
      }, {
        title: 'Fish (Food)',
        data: 'foodFishData',
        model: 'foodFishModel',
        type: 'fishFood'
      }, {
        title: 'Fruits (Food)',
        data: 'foodFruitData',
        model: 'foodFruitModel',
        type: 'fruitFood'
      }, {
        title: 'Fungi (Food)',
        data: 'foodFungiData',
        model: 'foodFungiModel',
        type: 'fungiFood'
      }, {
        title: 'Meats (Food)',
        data: 'foodMeatData',
        model: 'foodMeatModel',
        type: 'meatFood'
      }, {
        title: 'Nuts & Seeds (Food)',
        data: 'foodNutData',
        model: 'foodNutModel',
        type: 'nutsFood'
      }, {
        title: 'Shellfish (Food)',
        data: 'foodShellfishData',
        model: 'foodShellfishModel',
        type: 'shellfishFood'
      }, {
        title: 'Spices (Food)',
        data: 'foodSpicesData',
        model: 'foodSpicesModel',
        type: 'spicesFood'
      }, {
        title: 'Vegetables (Food)',
        data: 'foodVegetablesData',
        model: 'foodVegetablesModel',
        type: 'vegetablesFood'
      }, {
        title: 'Other (Food)',
        data: 'foodOtherData',
        model: 'foodOtherModel',
        type: 'otherFood'
      }]
    };
  });