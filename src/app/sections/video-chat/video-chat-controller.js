angular.module('ka-video-chat',
  [
    'ka-session',
    'ka-video-chat-controls',
    'ka-video-chat-queue',
    'ka-video-chat-session'
  ])
  .controller('VideoChatCtrl',
    function (
      $log,
      $modal,
      $state,
      $rootScope,
      allerrhythm,
      currentMedications,
      helper,
      householdPets,
      knownAllergies,
      medicalConditions,
      profileViewHelper,
      resultsList,
      session,
      videoChatControls,
      videoChatQueue,
      videoChatSession
    ) {
      var vc = this;
      videoChatSession.init();

      vc.control = videoChatControls;
      vc.queue = videoChatQueue;
      vc.sessionstate = videoChatSession.state;

      vc.open = {
        callHistory: function () {
          $state.go('video-chat-history');
        },
        preferences: function () {
          var preferencesModalInstance = $modal.open({
            templateUrl: 'app/sections/video-chat/video-chat-preferences.html',
            controller: 'VideoChatPreferencesCtrl',
            controllerAs: 'videoChatPreferences',
            size: 'lg'
          });

          preferencesModalInstance.result.then(function(selectedItem) {
            vc.selected = selectedItem;
          }, function() {
            $log.info('Modal dismissed at: ' + new Date());
          });
        }
      };

    /*
       *Setting up for getting the caller profile in Quick Chat
       */
      var MAX_FEV1_VALUE = 11;
      var MAX_FEV1_DECIMAL = 10;

      vc.session = null;
      vc.profilePhoto = null;
      vc.pageReady = null;
      vc.setup = null;

      vc.states = helper.statesAndProvinceList;
      vc.fev1Value = R.range(0, MAX_FEV1_VALUE);
      vc.fev1Decimal = R.range(0, MAX_FEV1_DECIMAL);
      vc.days = profileViewHelper.getDays();
      vc.years = profileViewHelper.getYears();
      vc.resultYears = profileViewHelper.getResultYears();

      vc.medicalConditions = medicalConditions;
      vc.householdPets = householdPets;
      vc.setup = profileViewHelper.currentMedicationsConfig;
      vc.foodSetup = profileViewHelper.knownAllergiesConfig;

      // DATA
      vc.medsData = medicalConditions;
      vc.petsData = householdPets;
      vc.resultsData = resultsList;

      // knownAllergies DATA
      vc.animalsData = knownAllergies.animals;
      vc.drugsData = knownAllergies.drugs;
      vc.grassData = knownAllergies.grass;
      vc.moldData = knownAllergies.mold;
      vc.treesData = knownAllergies.trees;
      vc.weedsData = knownAllergies.weeds;
      vc.otherData = knownAllergies.other;
      vc.foodFishData = knownAllergies.fishFood;
      vc.foodFruitData = knownAllergies.fruitFood;
      vc.foodFungiData = knownAllergies.fungiFood;
      vc.foodMeatData = knownAllergies.meatFood;
      vc.foodNutData = knownAllergies.nutsFood;
      vc.foodShellfishData = knownAllergies.shellfishFood;
      vc.foodSpicesData = knownAllergies.spicesFood;
      vc.foodVegetablesData = knownAllergies.vegetablesFood;
      vc.foodOtherData = knownAllergies.otherFood;

      // currentMedications DATA
      vc.inhaledSteroidsBronchodilatorsData = currentMedications.inhaledSteroidsBronchodilators;
      vc.inhaledSteroidsData = currentMedications.inhaledSteroids;
      vc.bronchodilatorsData = currentMedications.bronchodilators;
      vc.asthmaPillsData = currentMedications.asthmaPills;
      vc.medsPillsData = currentMedications.pillsNose;
      vc.medsSpraysData = currentMedications.nasalSpraysNoseSteroids;
      vc.medsSpraysAntihistaminesData = currentMedications.nasalSpraysNoseAntihistamines;
      vc.medsEyesData = currentMedications.eyes;
      vc.medsAllergenData = currentMedications.allergenImmunotherapy;
      vc.medsAdrenalineData = currentMedications.adrenalineInjections;

      var originalUserData = null;
      vc.toggleSaveEditButtons = function() {
        vc.saveButton = !vc.saveButton;
        vc.saveProfileSuccess = false;
      };

      vc.setCallerProfile = function (email) {
        vc.apiCall = videoChatSession.getUserProfile(email);
        vc.callerEmail = email;
        vc.loadProfile();
      };

      vc.resetProfile = function () {
        profileViewHelper.resetModels(vc);
        profileViewHelper.loadDropDownMenus(vc);
        vc.session = R.cloneObj(originalUserData);
        vc.toggleSaveEditButtons();
      };

      vc.getAllerRhythm = function (email) {
        allerrhythm.start(email);
      };

      // Really hacky way of forcing a redraw for the react
      // svg. Not happy with this at all, but I tried every
      // combination of d3.select('').draw(..).
      // The above doesn't work mostly because the data lives
      // inside react, so I don't have the ability to add
      // or remove data to the data array.
      // This way forces a double click on the 'FullScreen' button
      // to use jQuery to re-draw the window.
      vc.resizeAllerRhythm = function () {
        setTimeout(function () {
          var fullScreenBtn = $('.fullscreen button');
          if (fullScreenBtn.length > 0) {
            fullScreenBtn[0].click();
            fullScreenBtn[0].click();
          }
        }, 100);
      };

      vc.answerCall = function (call) {
        vc.control.startCall(call.callId);
        vc.setCallerProfile(call.email);
        vc.getAllerRhythm(call.email);
      };

      vc.loadProfile = function () {
        vc.callerProfile = null;
        vc.saveProfileSuccess = false;
        profileViewHelper.resetModels(vc);
        vc.apiCall.then(function (res) {

          vc.session = res.session;
          originalUserData = R.cloneObj(res.session);
          vc.profilePhoto = res.profilePhoto;
          vc.pageReady = true;
          profileViewHelper.loadDropDownMenus(vc);
          vc.session.state = vc.session.state;
          profileViewHelper.getGender(vc.session.gender, vc);
          profileViewHelper.loadFEV1(vc);
          profileViewHelper.loadFENO(vc);
          vc.callerProfile = true;

        }).then(null, function (err) {
          $log.error(err);
        });
      };

      vc.closeProfile = function () {
        vc.callerProfile = false;
      };

      $rootScope.$on('clientHangUp', function () {
        vc.callerProfile = false;
      });

      vc.saveProfile = function () {
        vc.pageReady = false;
        R.map(profileViewHelper.updateProfile(vc, vc.petsModel))(householdPets);
        R.map(profileViewHelper.updateProfile(vc, vc.medsModel))(
          medicalConditions);

        // Current Medications
        for (var i = 0; i < vc.setup.length; i++) {
          R.map(profileViewHelper.updateProfile(vc, vc[vc.setup[i].model]))(currentMedications[vc.setup[i].type]);
        }

        // Known Allergies
        for (i = 0; i < vc.foodSetup.length; i++) {
          R.map(profileViewHelper.updateProfile(vc, vc[vc.foodSetup[i].model]))(knownAllergies[vc.foodSetup[i].type]);
        }

        // Results
        profileViewHelper.setFEV1(vc, vc.session.fev1);
        profileViewHelper.setFENO(vc, vc.session.feno);

        videoChatSession.updateUserProfile(vc.callerEmail, vc.session)
          .then(function (res) {
            console.log('completed', res);
            vc.saveProfileSuccess = true;
            vc.pageReady = true;
            vc.saveButton = false;
          }).then(null, function (error) {
            toastr.error('Error fetching profile from server.');
            vc.loadProfile();
            vc.saveProfileSuccess = false;
            $log.error(error);
          });
      };

    });
