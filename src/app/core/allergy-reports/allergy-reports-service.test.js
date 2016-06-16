// /*jshint expr:true*/

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

var mockReport = {
  level: 11,
  levelNotAvailable: undefined,
  concentrationNotAvailable: false,
  detailedConcentrations: [{
    allergen: 'Alternaria',
    concentration: ''
  }, {
    allergen: 'Ascospores',
    concentration: ''
  }]
};

describe('the allergyReports service', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));
  beforeEach(module('ka-allergy-reports'));

  it('should exist and contain', inject(function () {
    var allergyReports = getService('allergyReports');
    expect(allergyReports).to.respondTo('getClinicIds');
    expect(allergyReports).to.respondTo('setLastViewedReport');
    expect(allergyReports).to.respondTo('getLastViewedReport');
    expect(allergyReports).to.respondTo('clearConcentrationLevel');
    expect(allergyReports).to.respondTo('clearAllergenLevel');
    expect(allergyReports).to.respondTo('updateReport');
    expect(allergyReports).to.respondTo('createReport');
    expect(allergyReports).to.respondTo('getReportTemplate');
  }));
});

describe('allergyReports ->', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));
  beforeEach(module('ka-allergy-reports'));

  it(
    'getLastViewedReport/setLastViewedReport: should set/get clinicIdForLastViewedReport',
    inject(function () {
      var allergyReports = getService('allergyReports');
      allergyReports.setLastViewedReport('testing');
      expect(allergyReports.getLastViewedReport()).to.equal('testing');
    }));

  it('clearAllergenLevel: should clear Allergen Level', inject(function () {
    var allergyReports = getService('allergyReports');
    var mockReport1 = {
      level: 11,
      levelNotAvailable: true,
      concentrationNotAvailable: false,
      detailedConcentrations: [{
        allergen: 'Alternaria',
        concentration: ''
      }, {
        allergen: 'Ascospores',
        concentration: ''
      }]
    };

    var mockReport2 = {
      level: -1,
      levelNotAvailable: false,
      concentrationNotAvailable: false,
      detailedConcentrations: [{
        allergen: 'Alternaria',
        concentration: ''
      }, {
        allergen: 'Ascospores',
        concentration: ''
      }]
    };

    expect(allergyReports.clearAllergenLevel(mockReport1)).to.have.property('level', -1);
    expect(allergyReports.clearAllergenLevel(mockReport2)).to.have.property('level', 0);
  }));

  it('clearConcentrationLevel: should clear ConcentrationLevel', inject(
    function () {
      var allergyReports = getService('allergyReports');
      var mockReport1 = {
        level: 11,
        levelNotAvailable: undefined,
        concentrationNotAvailable: true,
        concentration: 12,
        detailedConcentrations: [{
          allergen: 'Alternaria',
          concentration: 32
        }, {
          allergen: 'Ascospores',
          concentration: 23
        }]
      };

      var mockReport2 = {
        level: 11,
        levelNotAvailable: false,
        concentrationNotAvailable: true,
        concentration: 12,
        detailedConcentrations: [{
          allergen: 'Alternaria',
          concentration: 23
        }, {
          allergen: 'Ascospores',
          concentration: 23
        }]
      };

      expect(allergyReports.clearConcentrationLevel(mockReport1)).to.have.property(
        'concentration', '');

      expect(allergyReports.clearConcentrationLevel(mockReport2)).to.have.property(
        'concentration', '');

      expect(allergyReports.clearConcentrationLevel(mockReport2)).to.have.property(
        'detailedConcentrations')
        .that.is.an('array')
        .with.deep.property('[0]')
        .that.is.an('object')
        .that.deep.equals({
          allergen: 'Alternaria',
          concentration: ''
        });

      expect(allergyReports.clearConcentrationLevel(mockReport2)).to.have.property(
        'detailedConcentrations')
        .that.is.an('array')
        .with.deep.property('[1]')
        .that.is.an('object')
        .that.deep.equals({
          allergen: 'Ascospores',
          concentration: ''
        });

    }));


  it('getReportTemplate: should return a report template', inject(function () {
    var allergyReports = getService('allergyReports');
    expect(allergyReports.getReportTemplate('rangle.io')).to.have.property(
      'clinicId', 'rangle.io');
  }));

});

describe('allergyReports ->', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));
  beforeEach(module('ka-allergy-reports'));
  var http;
  var mockOrgResponse = {
    rows: [{
      'id': 'Rangle',
      'key': 'Rangle',
      'value': {
        '_id': 'Rangle',
        'Address': '150 John Street',
        'City': 'Toronto',
        'Email': 'kagen-air-admins@rangle.io',
        'Fax': null,
        'First': 'Dean',
        'Last': 'Gossi',
        'State': 'ON',
        'Telephone': '555-555-5255',
        'Personal Cell': '',
        'Zip Code': 'M5V 3E3',
        'lat': 38.870579,
        'lng': -104.821237,
        'reportsURL': '',
        'type': 'Clinic',
        'label': 'Rangle.io',
        'SAMPLING_DEVICE': '',
        'Website': 'http://www.rangle.io',
        'isArchived': false,
        'isPartner': true,
        'canSendNotifications': true,
        'isDataCollector': false,
        'nonMembersCanCall': false,
        'allMembersCanCall': false
      }
    }]
  };

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('GET', '/api/organization/Rangle').respond(200,
      mockReport);
    $httpBackend.when('GET', '/api/organizations/ids').respond(200,
      mockOrgResponse);
    $httpBackend.resetExpectations();
  }));

  it('getClinicIds - should fetch clinic ids', function (done) {
    var allergyReports = getService('allergyReports');

    allergyReports.getClinicIds().then(function (res) {
      expect(res.data.rows[0].id).to.eq('Rangle');
    }, function (err) {
      console.log('error', err);
      expect(err).to.be.undefined();
    })
      .finally(function () {
        done();
      });
    http.flush();
  });

  it('getClinic should fetch a requested clinic', function (done) {
    var allergyReports = getService('allergyReports');
    var clinicId = 'Rangle';
    allergyReports.getClinic(clinicId).then(function (res) {
      expect(res).to.deep.eq(mockReport);
    }, function (err) {
      console.log('error', err);
      expect(err).to.be.undefined();
    })
      .finally(function () {
        done();
      });
    http.flush();
  });
});