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

describe('members service',function(){
  beforeEach(module('ka-members'));

  it('should exist',function(){
    var members = getService('members');
    expect(members).to.respondTo('getMembers');
  });

  describe('getMembers(): ',function(){
    var http, members;
    beforeEach(inject(function ($httpBackend) {
      http = $httpBackend;
      $httpBackend.resetExpectations();
      members = getService('members');
    }));

    it('should pass the default params',function(done){
      http.when('POST', '/api/organization/1/members').respond(200);
      http.resetExpectations();

      members.getMembers(null, null, null, null, { organization: 1 })
      .then(function(res){
        expect(res.status).to.equal(200);
        done();
      })
      .then(null,done);

      http.flush();
    });

    it('should pass the sort and pagination options',function(done){
      http.when('POST', '/api/organization/1/members').respond(200);
      http.resetExpectations();

      members.getMembers(1,2,3,4, { organization: 1 })
      .then(function(res){
        expect(res.status).to.equal(200);
        done();
      })
      .then(null,done);

      http.flush();
    });
  });
});
