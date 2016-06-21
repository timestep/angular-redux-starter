export default function ProfileCtrl(
  ngProgress,
  profileViewHelper,
  profile,
  $log,
  $state,
  helper,
  medicalConditions,
  householdPets,
  currentMedications,
  knownAllergies,
  resultsList) {

  var vm = this;

  var MAX_FEV1_VALUE = 11;
  var MAX_FEV1_DECIMAL = 10;

  vm.session = null;
  vm.profilePhoto = null;
  vm.pageReady = null;
  vm.setup = null;

  vm.states = helper.statesAndProvinceList;
  vm.fev1Value = R.range(0, MAX_FEV1_VALUE);
  vm.fev1Decimal = R.range(0, MAX_FEV1_DECIMAL);
  vm.days = profileViewHelper.getDays();
  vm.years = profileViewHelper.getYears();
  vm.resultYears = profileViewHelper.getResultYears();

  vm.medicalConditions = medicalConditions;
  vm.householdPets = householdPets;

  vm.setup = profileViewHelper.currentMedicationsConfig;
  vm.foodSetup = profileViewHelper.knownAllergiesConfig;

  //DATA
  vm.medsData = medicalConditions;
  vm.petsData = householdPets;
  vm.resultsData = resultsList;

  //knownAllergies DATA
  vm.animalsData = knownAllergies.animals;
  vm.dustMitesData = knownAllergies.dustMites;
  vm.drugsData = knownAllergies.drugs;
  vm.grassData = knownAllergies.grass;
  vm.moldData = knownAllergies.mold;
  vm.treesData = knownAllergies.trees;
  vm.weedsData = knownAllergies.weeds;
  vm.otherData = knownAllergies.other;
  vm.foodFishData = knownAllergies.fishFood;
  vm.foodFruitData = knownAllergies.fruitFood;
  vm.foodFungiData = knownAllergies.fungiFood;
  vm.foodMeatData = knownAllergies.meatFood;
  vm.foodNutData = knownAllergies.nutsFood;
  vm.foodShellfishData = knownAllergies.shellfishFood;
  vm.foodSpicesData = knownAllergies.spicesFood;
  vm.foodVegetablesData = knownAllergies.vegetablesFood;
  vm.foodOtherData = knownAllergies.otherFood;

  //currentMedications DATA
  vm.inhaledSteroidsBronchodilatorsData = currentMedications.inhaledSteroidsBronchodilators;
  vm.inhaledSteroidsData = currentMedications.inhaledSteroids;
  vm.bronchodilatorsData = currentMedications.bronchodilators;
  vm.asthmaPillsData = currentMedications.asthmaPills;
  vm.medsPillsData = currentMedications.pillsNose;
  vm.medsSpraysData = currentMedications.nasalSpraysNoseSteroids;
  vm.medsSpraysAntihistaminesData = currentMedications.nasalSpraysNoseAntihistamines;
  vm.medsEyesData = currentMedications.eyes;
  vm.medsAllergenData = currentMedications.allergenImmunotherapy;
  vm.medsAdrenalineData = currentMedications.adrenalineInjections;


  vm.load = function () {
    profileViewHelper.resetModels(vm);
    profile.getProfile()
      .then(function (res) {

        vm.session = res.session;
        vm.profilePhoto = res.profilePhoto;
        ngProgress.complete();
        vm.pageReady = true;
        profileViewHelper.loadDropDownMenus(vm);
        vm.session.state = vm.session.state;
        profileViewHelper.getGender(vm.session.gender, vm);
        profileViewHelper.loadFEV1(vm);
        profileViewHelper.loadFENO(vm);

      }).then(null, function (err) {
        $log.error(err);
      });
  };
  vm.save = function () {

    R.map(profileViewHelper.updateProfile(vm, vm.petsModel))(householdPets);
    R.map(profileViewHelper.updateProfile(vm, vm.medsModel))(
      medicalConditions);

    //Current Medications
    for (var i = 0; i < vm.setup.length; i++) {
      R.map(profileViewHelper.updateProfile(vm, vm[vm.setup[i].model]))
      (currentMedications[vm.setup[i].type]);
    }

    //Known Allergies
    for (i = 0; i < vm.foodSetup.length; i++) {
      R.map(profileViewHelper.updateProfile(vm, vm[vm.foodSetup[i].model]))
      (knownAllergies[vm.foodSetup[i].type]);
    }

    //Results
    if (vm.session.feno) {
      profileViewHelper.setFENO(vm, vm.session.feno);
    }
    if (vm.session.fev1) {
      profileViewHelper.setFEV1(vm, vm.session.fev1);
    }

    profileViewHelper.setGender(vm.genderSelectedMale, vm.genderSelectedFemale,
      vm);

    ngProgress.start();
    vm.pageReady = false;

    profile.updateProfile(vm.session)
      .then(function (res) {
        console.log('completed:', res);
        $state.go($state.current, {}, {
          reload: true
        });
      }).then(null, function (error) {
        toastr.error('Error fetching profile from server.');
        vm.load();
        $log.error(error);
      });
  };

  ngProgress.start();
  vm.load();

};
