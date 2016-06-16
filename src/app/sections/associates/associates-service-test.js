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


describe('orgTypes()', function () {

  beforeEach(module('ka-associates'));

  it('should exist and contain', inject(function () {
    var associates = getService('associateViewHelper');
    expect(associates.orgTypes).to.deep.eq([{
      type: 'Clinic'
    }, {
      type: 'Clinic/Data'
    }, {
      type: 'Business'
    }, {
      type: 'Data Collector'
    }]);
  }));
});

describe('showVideo()', function () {

  beforeEach(module('ka-associates'));

  it('should return true if allMembersCanCall or nonMembersCanCall is set',
    inject(function () {
      var associates = getService('associateViewHelper');
      var org = {};
      org.allMembersCanCall = true;
      org.nonMembersCanCall = false;
      expect(associates.showVideo(org)).to.be.true;
      org.allMembersCanCall = false;
      org.nonMembersCanCall = true;
      expect(associates.showVideo(org)).to.be.true;
      org.allMembersCanCall = true;
      org.nonMembersCanCall = true;
      expect(associates.showVideo(org)).to.be.true;
    }));

  it(
    'should return false if allMembersCanCall or nonMembersCanCall is not set',
    inject(function () {
      var associates = getService('associateViewHelper');
      var org = {};
      org.allMembersCanCall = false;
      org.nonMembersCanCall = false;
      expect(associates.showVideo(org)).to.be.false;
    }));

});

describe('showPush()', function () {

  beforeEach(module('ka-associates'));

  it('should return true if canSendNotifications is set', inject(function () {
    var associates = getService('associateViewHelper');
    var org = {};
    org.canSendNotifications = true;
    expect(associates.showPush(org)).to.be.true;
  }));

  it('should return false if canSendNotifications is not set', inject(
    function () {
      var associates = getService('associateViewHelper');
      var org = {};
      org.canSendNotifications = false;
      expect(associates.showPush(org)).to.be.false;
    }));

});

describe('showReports()', function () {

  beforeEach(module('ka-associates'));

  it('should return true if isDataCollector is set', inject(function () {
    var associates = getService('associateViewHelper');
    var org = {};
    org.isDataCollector = true;
    expect(associates.showReports(org)).to.be.true;
  }));

  it('should return false if isDataCollector is not set', inject(function () {
    var associates = getService('associateViewHelper');
    var org = {};
    org.isDataCollector = false;
    expect(associates.showReports(org)).to.be.false;
  }));

});

describe('updatePresets()', function () {

  beforeEach(module('ka-associates'));

  it('should return specific preset options for a specific account type',
    inject(function () {
      var associates = getService('associateViewHelper');
      expect(associates.updatePresets({
        type: 'Clinic'
      })).to.deep.eq({
        showVideo: true,
        showReports: false,
        showPush: false
      });
      expect(associates.updatePresets({
        type: 'Clinic/Data'
      })).to.deep.eq({
        showVideo: true,
        showReports: true,
        showPush: false
      });
      expect(associates.updatePresets({
        type: 'Business'
      })).to.deep.eq({
        showVideo: false,
        showReports: false,
        showPush: true
      });
      expect(associates.updatePresets({
        type: 'Data Collector'
      })).to.deep.eq({
        showVideo: false,
        showReports: true,
        showPush: false
      });

    }));

  it('should return false if isDataCollector is not set', inject(function () {
    var associates = getService('associateViewHelper');
    var org = {};
    org.isDataCollector = false;
    expect(associates.showReports(org)).to.be.false;
  }));

});

describe('checkId()', function () {

  beforeEach(module('ka-associates'));

  it('should return true if povided ID already exist', inject(function () {
    var associates = getService('associateViewHelper');
    var orgId = 'testing3';
    var allOrgs = [{
      id: 'testing1'
    }, {
      id: 'testing2'
    }, {
      id: 'testing3'
    }, {
      id: 'testing4'
    }];
    expect(associates.checkId(orgId, allOrgs)).to.be.true;
  }));

  it('should return false if povided ID doesn\'t already exist', inject(
    function () {
      var associates = getService('associateViewHelper');
      var orgId = 'testing5';
      var allOrgs = [{
        id: 'testing1'
      }, {
        id: 'testing2'
      }, {
        id: 'testing3'
      }, {
        id: 'testing4'
      }];
      expect(associates.checkId(orgId, allOrgs)).to.be.false;
    }));
});