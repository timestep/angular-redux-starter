/*jshint expr:true*/

'use strict';

function getService(serviceName) {
  var injectedService;
  inject([serviceName,
    function (serviceInstance) {
      injectedService = serviceInstance;
    }
  ]);
  return injectedService;
}
describe('the profileViewHelper service', function () {
  beforeEach(module('ka-profile'));

  it('should exist', inject(function (profileViewHelper) {
    expect(profileViewHelper).to.be.truthy;
    expect(profileViewHelper).to.respondTo('getData');
    expect(profileViewHelper).to.respondTo('compareItem');
    expect(profileViewHelper).to.respondTo('loadDropDownMenus');
    expect(profileViewHelper).to.respondTo('updateProfile');
    expect(profileViewHelper).to.respondTo('getGender');
    expect(profileViewHelper).to.respondTo('setGender');
    expect(profileViewHelper).to.respondTo('resetModels');
    expect(profileViewHelper).to.respondTo('parseDate');
    expect(profileViewHelper).to.respondTo('loadDefaultResults');
    expect(profileViewHelper).to.respondTo('getYears');
    expect(profileViewHelper).to.respondTo('getDays');
    expect(profileViewHelper.currentMedicationsConfig).to.be.array;
    expect(profileViewHelper.knownAllergiesConfig).to.be.array;
  }));
});

describe('profileViewHelper.resetModels()', function () {
  beforeEach(module('ka-profile'));

  it('should set reset session object', inject(function (profileViewHelper) {
    var vm = {};
    vm.petsModel = ['test'];
    vm.medsModel = ['test'];
    vm.medsAdrenalineModel = ['test'];
    vm.animalsModel = ['test'];

    profileViewHelper.resetModels(vm);
    expect(vm.petsModel).to.deep.eq([]);
    expect(vm.medsModel).to.deep.eq([]);
    expect(vm.medsAdrenalineModel).to.deep.eq([]);
    expect(vm.animalsModel).to.deep.eq([]);
  }));
});

describe('profileViewHelper.getGender()', function () {
  beforeEach(module('ka-profile'));

  it('should set gender based on session object', inject(function (
    profileViewHelper) {
    var vm = {};
    vm.genderSelectedMale = null;
    vm.genderSelectedFemale = null;
    profileViewHelper.getGender('female', vm);
    expect(vm.genderSelectedMale).to.be.null;
    expect(vm.genderSelectedFemale).to.be.true;
    vm.genderSelectedMale = null;
    vm.genderSelectedFemale = null;
    profileViewHelper.getGender('male', vm);
    expect(vm.genderSelectedMale).to.be.true;
    expect(vm.genderSelectedFemale).to.be.null;
  }));
});

describe('profileViewHelper.setGender()', function () {
  beforeEach(module('ka-profile'));

  it('should return gender', inject(function (profileViewHelper) {
    var vm = {};
    vm.session = {
      gender: null
    };
    vm.genderSelectedMale = true;
    vm.genderSelectedFemale = null;
    profileViewHelper.setGender(vm.genderSelectedMale, vm.genderSelectedFemale,
      vm);
    expect(vm.session.gender).to.eq('male');

    vm.session = {
      gender: null
    };
    vm.genderSelectedMale = null;
    vm.genderSelectedFemale = true;
    profileViewHelper.setGender(vm.genderSelectedMale, vm.genderSelectedFemale,
      vm);
    expect(vm.session.gender).to.eq('female');
  }));
});

describe('provileViewHelper.parseDate()', function () {
  beforeEach(module('ka-profile'));

  it('should parse a date into an object with month, day, and year', inject(function (profileViewHelper){
    var delim = '-';
    var sampleYear = '2015';
    var sampleMonth = '02';
    var sampleDay = '07';
    var sampleFullDate = sampleYear + delim + sampleMonth + delim + sampleDay;
    var parsedDate = profileViewHelper.parseDate(sampleFullDate);
    expect(parsedDate.year).to.eq(sampleYear.toString());
    expect(parsedDate.day).to.eq(sampleDay.toString());
    expect(parsedDate.month).to.eq(sampleMonth.toString());
  }));
});

describe('profileViewHelper.getYears()', function () {
  beforeEach(module('ka-profile'));

  it('should return last 101 years', inject(function (profileViewHelper) {
    var vm = {};
    var years = profileViewHelper.getYears();
    expect(years.length).to.eq(101);
    expect(years[0]).to.eq('' + moment().year());
    expect(years[100]).to.eq('' + (moment().year() - 100));
  }));
});

describe('profileViewHelper.getDays()', function () {
  beforeEach(module('ka-profile'));

  it('should return 31 dats', inject(function (profileViewHelper) {
    var vm = {};
    var days = profileViewHelper.getDays();
    expect(days.length).to.eq(31);
  }));
});

describe('profileViewHelper.getYears()', function () {
  beforeEach(module('ka-profile'));

  it('should return 31 dats', inject(function (profileViewHelper) {
    var vm = {};
    var days = profileViewHelper.getDays();
    expect(days.length).to.eq(31);
  }));
});

describe('profileViewHelper.currentMedicationsConfig', function () {
  beforeEach(module('ka-profile'));

  it('should contain a config object for currentMedications', inject(function (
    profileViewHelper) {
    var keys = R.compose(R.head, R.map(R.keysIn))(profileViewHelper.currentMedicationsConfig);
    expect(keys).to.deep.eq(['title', 'data', 'model', 'type']);
    expect(profileViewHelper.currentMedicationsConfig.length).to.eq(10);
  }));
});

describe('profileViewHelper.knownAllergiesConfig', function () {
  beforeEach(module('ka-profile'));

  it('should contain a config object for knownAllergiesConfig', inject(
    function (profileViewHelper) {
      var keys = R.compose(R.head, R.map(R.keysIn))(profileViewHelper.knownAllergiesConfig);
      expect(keys).to.deep.eq(['title', 'data', 'model', 'type']);
      expect(profileViewHelper.knownAllergiesConfig.length).to.eq(17);
    }));
});

describe('profileViewHelper.compareItem()', function () {
  beforeEach(module('ka-profile'));

  it('should compare provided items and add to array if it matches', inject(
    function (profileViewHelper) {
      var model = [];
      var category = ['Carrot', 'Celery', 'Corn', 'Lettuce', 'Onions',
        'Potato', 'Tomato'
      ];
      var item = 'Corn';
      profileViewHelper.compareItem(item, category, model);
      expect(model).to.deep.eq([{
        id: 'Corn'
      }]);
      item = 'Beef';
      profileViewHelper.compareItem(item, category, model);
      expect(model).to.deep.eq([{
        id: 'Corn'
      }]);
      item = 'Onions';
      profileViewHelper.compareItem(item, category, model);
      expect(model).to.deep.eq([{
        id: 'Corn'
      }, {
        id: 'Onions'
      }]);
    }));
});


describe('profileViewHelper.getData()', function () {
  beforeEach(module('ka-profile'));

  it('should getData',
    inject(function (currentMedications, knownAllergies, profileViewHelper) {
      var animals = profileViewHelper.getData(knownAllergies.animals);
      var drugs = profileViewHelper.getData(knownAllergies.drugs);
      var dust = profileViewHelper.getData(knownAllergies.dustMites);
      var grass = profileViewHelper.getData(knownAllergies.grass);
      var mold = profileViewHelper.getData(knownAllergies.mold);
      var trees = profileViewHelper.getData(knownAllergies.trees);
      var weeds = profileViewHelper.getData(knownAllergies.weeds);
      var other = profileViewHelper.getData(knownAllergies.other);
      var fishFood = profileViewHelper.getData(knownAllergies.fishFood);
      var fruitFood = profileViewHelper.getData(knownAllergies.fruitFood);
      var fungiFood = profileViewHelper.getData(knownAllergies.fungiFood);
      var meatFood = profileViewHelper.getData(knownAllergies.meatFood);
      var nutsFood = profileViewHelper.getData(knownAllergies.nutsFood);
      var shellfishFood = profileViewHelper.getData(knownAllergies.shellfishFood);
      var spicesFood = profileViewHelper.getData(knownAllergies.spicesFood);
      var vegetablesFood = profileViewHelper.getData(knownAllergies.vegetablesFood);
      var otherFood = profileViewHelper.getData(knownAllergies.otherFood);
      var adrenalineInjections = profileViewHelper.getData(
        currentMedications.adrenalineInjections);
      var allergenImmunotherapy = profileViewHelper.getData(
        currentMedications.allergenImmunotherapy);
      var eyes = profileViewHelper.getData(currentMedications.eyes);
      var nasalSpraysNoseSteroids = profileViewHelper.getData(currentMedications.nasalSpraysNoseSteroids);
      var nasalSpraysNoseAntihistamines = profileViewHelper.getData(currentMedications.nasalSpraysNoseAntihistamines);
      var pillsNose = profileViewHelper.getData(currentMedications.pillsNose);
      var asthmaPills = profileViewHelper.getData(currentMedications.asthmaPills);
      var bronchodilators = profileViewHelper.getData(currentMedications.bronchodilators);
      var inhaledSteroids = profileViewHelper.getData(currentMedications.inhaledSteroids);
      var inhaledSteroidsBronchodilators = profileViewHelper.getData(
        currentMedications.inhaledSteroidsBronchodilators);

      expect(adrenalineInjections).to.deep.eq(['Auvi-Q\tEpinephrine',
        'Epi-Pen\tEpinephrine', 'Epi-Pen Jr.\tEpinephrine'
      ]);
      expect(allergenImmunotherapy).to.deep.eq([
        'Allergen Injections\t\tPollens, Molds, Mites, Insects, Venoms, Cat, Dog',
        'Sublingual Allergy Drops\tPollens, Molds, Mites, Insects, Venoms, Cat, Dog',
        'Sublingual Grass Pill', 'Sublingual Ragweed Pill',
        'Nucala\u00ae \t\tMepolizumab',
        'Xolair\u00ae \t\tOmalizumab'
      ]);
      /* jshint ignore:start */
      expect(eyes).to.deep.eq(['Alaway\tKetotifen', 'Bepreve\tBepotastine',
        'Naphcon\tPheniramine', 'Naphcon­A\tPheniramine and Naphazoline',
        'Opcon­A\tPheniramine and Naphazoline', 'Opticrom\tCromolyn',
        'Optivar\tOptivar', 'Pataday\tOlopatadine',
        'Patanol\tOlopatadine',
        'Visine-A\tPheniramine and Naphazoline', 'Zaditor\tKetotifen'
      ]);
      /* jshint ignore:end */
      expect(nasalSpraysNoseSteroids).to.deep.eq([
        'Dymista\t\tAzelastine and Fluticasone',
        'Flonase\t\tFluticasone', 'Nasacort AQ\t\tTriamcinolone',
        'Nasalcrom\t\tCromolyn', 'Nasarel\t\tFlunisolide',
        'Nasonex\t\tMometasone\t', 'Omnaris\t\tCiclesonide',
        'QNASL\t\tBeclomethasone\t', 'Rhinocort AQ\tBudesonide',
        'Veramyst\t\tFluticasone', 'Zetonna\t\tCiclesonide'
      ]);
      expect(nasalSpraysNoseAntihistamines).to.deep.eq([
        'Afrin\t                   \tOxymetazoline',
        'Astelin\t          \tAzelastine',
        'Astepro\t          \tAzelastine',
        'Atrovent\t\tIpratropium',
        'Neo-Synephrine\tPhenylephrine',
        'Patanase\t\tOlopatadine',
        'Sinex\t\t\tOxymetazoline'
      ]);
      expect(pillsNose).to.deep.eq(['Alavert\t\tLoratadine',
        'Allegra\t\tFexofenadine',
        'Allegra-D\t\tFexofenadine with Sudafed',
        'Benadryl\t\tDiphenhydramine', 'Chlor-Trimeton\tChlorpheniramine',
        'Clarinex\t\tDesloratadine', 'Claritin\t\tLoratadine',
        'Ketotifen\t\tKetotifen', 'Sudafed\t\tPseudoephedrine',
        'Tavist\t\t\tClemastine', 'Vistaril\t\tHydroxyzine',
        'Xyzal\t\t\tLevoCetirizine', 'Zyrtec\t\t\tCetirizine'
      ]);
      expect(asthmaPills).to.deep.eq(['Medrol\t\tMethylprednisolone',
        'Prednisone\t\tPrednisone', 'Singulair\t\tMontelukast\t'
      ]);
      expect(bronchodilators).to.deep.eq([
        'Albuterol Solution  \tAlbuterol Solution',
        'DuoNeb\t\tAlbuterol and Ipratropium', 'Foradil\t\tFormoterol',
        'Proventil HFA\t\tAlbuterol', 'Pro\u00adAir HFA\t\tAlbuterol ',
        'RespiClick Albuterol',
        'Respimat\t\tAlbuterol and Ipratropium', 'Serevent\t\tSalmeterol',
        'Spiriva\t\tTiotropium', 'Ventolin HFA\t\tAlbuterol',
        'Xopenex HFA\tLevalbuterol', 'Xopenex Solution  \tLevalbuterol\t'
      ]);
      expect(inhaledSteroids).to.deep.eq(['Aerospan\t\tFlunisolide',
        'Alvesco\t\tCiclesonide', 'Arnuity\t\tFluticasone',
        'Asmanex\t\tMometasone', 'Flovent Diskus\t\tFluticasone',
        'Flovent HFA\t\tFluticasone', 'Pulmicort\t\tBudesonide\t',
        'QVAR\t\t\tBeclomethasone\t'
      ]);
      expect(inhaledSteroidsBronchodilators).to.deep.eq([
        'Advair Diskus\t\t\tFluticasone and Salmeterol',
        'Advair HFA\t\t\tFluticasone and Salmeterol',
        'Breo Ellipta\t\t\tFluticasone Vilanterol',
        'Dulera\t\t\tMometasone and Formoterol ',
        'Symbicort\t\tBudesonide and Formoterol  '
      ]);
      expect(animals).to.deep.eq(['Birds ', 'Cats ', 'Dogs ',
        'Guinea Pigs ', 'Hamsters ', 'Horses ', 'Livestock ', 'Other Pets ', 'Rabbits '
      ]);
      expect(drugs).to.deep.eq(['Aspirin', 'Codeine', 'Erythromycin',
        'Iodides', 'Penicillin', 'Radio-contrast Dye', 'Sulfa'
      ]);
      expect(dust).to.deep.eq(['Dust Mites']);

      expect(grass).to.deep.eq(['Bahia', 'Bermuda',
        'Meadow fescue grasses', 'Orchard', 'Red top', 'Rye', 'Timothy', 'Yes, but not sure to which Grass'
      ]);
      expect(mold).to.deep.eq(['Alternaria', 'Ascospores',
        'Aspergillus sp.', 'Basidiospores', 'Botrytis', 'Cladosporium',
        'Curvularia', 'Drechslera', 'Epicoccum', 'Fusarium', 'Mucor',
        'Penicillium', 'Pithomyces', 'Rhizopus', 'Rusts', 'Smuts',
        'Stemphylium', 'Torula', 'Yes, but not sure to which Molds'
      ]);
      expect(trees).to.deep.eq(['Acacia', 'Alder, Red', 'Ash, White',
        'Aspen', 'Australian Pine', 'Bayberry, Southern',
        'Beech, American', 'Birch', 'Cedar, Mountain', 'Cedar, Red',
        'Cottonwood', 'Cypress, Arizona', 'Cypress, Bald', 'Elm, American',
        'Eucalyptus, Blue gum', 'Hazelnut, American',
        'Hickory, Shellbark', 'Maple, Box elder', 'Maple, Red',
        'Mesquite', 'Mulberry, Red', 'Oak', 'Olive', 'Palm, Queen',
        'Paloverde', 'Pecan', 'Pepper tree', 'Pine', 'Privet',
        'Sweet gum', 'Sycamore', 'Walnut, Black', 'Willow, Black',
        'Yes, but not sure to which Trees'
      ]);
      expect(weeds).to.deep.eq(['Cocklebur', 'Dock, Yellow',
        'Feverfew, Santa Maria', 'Firebush, Burning Bush', 'Hemp',
        'Lamb’s quarters', 'Mugwort', 'Nettle, Stinging',
        'Pellitory, Wall', 'Pigweed, Redroot', 'Plantain, English',
        'Rabbit Bush', 'Ragweed, Giant', 'Ragweed, Short',
        'Ragweed, Western', 'Russian thistle', 'Sagebrush', 'Sorrel, Red',
        'Tumbleweed', 'Yes, but not sure to which Weeds'
      ]);
      expect(other).to.deep.eq(['Latex, Natural Rubber']);
      expect(fishFood).to.deep.eq(['All white fish', 'Cod', 'Perch',
        'Salmon', 'Tuna', 'Other Fish'
      ]);
      expect(fruitFood).to.deep.eq(['Apple', 'Avocado', 'Banana',
        'Blue Berries', 'Dates', 'Figs', 'Kiwi', 'Orange', 'Peach',
        'Pear', 'Raspberries', 'Strawberries', 'Other Fruit'
      ]);
      expect(fungiFood).to.deep.eq(['Mushrooms', 'Other Fungi']);
      expect(meatFood).to.deep.eq(['Beef', 'Chicken', 'Lamb', 'Pork',
        'Turkey', 'Other Meat'
      ]);
      expect(nutsFood).to.deep.eq(['All Nuts', 'All Seeds', 'Almond',
        'Cashew', 'Coconut', 'Pecan', 'Pine Nuts', 'Pistachio',
        'Sesame Seeds', 'Sunflower Seeds', 'Walnut', 'Other Nut and Seed'
      ]);
      expect(shellfishFood).to.deep.eq(['All Shellfish', 'Crab',
        'Crayfish / Crawfish', 'Lobster', 'Oysters', 'Scallops', 'Shrimp', 'Other Shellfish'
      ]);
      expect(spicesFood).to.deep.eq(['Dill', 'Mustard', 'Oregano',
        'Parsley', 'Pepper Black', 'Pepper Red (Cayenne)', 'Other Spice'
      ]);
      expect(vegetablesFood).to.deep.eq(['Carrot', 'Celery', 'Corn',
        'Lettuce', 'Onions', 'Potato', 'Tomato', 'Other Vegetable'
      ]);
      expect(otherFood).to.deep.eq(['Eggs', 'Milk  (cow)', 'Peanut',
        'Soy Beans', 'Wheat, Barley, Buckwheat', 'Other Food'
      ]);
    }));
});

describe('profileViewHelper.compareItem()', function () {
  beforeEach(module('ka-profile'));

  it('should compare provided items and add to array if it matches', inject(
    function (householdPets, profileViewHelper) {

      var vm = {};
      vm.session = {
        'Birds': false,
        'Cats': false,
        'Dogs': false,
        'Guinea Pigs': false,
        'Hamsters': false,
        'Horses': false,
        'Livestock': false,
        'Rabbits': false
      };

      vm.petsModel = [{
        id: 'Cats'
      }, {
        id: 'Dogs'
      }];
      R.map(profileViewHelper.updateProfile(vm, vm.petsModel))(
        householdPets);
      expect(vm.session.Birds).to.be.false;
      expect(vm.session.Cats).to.be.true;
      expect(vm.session.Dogs).to.be.true;
      expect(vm.session['Guinea Pigs']).to.be.false;
      expect(vm.session.Hamsters).to.be.false;
      expect(vm.session.Horses).to.be.false;
      expect(vm.session.Livestock).to.be.false;
      expect(vm.session.Rabbits).to.be.false;
    }));
});


describe('the profile service', function () {
  beforeEach(module('ka-profile'));
  beforeEach(module('ka-session'));
  beforeEach(module('ka-helper'));

  it('should exist', inject(function (profile) {
    expect(profile).to.be.truthy;
    expect(profile).to.respondTo('getProfile');
    expect(profile).to.respondTo('updateProfile');
  }));

});

describe('profile: getProfile() should return profile data', function () {
  var http;
  var mockSession = {
    userCtx: {
      username: 'test_at_test_dot_com'
    }
  };


  var mockProfile = {
    userCtx: {
      _id: 'test_at_test_dot_com'
    }
  };

  var mockPhoto = 'testPhoto';

  describe('profile: getProfile() should return profile data', function () {


    beforeEach(module('ka-profile'));
    beforeEach(module('ka-session'));
    beforeEach(module('ka-helper'));

    beforeEach(inject(function (_$window_, $httpBackend) {
      http = $httpBackend;
      $httpBackend.when('GET', '/api/_session').respond(200,
        mockSession);
      $httpBackend.when('GET', '/api/test_at_test_dot_com/profile').respond(
        200, mockProfile);
      $httpBackend.when('GET',
        '/api/profile-photo/test_at_test_dot_com').respond(
        200, mockPhoto);
      $httpBackend.resetExpectations();
    }));


    it('getWatches method should make GET request', function (done) {
      var profile = getService('profile');
      var session = getService('session');
      session.userCtx = {
        username: 'test_at_test_dot_com'
      };

      profile.getProfile().then(function (res) {
        expect(res.profilePhoto).to.be.eq(
          'data:image/jpg;base64,testPhoto');
        expect(res.session.userCtx).to.deep.eq({
          _id: 'test_at_test_dot_com'
        });
      }, function (err) {
        expect(err).to.be.undefined();
      })
        .finally(function () {
          done();
        });
      http.flush();
    });
  });

  describe('profile: updateProfile() should update profile data', function () {


    beforeEach(module('ka-profile'));
    beforeEach(module('ka-session'));
    beforeEach(module('ka-helper'));

    beforeEach(inject(function (_$window_, $httpBackend) {
      http = $httpBackend;
      $httpBackend.when('GET', '/api/_session').respond(200,
        mockSession);
      $httpBackend.when('PUT', '/api/test_at_test_dot_com/profile').respond(
        200, mockProfile);
      $httpBackend.resetExpectations();
    }));


    it('getWatches method should make GET request', function (done) {
      var profile = getService('profile');
      var session = getService('session');

      session.userCtx = {
        username: 'test_at_test_dot_com'
      };

      profile.updateProfile(profile.user).then(function (res) {
        expect(res.status).to.eq(200);
      }, function (err) {
        expect(err).to.be.undefined();
      })
        .finally(function () {
          done();
        });
      http.flush();
    });
  });
});


describe('profileViewHelper: loadDropDownMenus should return applicable keys',
  function () {


    beforeEach(module('ka-profile'));
    beforeEach(module('ka-session'));
    beforeEach(module('ka-helper'));


    it('getWatches method should make GET request', function () {
      var profileViewHelper = getService('profileViewHelper');
      var vm = {};
      vm.session = {};
      vm.session.userCtx = {
        username: 'test_at_test_dot_com'
      };
      vm.foodSetup = [{
        title: 'Animals',
        data: 'animalsData',
        model: 'animalsModel',
        type: 'animals'
      }, {
        title: 'Other (Food)',
        data: 'foodOtherData',
        model: 'foodOtherModel',
        type: 'otherFood'
      }];

      vm.setup = [{
        title: 'Eyes',
        data: 'medsEyesData',
        model: 'medsEyesModel',
        type: 'eyes'
      }, {
        title: 'Adrenaline Injections',
        data: 'medsAdrenalineData',
        model: 'medsAdrenalineModel',
        type: 'adrenalineInjections'
      }];

      vm.session.petsModel = [{
        id: 'Birds'
      }, {
        id: 'Cats'
      }];

      vm.session.medsModel = [{
        id: 'Anaphylaxis\t(severe total body allergic reaction)'
      }];

      vm.profilePhoto = null;

      profileViewHelper.loadDropDownMenus(vm);
      expect(vm.session).to.be.object;
    });
  });

describe('profileViewHelper: loadDefaultResults should load default result values',
  function () {
    beforeEach(module('ka-profile'));

    it('should load default values for FEV1 / FENO', function () {
      var profileViewHelper = getService('profileViewHelper');
      var result = {};
      profileViewHelper.loadDefaultResults(result);
      expect(result.value).to.equal(0);

      // It's easier to ensure the date is not undefined as it is the present time - depending on when the test is run, the result will be slightly off
      expect(result.date).to.not.be.undefined;
      expect(result.date).to.be.a('string');
      expect(result.month).to.be.a('string');
      expect(result.day).to.be.a('string');
      expect(result.year).to.be.a('string');
    });
  });

describe('profileViewHelper: loadFEV1 should get the applicable variables',
  function () {

    beforeEach(module('ka-profile'));

    it('should break down the fev1 object into proper value and date parts', function () {
      var profileViewHelper = getService('profileViewHelper');
      var vm = {};
      vm.session = {};
      vm.session.fev1 = {
        value: 1.23,
        date: 'Fri Jun 26 2015 14:09:17 GMT-0400 (EDT)',
        saveDate: new Date()
      };

      profileViewHelper.loadFEV1(vm);
      expect(vm.session.fev1.wholeNum).to.equal(1);
      expect(vm.session.fev1.firstDecimal).to.equal(2);
      expect(vm.session.fev1.secondDecimal).to.equal(3);
      expect(vm.session.fev1.month).to.equal('06');
      expect(vm.session.fev1.day).to.equal('26');
      expect(vm.session.fev1.year).to.equal('2015');
    });
  });

describe('profileViewHelper: setFEV1 should set the applicable variables',
  function () {

    beforeEach(module('ka-profile'));

    it('should combine the decimal and date values', function () {
      var profileViewHelper = getService('profileViewHelper');
      var vm = {};
      vm.session = {};
      vm.session.fev1 = {
        value: 1.23,
        date: 'Fri Jun 26 2015 14:09:17 GMT-0400 (EDT)',
        saveDate: new Date()
      };

      var fev1 = {
        wholeNum: 1,
        firstDecimal: 2,
        secondDecimal: 3,
        month: '06',      // June
        day: '26',        // 26th
        year: '2015'      // 2015
      };

      profileViewHelper.loadFEV1(vm);
      profileViewHelper.setFEV1(vm, fev1);
      expect(vm.session.fev1).to.be.object;
      expect(vm.session.fev1.value).to.equal(1.23);

      var fev1Date = moment(vm.session.fev1.date);
      expect(fev1Date.month()).to.equal(5); // 0 based
      expect(fev1Date.date()).to.equal(26);
      expect(fev1Date.year()).to.equal(2015);
    });
  });

describe('profileViewHelper: loadFENO should get the applicable variables',
  function () {

    beforeEach(module('ka-profile'));

    it('should break down the feno object into value and date parts', function () {
      var profileViewHelper = getService('profileViewHelper');
      var vm = {};
      vm.session = {};
      vm.session.feno = {
        value: 42,
        date: 'Fri Jun 26 2015 14:09:17 GMT-0400 (EDT)',
        saveDate: new Date()
      };

      profileViewHelper.loadFENO(vm);

      expect(vm.session.feno.value).to.equal(42);
      expect(vm.session.feno.month).to.equal('06');
      expect(vm.session.feno.day).to.equal('26');
      expect(vm.session.feno.year).to.equal('2015');
    });
  });

describe('profileViewHelper: setFENO should set the applicable varibles',
  function () {

    beforeEach(module('ka-profile'));

    it('should set the feno value, and date values', function () {
      var profileViewHelper = getService('profileViewHelper');
      var vm = {};
      vm.session = {};
      vm.session.feno = {
        value: 42,
        date: new Date(),
        saveDate: new Date()
      };

      var feno = {
        value: 42,
        month: '06',
        day: '26',
        year: '2015'
      };

      profileViewHelper.loadFENO(vm);
      profileViewHelper.setFENO(vm, feno);

      expect(vm.session.feno).to.be.object;
      expect(vm.session.feno.value).to.equal(42);

      var fenoDate = moment(vm.session.feno.date);
      expect(fenoDate.month()).to.equal(5); // 0 based
      expect(fenoDate.date()).to.equal(26);
      expect(fenoDate.year()).to.equal(2015);
    });
  });

describe('profileViewHelper: getResultYears',
  function () {

    beforeEach(module('ka-profile'));

    it('should return a list of years. Last year and this year.', function () {
      var profileViewHelper = getService('profileViewHelper');

      var CURRENT_YEAR = moment().year().toString();
      var LAST_YEAR = (moment().year() - 1).toString();
      var years = profileViewHelper.getResultYears();

      expect(years[0]).to.equal(CURRENT_YEAR);
      expect(years[1]).to.equal(LAST_YEAR);
    });
  });