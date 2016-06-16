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


describe('the organizations-service', function () {

  beforeEach(module('ka-organizations'));

  it('should exist and contain', inject(function () {
    var organizations = getService('organizations');
    expect(organizations).to.respondTo('getOrganizations');
    expect(organizations).to.respondTo('getOrganizationIds');
    expect(organizations).to.respondTo('getArchivedOrganizations');
    expect(organizations).to.respondTo('updateOrganizations');
    expect(organizations).to.respondTo('deleteOrganizations');
    expect(organizations).to.respondTo('getOrganizationById');
    expect(organizations).to.respondTo('createOrgAdmin');
    expect(organizations).to.respondTo('disableOrgAdmin');
    expect(organizations).to.respondTo('enableOrgAdmin');
    expect(organizations).to.respondTo('deleteOrgAdmin');
  }));
});


describe('getOrganizations()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;

  }));

  it('should call /api/organizations with default params', function (done) {
    var organizations = getService('organizations');
    http.when('GET', '/api/organizations?direction=asc&limit=25&offset=0&sort=_id').respond(200);
    http.resetExpectations();

    organizations.getOrganizations()
      .then(function (res) {
        expect(res.status).to.eq(200);
        done();
      })
      .then(null,done);
    http.flush();
  });

  it('should call /api/organizations with the passed params', function (done) {
    var organizations = getService('organizations');
    http.when('GET', '/api/organizations?direction=expectedDirection&limit=expectedLimit&offset=expectedOffset&sort=expectedSort').respond(200);
    http.resetExpectations();

    organizations.getOrganizations('expectedOffset','expectedLimit','expectedSort','expectedDirection')
      .then(function (res) {
        expect(res.status).to.eq(200);
        done();
      })
      .then(null,done);
    http.flush();
  });
});

describe('getOrganizationIds()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('GET', '/api/organizations/ids').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/organizations/ids', function (done) {
    var organizations = getService('organizations');
    organizations.getOrganizationIds()
      .then(function (res) {
        expect(res.status).to.eq(200);
        done();
      })
      .then(null,done);
    http.flush();
  });
});


describe('getArchivedOrganizations()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
  }));

  it('should call /api/organizations/archived with default params', function (done) {
    var organizations = getService('organizations');
    http.when('GET', '/api/organizations/archived?direction=asc&limit=25&offset=0&sort=_id').respond(200);
    http.resetExpectations();

    organizations.getArchivedOrganizations()
      .then(function (res) {
        expect(res.status).to.eq(200);
        done();
      })
      .then(null,done);
    http.flush();
  });

  it('should call /api/organizations/archived with the passed params', function (done) {
    var organizations = getService('organizations');
    http.when('GET', '/api/organizations/archived?direction=expectedDirection&limit=expectedLimit&offset=expectedOffset&sort=expectedSort').respond(200);
    http.resetExpectations();

    organizations.getArchivedOrganizations('expectedOffset','expectedLimit','expectedSort','expectedDirection')
      .then(function (res) {
        expect(res.status).to.eq(200);
        done();
      })
      .then(null,done);
    http.flush();
  });
});


describe('updateOrganizations()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('PUT', '/api/organization/test').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/organization/:orgId', inject(function () {
    var organizations = getService('organizations');
    organizations.updateOrganizations('test', {})
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});


describe('deleteOrganizations()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('DELETE', '/api/organization/test').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/organization/:orgId', inject(function () {
    var organizations = getService('organizations');
    organizations.deleteOrganizations('test')
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});


describe('getOrganizationById', function () {

  var http;

  var orgs = [{
  'id': 'testOrg',
  'key': 'testOrg',
  'value': {
    '_id': 'testOrg',
    'Address': '',
    'City': 'Colorado Spgs',
    'Email': '',
    'Fax': null,
    'First': '',
    'Last': '',
    'State': 'CO',
    'Telephone': '',
    'Personal Cell': '',
    'Zip Code': '',
    'lat': 38.870579,
    'lng': -104.821237,
    'reportsURL': '',
    'type': 'Clinic',
    'label': '',
    'SAMPLING_DEVICE': '',
    'Website': '',
    'isArchived': false,
    'isPartner': true,
    'isDataCollector': false,
    'nonMembersCanCall': false,
    'allMembersCanCall': false,
    'canSendNotifications': false,
    'videoStartTime': null,
    'videoEndTime': null,
    'videoIsOnline': false,
    'videoMinutesToWait': null
  },
  '$$hashKey': '007'
}];

  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('GET', '/api/organization/testOrg').respond(200, orgs);
    $httpBackend.resetExpectations();
  }));

  it('should filter a specfic organization by Id', inject(function () {
    var organizations = getService('organizations');
    var id = 'testOrg';
    organizations.getOrganizationById(id)
      .then(function(res) {
        expect(res.data[0].id).to.eq(id);
      });
      http.flush();
  }));
});


describe('createOrgAdmin()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('POST', '/api/role-user', {
      username: 'test@test.com',
      password: 'test',
      orgId: 'testId',
      roles: ['orgadmin']
    }).respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/app-user', inject(function () {
    var organizations = getService('organizations');
    organizations.createOrgAdmin('test@test.com', 'test', 'testId')
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});


describe('disableOrgAdmin()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('PUT', '/api/user/test@test.com/disable').respond(
      200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/user/:user/disable', inject(function () {
    var organizations = getService('organizations');
    organizations.disableOrgAdmin('test@test.com')
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});


describe('enableOrgAdmin()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('PUT', '/api/user/test@test.com/enable').respond(
      200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/user/:user/enable', inject(function () {
    var organizations = getService('organizations');
    organizations.enableOrgAdmin('test@test.com')
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});


describe('deleteOrgAdmin()', function () {
  var http;
  beforeEach(module('ka-organizations'));

  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('DELETE', '/api/user/test@test.com').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should call /api/user/:user', inject(function () {
    var organizations = getService('organizations');
    organizations.deleteOrgAdmin('test@test.com')
      .then(function (res) {
        expect(res.status).to.eq(200);
      });
    http.flush();
  }));
});