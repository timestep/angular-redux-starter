'use strict';
/*jshint expr:true*/


var Ctrl;
var scope;
var q;

var _$modalInstance_;
var _organizations_;
var _associateViewHelper_;
var _allOrgs_;
var _selectedOrg_;
var closeModalSpy;


var mockOrgs = [{
  'id': 'Rangle',
  'key': 'Rangle',
  'value': {
    '_id': 'Rangle',
    'Address': '140 John Street',
    'City': 'Toronto',
    'Email': 'kagen-air-admins@rangle.io',
    'Fax': '333-333-3333',
    'First': 'Dean',
    'Last': 'Gossi',
    'State': 'ON',
    'Telephone': '122-333-5255',
    'Personal Cell': '222-222-2222',
    'Zip Code': 'M5V 3E3',
    'lat': 43.649165,
    'lng': -79.390941,
    'reportsURL': 'https://www.rangle.io',
    'type': 'Clinic/Data',
    'label': 'RANGLE.IO',
    'SAMPLING_DEVICE': '2015-03-05T16:10:38.894Z',
    'Website': 'http://www.rangle.io',
    'clinicSubType': 'Pharmaceutical Co.',
    'isArchived': false,
    'isPartner': true,
    'isDataCollector': true,
    'isKagenDataCollector': true,
    'nonMembersCanCall': true,
    'allMembersCanCall': false,
    'canSendNotifications': true,
    'adminUserName': 'test@rangle.io',
    'videoStartTime': '00:00:00',
    'videoEndTime': '23:59:00',
    'videoTimeZone': 'America/Toronto',
    'videoIsOnline': false,
    'videoMinutesToWait': 10,
    'isVideoCurrentlyAvailable': false,
    'lastReportEntered': '2015-05-12T15:08:03.270Z'
  }
}];


describe('AssociatesEditCtrl', function () {
  beforeEach(module('ka-associates'));



  describe('AssociatesCtrl - selectedOrg is Clinic', function () {

    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {},
        clinicSubTypes: function () {},
        updatePresets: function () {},
        checkId: function (id, ids) {
          return true;
        },
        orgTypes: [{
          'type': 'Clinic'
        }, {
          'type': 'Clinic/Data'
        }, {
          'type': 'Business'
        }, {
          'type': 'Data Collector'
        }]
      };

      _organizations_ = {
        getOrganizations: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrganizations: function () {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        enableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        disableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationById: function (label) {
          var res = {
            data: 'testing'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getArchivedOrganizations: function (offset, itemsPerPage, field,
          direction) {
          /*jshint camelcase: false */
          var res = {
            data: {
              total_rows: ''
            }
          };
          /*jshint camelcase: true */
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };


      _$modalInstance_ = {
        close: function (modal) {
          return true;
        }
      };
      _selectedOrg_ = {
        id: 'Rangle',
        type: 'Clinic'
      };

      _allOrgs_ = {
        data: {
          row: ['Rangle1', 'Rangle2', 'Rangle3']
        }
      };


      closeModalSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('AssociatesEditCtrl', {
        $modalInstance: _$modalInstance_,
        $log: $log,
        organizations: _organizations_,
        selectedOrg: _selectedOrg_,
        allOrgs: _allOrgs_,
        associateViewHelper: _associateViewHelper_,
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions/variables', function () {
        expect(Ctrl.org).to.exist;
        expect(Ctrl.orgTypes).to.exist;
        expect(Ctrl.clinicSubTypes).to.exist;
        expect(Ctrl.updatePresets).to.exist;
        expect(Ctrl.checkId).to.exist;
        expect(Ctrl.close).to.exist;
        expect(Ctrl.setDataCollector).to.exist;
        expect(Ctrl.save).to.exist;
      });
    });

    describe('Function:', function () {

      it('updatePresets() update account types', function () {

        Ctrl.org = {
          isKagenDataCollector: true,
          canSendNotifications: true,
          nonMembersCanCall: true,
          isDataCollector: true
        };

        Ctrl.updatePresets(Ctrl.org);
        scope.$digest();

        expect(Ctrl.org.isKagenDataCollector).to.be.false;
        expect(Ctrl.org.canSendNotifications).to.be.false;
        expect(Ctrl.org.nonMembersCanCall).to.be.false;
        expect(Ctrl.org.isDataCollector).to.be.false;

        //expect(Ctrl.dupeId).to.be.true;
      });

      it('checkId() check for orgId duplicates', function () {
        var id = 'Rangle';
        Ctrl.checkId(id);

        scope.$digest();
        expect(Ctrl.dupeId).to.be.true;
      });

      it(
        'setDataCollector() if kagen dataCollector is selected we autopunch showReports',
        function () {
          Ctrl.org = {};
          Ctrl.options = {};
          Ctrl.org.isKagenDataCollector = true;
          Ctrl.options.showReports = false;
          Ctrl.setDataCollector();
          scope.$digest();

          expect(Ctrl.options.showReports).to.be.true;

          Ctrl.org.isKagenDataCollector = false;
          Ctrl.options.showReports = true;
          Ctrl.setDataCollector();
          scope.$digest();

          expect(Ctrl.options.showReports).to.be.false;
        });

      it(
        'close() closes the edit/create modal and returns an updated organization object',
        function () {
          Ctrl.spinner = true;
          Ctrl.close();

          scope.$digest();

          expect(Ctrl.spinner).to.be.false;
          expect(closeModalSpy.calledOnce).to.be.true;
        });

      it('save() should save the assoicate profile', function () {
        Ctrl.dupeId = false;
        Ctrl.orgType = {};
        Ctrl.orgType.type = 'Clinic';
        Ctrl.org = {};
        Ctrl.org.type = 'Clinic';
        Ctrl.options = {
          showPush: true,
          showVideo: true,
          showReports: true,
        };

        Ctrl.save();
        scope.$digest();
        expect(Ctrl.spinner).to.be.false;
        expect(Ctrl.org.isPartner).to.be.true;
        expect(Ctrl.org.canSendNotifications).to.be.true;
        expect(Ctrl.org.nonMembersCanCall).to.be.true;
        expect(Ctrl.org.isDataCollector).to.be.true;

        Ctrl.orgType.type = 'Clinic/Data';
        Ctrl.org = {};
        Ctrl.org.type = 'Clinic/Data';
        Ctrl.options = {};

        Ctrl.save();
        scope.$digest();
        expect(Ctrl.spinner).to.be.false;
        expect(Ctrl.org.isPartner).to.be.true;
        expect(Ctrl.org.canSendNotifications).to.be.false;
        expect(Ctrl.org.nonMembersCanCall).to.be.false;
        expect(Ctrl.org.isDataCollector).to.be.false;

      });

    });
  });

  describe('AssociatesCtrl - selectedOrg is Clinic/Data', function () {

    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {},
        clinicSubTypes: function () {},
        updatePresets: function () {},
        checkId: function (id, ids) {
          return true;
        },
        orgTypes: [{
          'type': 'Clinic'
        }, {
          'type': 'Clinic/Data'
        }, {
          'type': 'Business'
        }, {
          'type': 'Data Collector'
        }]
      };

      _organizations_ = {
        getOrganizations: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrganizations: function () {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        enableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        disableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationById: function (label) {
          var res = {
            data: 'testing'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getArchivedOrganizations: function (offset, itemsPerPage, field,
          direction) {
          /*jshint camelcase: false */
          var res = {
            data: {
              total_rows: ''
            }
          };
          /*jshint camelcase: true */
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };


      _$modalInstance_ = {
        close: function (modal) {
          return true;
        }
      };
      _selectedOrg_ = {
        id: 'Rangle',
        type: 'Clinic/Data'
      };

      _allOrgs_ = {
        data: {
          row: ['Rangle1', 'Rangle2', 'Rangle3']
        }
      };


      closeModalSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('AssociatesEditCtrl', {
        $modalInstance: _$modalInstance_,
        $log: $log,
        organizations: _organizations_,
        selectedOrg: _selectedOrg_,
        allOrgs: _allOrgs_,
        associateViewHelper: _associateViewHelper_,
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        expect(Ctrl.orgType).to.deep.equal({
          type: 'Clinic/Data'
        });
      });
    });
  });

  describe('AssociatesCtrl - selectedOrg is Business', function () {

    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {},
        clinicSubTypes: function () {},
        updatePresets: function () {},
        checkId: function (id, ids) {
          return true;
        },
        orgTypes: [{
          'type': 'Clinic'
        }, {
          'type': 'Clinic/Data'
        }, {
          'type': 'Business'
        }, {
          'type': 'Data Collector'
        }]
      };

      _organizations_ = {
        getOrganizations: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrganizations: function () {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        enableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        disableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationById: function (label) {
          var res = {
            data: 'testing'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getArchivedOrganizations: function (offset, itemsPerPage, field,
          direction) {
          /*jshint camelcase: false */
          var res = {
            data: {
              total_rows: ''
            }
          };
          /*jshint camelcase: true */
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };


      _$modalInstance_ = {
        close: function (modal) {
          return true;
        }
      };
      _selectedOrg_ = {
        id: 'Rangle',
        type: 'Business'
      };

      _allOrgs_ = {
        data: {
          row: ['Rangle1', 'Rangle2', 'Rangle3']
        }
      };


      closeModalSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('AssociatesEditCtrl', {
        $modalInstance: _$modalInstance_,
        $log: $log,
        organizations: _organizations_,
        selectedOrg: _selectedOrg_,
        allOrgs: _allOrgs_,
        associateViewHelper: _associateViewHelper_,
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        expect(Ctrl.orgType).to.deep.equal({
          type: 'Business'
        });
      });
    });
  });

  describe('AssociatesCtrl - selectedOrg is Data Collector', function () {

    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {},
        clinicSubTypes: function () {},
        updatePresets: function () {},
        checkId: function (id, ids) {
          return true;
        },
        orgTypes: [{
          'type': 'Clinic'
        }, {
          'type': 'Clinic/Data'
        }, {
          'type': 'Business'
        }, {
          'type': 'Data Collector'
        }]
      };

      _organizations_ = {
        getOrganizations: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrganizations: function () {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        enableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        disableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationById: function (label) {
          var res = {
            data: 'testing'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getArchivedOrganizations: function (offset, itemsPerPage, field,
          direction) {
          /*jshint camelcase: false */
          var res = {
            data: {
              total_rows: ''
            }
          };
          /*jshint camelcase: true */
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };


      _$modalInstance_ = {
        close: function (modal) {
          return true;
        }
      };
      _selectedOrg_ = {
        id: 'Rangle',
        type: 'Data Collector'
      };

      _allOrgs_ = {
        data: {
          row: ['Rangle1', 'Rangle2', 'Rangle3']
        }
      };


      closeModalSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('AssociatesEditCtrl', {
        $modalInstance: _$modalInstance_,
        $log: $log,
        organizations: _organizations_,
        selectedOrg: _selectedOrg_,
        allOrgs: _allOrgs_,
        associateViewHelper: _associateViewHelper_,
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        expect(Ctrl.orgType).to.deep.equal({
          type: 'Data Collector'
        });
      });
    });
  });

  describe('AssociatesCtrl - selectedOrg is null', function () {

    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {},
        clinicSubTypes: function () {},
        updatePresets: function () {},
        checkId: function (id, ids) {
          return true;
        },
        orgTypes: [{
          'type': 'Clinic'
        }, {
          'type': 'Clinic/Data'
        }, {
          'type': 'Business'
        }, {
          'type': 'Data Collector'
        }]
      };

      _organizations_ = {
        getOrganizations: function () {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: 'res.data'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        deleteOrganizations: function () {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        enableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        disableOrgAdmin: function (org) {
          var res = {};
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getOrganizationById: function (label) {
          var res = {
            data: 'testing'
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getArchivedOrganizations: function (offset, itemsPerPage, field,
          direction) {
          /*jshint camelcase: false */
          var res = {
            data: {
              total_rows: ''
            }
          };
          /*jshint camelcase: true */
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };


      _$modalInstance_ = {
        close: function (modal) {
          return true;
        }
      };
      _selectedOrg_ = null;

      _allOrgs_ = {
        data: {
          row: ['Rangle1', 'Rangle2', 'Rangle3']
        }
      };


      closeModalSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('AssociatesEditCtrl', {
        $modalInstance: _$modalInstance_,
        $log: $log,
        organizations: _organizations_,
        selectedOrg: _selectedOrg_,
        allOrgs: _allOrgs_,
        associateViewHelper: _associateViewHelper_,
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        expect(Ctrl.editView).to.be.false;
        expect(Ctrl.orgType).to.deep.equal({
          type: 'Clinic'
        });
      });
    });
  });

});