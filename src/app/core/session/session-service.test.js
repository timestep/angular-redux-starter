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

//tries to return the auth token from $http default 'Authorization' header
function getAuthorizationHeader() {
  var $http = getService('$http');
  return $http.defaults.headers.common.Authorization;
}

//tries to get the auth token from localStorage
function getAuthToken(){
  var $window = getService('$window');
  return $window.localStorage.getItem('Authorization');
}

beforeEach(function () {
  module(function ($provide) {
    var mockState = {
      go: function (a, b, c) {
        return true;
      }
    };

    $provide.value('$state', mockState);
    $provide.service('helper', function () {
      return {
        emailToUserName: function (email) {
          return email;
        }
      };
    });
  });
});

describe('the session service', function () {

  beforeEach(module('ka-session'));

  it('should exist', inject(function (session) {
    expect(session).to.be.truthy;
    expect(session).to.respondTo('login');
    expect(session).to.respondTo('setupOrgAdmin');
    expect(session).to.respondTo('saveSession');
    expect(session).to.respondTo('loadAuthToken');
  }));
});

describe('Service: session.loadAuthToken()', function(){
  var TEST_TOKEN = 'TEST TOKEN';
  beforeEach(module('ka-session'));

  beforeEach(inject(function(_$window_){
    _$window_.localStorage.setItem('Authorization',TEST_TOKEN);
  }));

  it('should set the Authorization header from localStorage',function(){
    getService('session').loadAuthToken();
    expect(getAuthorizationHeader()).to.equal(TEST_TOKEN);
  });
});

describe('Service: session.login() for operator', function () {

  beforeEach(module('ka-session'));
  var http;

  var data = {
    userCtx: {
      name: 'kagen',
      roles: ['operator']
    }
  };

  var mockLoginResponse = {
    name: 'kagen',
    roles: ['operator'],
    token: 'token'
  };

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('POST', '/api/login').respond(200, mockLoginResponse);
    $httpBackend.when('GET', '/api/_session').respond(200, data);
    $httpBackend.resetExpectations();
  }));

  it('login() should login user and set the auth token', function (done) {
    var sessionService = getService('session');
    sessionService.login('kagen', 'kagen1').then(function () {
        expect(getAuthorizationHeader()).to.equal('token','Authorization header should be set to the given token');
        expect(getAuthToken()).to.equal('token', 'The token should be saved to localStorage');
        expect(sessionService.userCtx.role).to.eq('operator');
        expect(sessionService.userCtx.name).to.eq('kagen');
        done();
      })
      .then(null,done);
    http.flush();
  });
});


describe('Service: session.login() for app-user', function () {

  beforeEach(module('ka-session'));
  var http;

  var data = {
    userCtx: {
      name: 'andy@andy.com',
      roles: ['app-user']
    }
  };

  var mockLoginResponse = {
    name: 'andy@andy.com',
    roles: ['app-user'],
    token: 'token'
  };

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('POST', '/api/login').respond(200, mockLoginResponse);
    $httpBackend.when('GET', '/api/_session').respond(200, data);
    $httpBackend.resetExpectations();
  }));

  it('login() should login user and set the Authorization header', function (done) {
    var sessionService = getService('session');
    sessionService.login('kagen', 'kagen1').then(function () {
        expect(getAuthorizationHeader()).to.equal('token','Authorization header should be set to the given token');
        expect(getAuthToken()).to.equal('token', 'The token should be saved to localStorage');

        expect(sessionService.userCtx.role).to.eq('app-user');
        expect(sessionService.userCtx.name).to.eq('andy');
        done();
      })
      .then(null,done);
    http.flush();
  });
});


describe('Service: session.login() for orgadmin', function () {

  beforeEach(module('ka-session'));
  var http, $window;

  var data = {
    userCtx: {
      name: 'mr_rangle',
      roles: ['orgadmin']
    }
  };

  var mockLoginResponse = {
    name: 'mr_rangle',
    roles: ['orgadmin'],
    orgId: 'Rangle',
    token: 'token'
  };

  var mockOrgResponse = {
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
  };

  beforeEach(inject(function (_$window_, $httpBackend) {
    $window = _$window_;
    http = $httpBackend;
    $httpBackend.when('POST', '/api/login').respond(200, mockLoginResponse);
    $httpBackend.when('GET', '/api/_session').respond(200, data);
    $httpBackend.when('GET', '/api/organization/Rangle').respond(200, mockOrgResponse);
    $httpBackend.resetExpectations();
  }));

  it('login() should login user and set the Authoriztion header', function (done) {
    var sessionService = getService('session');

    sessionService.login('mr_rangle', '1234')
      .then(function () {
        expect(getAuthorizationHeader()).to.equal('token','Authorization header should be set to the given token');
        expect(getAuthToken()).to.equal('token', 'The token should be saved to localStorage');
        expect($window.localStorage.getItem('user.orgId')).to.eq('Rangle');
        expect(sessionService.userCtx.role).to.eq('orgadmin');
        expect(sessionService.userCtx.name).to.eq('mr_rangle');
        expect(sessionService.userCtx.orgId).to.eq('Rangle');
        expect(sessionService.userCtx.clinicId).to.eq('Rangle');
        expect(sessionService.userCtx.videoChat).to.be.false;
        expect(sessionService.userCtx.pushNotifications).to.be.true;
        expect(sessionService.userCtx.dataCollector).to.be.false;
        done();
      })
      .then(null,done);
    http.flush();
  });
});

describe('Service: session.logout()',function(){
  var http;
  var $window;
  var mockLoginResponse = {
    name: 'mr_rangle',
    roles: ['orgadmin'],
    orgId: 'Rangle',
    token: 'token'
  };
  var data = {
    userCtx: {
      name: 'andy@andy.com',
      roles: ['app-user']
    }
  };
  var mockOrgResponse = {
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
  };

  beforeEach(function() {
    module('ka-session', function($provide) {
      $provide.factory('$window', function () {
        var windowmock = {location: { reload: function(){return true; }}};
        windowmock.navigator = window.navigator;
        windowmock.localStorage = window.localStorage;
        return windowmock;
      });
    });

    inject(function ($httpBackend, _$window_) {
      http = $httpBackend;
      $window = _$window_;
      $httpBackend.when('POST', '/api/login').respond(200, mockLoginResponse);
      $httpBackend.when('DELETE', '/api/_session').respond(200, {});
      $httpBackend.when('GET', '/api/_session').respond(200, data);
      $httpBackend.when('GET', '/api/organization/Rangle').respond(200, mockOrgResponse);
    });
  });

  it('should logout the user and clear the Authorization header',function(done){
    var sessionService = getService('session');
    sessionService.login('mr_rangle', '1234')
      .then(sessionService.logout)
      .then(function(){
        expect(getAuthToken()).to.equal(null);
        expect(getAuthorizationHeader()).to.equal(null);
        expect($window.localStorage.getItem('viewUserCtx')).to.eq(null);
        expect(sessionService.viewUserCtx.username).to.be.undefined;
        done();
      })
      .then(null,done);
    http.flush();
  });
});

describe('Service: session.createViewUserCtx(roles, orgId, username, email, firstName, lastName, DOB, role)', function () {
  var $window;

  beforeEach(function () {
    module('ka-session', function ($provide) {
      $provide.factory('$window', function () {
        var windowmock = {location: { reload: function () { return true; }}};
        windowmock.navigator = window.navigator;
        windowmock.localStorage = window.localStorage;
        return windowmock;
      });
    });

    inject(function (_$window_) {
      $window = _$window_;
    });
  });

  it('should populate localStorage with the user\'s context', function () {
    var roles = 'SOME-ROLE';
    var orgId = 'SOME-ORG';
    var username = 'SOME-USERNAME';
    var email = 'SOME@EMAIL.COM';
    var firstName = 'SOME-FIRSTNAME';
    var lastName = 'SOME-LASTNAME';
    var DOB = '2015-11-26';
    var role = 'SOME-ROLE';
    var sessionService = getService('session');
    var viewUserCtx = sessionService.createViewUserCtx(roles, orgId, username, email, firstName, lastName, DOB, role);

    expect(viewUserCtx).to.not.be.undefined;
    expect(viewUserCtx.username).to.equal(username);
    expect(viewUserCtx.roles).to.equal(roles);
    expect(viewUserCtx.orgId).to.equal(orgId);
    expect(viewUserCtx.username).to.equal(username);
    expect(viewUserCtx.email).to.equal(email);
    expect(viewUserCtx.firstName).to.equal(firstName);
    expect(viewUserCtx.lastName).to.equal(lastName);
    expect(viewUserCtx.DOB).to.equal(DOB);
    expect(viewUserCtx.role).to.equal(role);
    expect($window.localStorage.getItem('viewUserCtx')).to.equal(JSON.stringify(viewUserCtx));
  });
});

describe('Service: session.updateViewUserCtx(data)', function () {
  var $window;

  beforeEach(function () {
    module('ka-session', function ($provide) {
      $provide.factory('$window', function () {
        var windowmock = {location: { reload: function () { return true; }}};
        windowmock.navigator = window.navigator;
        windowmock.localStorage = window.localStorage;
        return windowmock;
      });
    });

    inject(function (_$window_) {
      $window = _$window_;
    });
  });

  it('should populate localStorage with the user\'s context', function () {
    var roles = 'SOME-ROLE';
    var orgId = 'SOME-ORG';
    var username = 'SOME-USERNAME';
    var email = 'SOME@EMAIL.COM';
    var firstName = 'SOME-FIRSTNAME';
    var lastName = 'SOME-LASTNAME';
    var DOB = '2015-11-26';
    var role = 'SOME-ROLE';
    var sessionService = getService('session');
    var viewUserCtx;
    sessionService.createViewUserCtx(roles, orgId, username, email, firstName, lastName, DOB, role);

    viewUserCtx = sessionService.updateViewUserCtx({
      firstName: 'SOME-FIRSTNAME-1',
      lastName: 'SOME-LASTNAME-1',
      birthdayYear: '1984',
      birthdayMonth: '02',
      birthdayDay: '07'
    });
    expect(viewUserCtx.firstName).to.equal('SOME-FIRSTNAME-1');
    expect(viewUserCtx.lastName).to.equal('SOME-LASTNAME-1');
    expect(viewUserCtx.DOB).to.equal(moment ('1984-02-07').format('MM-DD-YYYY'));
    expect($window.localStorage.getItem('viewUserCtx')).to.equal(JSON.stringify(viewUserCtx));

  });
});

describe('Service: session.switchUser(email)', function () {
  var $window;
  var testUser = {
    email: 'test@rangle.io',
    username: 'test_at_rangle_dot_io'
  };

  beforeEach(function () {
    module('ka-session', function ($provide) {
      $provide.factory('$window', function () {
        var windowmock = {location: { reload: function () { return true; }}};
        windowmock.navigator = window.navigator;
        windowmock.localStorage = window.localStorage;
        return windowmock;
      });
    });

    inject(function (_$window_) {
      $window = _$window_;
    });
  });

  it('should populate localStorage with the user\'s context', function () {
    var sessionService = getService('session');
    sessionService.switchUser(testUser);

    var viewUserCtx = JSON.parse($window.localStorage.getItem('viewUserCtx'));

    expect(viewUserCtx).to.not.be.undefined;
    expect(viewUserCtx.username).to.equal(testUser.username);
  });
});

describe('Service: session.logoutAsUser()', function () {
  var $window;

  beforeEach(function () {
    module('ka-session', function ($provide) {
      $provide.factory('$window', function () {
        var windowmock = {location: { reload: function () { return true; }}};
        windowmock.navigator = window.navigator;
        windowmock.localStorage = window.localStorage;
        return windowmock;
      });
    });

    inject(function (_$window_) {
      $window = _$window_;
    });
  });

  it('should remove viewUserCtx from localStorage and set session.viewUserCtx to an empty object', function () {
    var sessionService = getService('session');

    sessionService.viewUserCtx = {
      a: 'b'
    };
    $window.localStorage.setItem('viewUserCtx', sessionService.viewUserCtx);

    sessionService.logoutAsUser();
    var viewUserCtx = JSON.parse($window.localStorage.getItem('viewUserCtx'));

    expect(viewUserCtx).to.be.null;
    expect(sessionService.viewUserCtx.a).to.be.undefined;
  });
});