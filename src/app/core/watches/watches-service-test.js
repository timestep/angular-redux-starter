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


describe('the ka-watches services', function () {
  beforeEach(module('ka-watches'));
  it('should exist', inject(function (watches) {
    expect(watches).to.be.truthy;
  }));

});


describe('the ka-watches services', function () {
  var http;
  beforeEach(module('ka-watches'));
  beforeEach(inject(function ($httpBackend) {
    http = $httpBackend;
    $httpBackend.when('GET', '/api/nws-watches/').respond(200);
    $httpBackend.resetExpectations();
  }));

  it('getWatches method should make GET request', function (done) {
    var watches = getService('watches');

    watches.getWatches().then(function (res) {
      expect(res.status).to.be.eq(200);
    }, function (err) {
      expect(err).to.be.undefined();
    })
      .finally(function () {
        done();
      });
    http.flush();
  });
});
