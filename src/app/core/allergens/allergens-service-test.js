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

describe('allergens service', function () {

  beforeEach(module('ka-allergens'));

  var http;
  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('GET', '/api/medications').respond(200);
    $httpBackend.when('GET', '/api/medical-conditions').respond(200);
    $httpBackend.when('GET', '/api/allergens').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('getMedications make GET api call to /api/medications', function (done) {
    var allergens = getService('allergens');

    allergens.getMedications().then(function (res) {
      expect(res.status).to.eq(200);
    }, function (err) {
      expect(err).to.be.undefined();
    }).finally(function () {
      done();
    });
    http.flush();
  });

  it('getMedicalConditions make GET api call to /api/medical-conditions',
    function (done) {
      var allergens = getService('allergens');

      allergens.getMedicalConditions().then(function (res) {
        expect(res.status).to.eq(200);
      }, function (err) {
        expect(err).to.be.undefined();
      }).finally(function () {
        done();
      });
      http.flush();
    });

  it('getAllergens make GET api call to /api/allergens', function (done) {
    var allergens = getService('allergens');

    allergens.getAllergens().then(function (res) {
      expect(res.status).to.eq(200);
    }, function (err) {
      expect(err).to.be.undefined();
    }).finally(function () {
      done();
    });
    http.flush();
  });
});

describe('allergens service', function () {

  var mockItemList = [{
    allergenId: '9',
    name: 'Aspirin',
    category: 'Drugs',
    subCategory: null,
  }, {
    allergenId: '10',
    name: 'Codeine',
    category: 'Drugs',
    subCategory: null,
    selected: true
  }];

  beforeEach(module('ka-allergens'));

  it('flattenAllergenList', function () {
    var allergens = getService('allergens');
    var results = allergens.flattenAllergenList(mockItemList);
    expect(results.length).to.eq(1);
    expect(results[0]).to.deep.eq({
      allergenId: '10',
      name: 'Codeine',
      category: 'Drugs',
      subCategory: null,
      selected: true
    });
  });
});