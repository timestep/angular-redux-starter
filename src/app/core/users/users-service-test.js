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


describe('the users-service', function () {

  beforeEach(module('ka-users'));

  it('should exist and contain', inject(function () {
    var users = getService('users');
    expect(users).to.respondTo('getUsers');
    expect(users).to.respondTo('getUserIds');
    expect(users).to.respondTo('getUserById');
  }));

  describe('getUsers(): ', function () {
    var http, users;
    beforeEach(inject(function ($httpBackend) {
      http = $httpBackend;
      $httpBackend.resetExpectations();
      users = getService('users');
    }));

    it('should pass the default params', function (done) {
      http.when('POST', '/api/users/', {
        direction: 'asc',
        limit: 25,
        offset: 0,
        sort: 'id'
      }).respond(200);
      http.resetExpectations();

      users.getUsers()
        .then(function (res) {
          expect(res.status).to.equal(200);
          done();
        })
        .then(null, done);

      http.flush();
    });

    it('should call /api/users with the passed params', function (done) {
      var users = getService('users');
      http.when('POST', '/api/users/', {
        direction: 'expectedDirection',
        limit: 'expectedLimit',
        offset: 'expectedOffset',
        sort: 'expectedSort'
      }).respond(200);
      http.resetExpectations();

      users.getUsers('expectedOffset', 'expectedLimit', 'expectedSort', 'expectedDirection')
        .then(function (res) {
          expect(res.status).to.eq(200);
          done();
        })
        .then(null, done);
      http.flush();
    });
  });

  describe('getUserIds()', function () {
    var http;
    beforeEach(module('ka-users'));

    beforeEach(inject(function ($httpBackend) {
      http = $httpBackend;
      $httpBackend.when('GET', '/api/users/ids').respond(200);
      $httpBackend.resetExpectations();
    }));

    it('should call /api/users/ids', function (done) {
      var users = getService('users');
      users.getUserIds()
        .then(function (res) {
          expect(res.status).to.eq(200);
          done();
        })
        .then(null, done);
      http.flush();
    });
  });

  describe('getUserById', function () {

    var http;

    var user = [{
      'birthdayDay': '20',
      'birthdayMonth': '10',
      'birthdayYear': '2007',
      'cell': '9054648362',
      'city': 'toronto',
      'email': 'testUser@rangle.io',
      'feno': null,
      'fev1': null,
      'firstName': 'Andrei',
      'gender': 'male',
      'lastName': 'Neagoie',
      'locations': null,
      'monitorAllergy': true,
      'monitorArthritis': false,
      'monitorAsthma': true,
      'monitorGrass': true,
      'monitorMigraine': false,
      'monitorMolds': true,
      'monitorTrees': true,
      'monitorWeeds': true,
      'organizationName': 'rangle_io',
      'pharmacist': null,
      'phone': null,
      'physician': null,
      'profileId': '1362',
      'profilePic': null,
      'specialty': null,
      'state': {name: 'ONTARIO', country: 'CANADA'},
      'street1': '354',
      'street2': 'Front',
      'zipCode': 'M5v3s1'
    }];

    beforeEach(module('ka-users'));

    beforeEach(inject(function ($httpBackend) {
      http = $httpBackend;
      $httpBackend.when('GET', '/api/testUser@rangle.io/profile').respond(200, user);
      $httpBackend.resetExpectations();
    }));

    it('should filter a specfic user by Id', inject(function () {
      var users = getService('users');
      var email = 'testUser@rangle.io';
      var profileId = '1362';
      users.getUserById(email)
        .then(function (res) {
          expect(res.data[0].email).to.eq(email);
          expect(res.data[0].profileId).to.eq(profileId);
        });
      http.flush();
    }));
  });

  describe('getSuggestions', function () {
    var http;
    var users;
    beforeEach(inject(function ($httpBackend) {
      http = $httpBackend;
      $httpBackend.resetExpectations();
      users= getService('users');
    }));

    it('should pass the default params', function (done) {
      http.when('GET', '/api/users/suggestions/SOME-FIELD').respond(200);
      http.resetExpectations();

      users.getSuggestions('SOME-FIELD')
        .then(function (res) {
          expect(res.status).to.equal(200);
          done();
        })
        .then(null, done);

      http.flush();
    });
  });

});

