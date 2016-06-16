'use strict';
/*jshint expr:true*/

describe('AssociatesCtrl', function () {
  beforeEach(module('ka-associates'));


  var Ctrl;
  var scope;
  var q;

  var _$location_;
  var _$window_;
  var _$modal_;
  var _organizations_;
  var _associateViewHelper_;
  var _session_;
  var _ngProgress_;
  var ngProgressSpyStart;
  var ngProgressSpyComplete;
  var openModalSpy;


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

  describe('AssociatesCtrl ', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _associateViewHelper_ = {
        showVideo: function () {},
        showPush: function () {},
        showReports: function () {}
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

      _$window_ = {};
      _$window_.confirm = function () {
        return true;
      };

      _$location_ = {
        url: function () {
          return true;
        }
      };
      _session_ = {};
      _session_.userCtx = {
        role: 'operator'
      };


      _ngProgress_ = {
        start: function () {},
        complete: function () {}
      };


      _$modal_ = {
        open: function (modal) {
          var result = function (res) {
            return res;
          };
          return {
            result: {
              then: result
            }
          };
        }
      };


      ngProgressSpyStart = sinon.spy(_ngProgress_, 'start');
      ngProgressSpyComplete = sinon.spy(_ngProgress_, 'complete');
      openModalSpy = sinon.spy(_$modal_, 'open');

      Ctrl = $controller('AssociatesCtrl', {
        $modal: _$modal_,
        $log: $log,
        $location: _$location_,
        $window: _$window_,
        organizations: _organizations_,
        associateViewHelper: _associateViewHelper_,
        session: _session_,
        ngProgress: _ngProgress_
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions/variables', function () {
        expect(Ctrl.field).to.exist;
        expect(Ctrl.direction).to.exist;
        expect(Ctrl.archiveToggle).to.exist;
        expect(Ctrl.options).to.exist;
        expect(Ctrl.itemsPerPage).to.exist;
        expect(Ctrl.currentPage).to.exist;
        expect(Ctrl.searchValueOnChange).to.exist;
        expect(Ctrl.searchOnSelect).to.exist;
        expect(Ctrl.removeFromOrgs).to.exist;
        expect(Ctrl.toggle).to.exist;
        expect(Ctrl.changeFilter).to.exist;
        expect(Ctrl.pageChanged).to.exist;
        expect(Ctrl.setOrgState).to.exist;
        expect(Ctrl.deleteOrg).to.exist;
        expect(Ctrl.createOrg).to.exist;
        expect(Ctrl.editOrg).to.exist;
        expect(Ctrl.createOrgAdmin).to.exist;
        expect(Ctrl.deleteOrgAdmin).to.exist;
      });
    });

    describe('Function:', function () {

      it(
        'pageChanged() updates the associates list when the paging + sorting changes',
        function () {
          Ctrl.pageChanged();
          scope.$digest();
          expect(ngProgressSpyStart.called).to.be.true;
          expect(ngProgressSpyComplete.called).to.be.true;
        });

      it(
        'searchValueOnChange() updates the organization view (to default)when the search box is cleared',
        function () {
          Ctrl.searchValue = [];
          Ctrl.orgs = {};
          Ctrl.searchValueOnChange();
          scope.$digest();
          expect(Ctrl.orgs).to.eq('res.data');
        });

      it('searchOnSelect() change results to search results', function () {
        Ctrl.orgs = {};
        Ctrl.searchOnSelect(null, null, null);
        scope.$digest();
        expect(Ctrl.orgs).to.deep.equal(['testing']);
      });

      it('changeFilter() change orderBy property', function () {
        Ctrl.field = 'name';
        Ctrl.direction = 'desc';
        Ctrl.changeFilter('name');
        scope.$digest();

        expect(Ctrl.direction).to.eq('asc');
        expect(Ctrl.field).to.eq('name');

        Ctrl.field = 'name';
        Ctrl.direction = 'asc';
        Ctrl.changeFilter('name');
        scope.$digest();

        expect(Ctrl.direction).to.eq('desc');
        expect(Ctrl.field).to.eq('name');

        Ctrl.field = 'name';
        Ctrl.changeFilter('phone');
        scope.$digest();

        expect(Ctrl.field).to.eq('phone');
      });

      it('toggle() toggle vm.archiveToggle', function () {
        Ctrl.archiveToggle = false;
        Ctrl.toggle();
        scope.$digest();
        expect(Ctrl.archiveToggle).to.be.true;

        Ctrl.archiveToggle = true;
        Ctrl.toggle();
        scope.$digest();
        expect(Ctrl.archiveToggle).to.be.false;
      });

      it('setOrgState() shoudld change the org state (archived/active)',
        function () {
          var org = mockOrgs[0];
          var state = false;
          Ctrl.setOrgState(org, state);
          scope.$digest();

          expect(org.value.isArchived).to.be.true;
          expect(org.value.isPartner).to.be.false;
          expect(ngProgressSpyStart.called).to.be.true;
          expect(ngProgressSpyComplete.called).to.be.true;

          state = true;
          Ctrl.setOrgState(org, state);
          scope.$digest();

          expect(org.value.isArchived).to.be.false;
          expect(org.value.isPartner).to.be.false;
          expect(ngProgressSpyStart.called).to.be.true;
          expect(ngProgressSpyComplete.called).to.be.true;

          org.value.isArchived = '';
          org.value.adminUserName = '';
          Ctrl.setOrgState(org, state);
          scope.$digest();

          expect(ngProgressSpyStart.called).to.be.true;
          expect(ngProgressSpyComplete.called).to.be.true;

        });


      it('deleteOrg() shoudld open the create associate modal',
        function () {
          var org = mockOrgs[0];
          org.value.adminUserName = 'Rangle';
          Ctrl.deleteOrg(org);
          scope.$digest();
          expect(ngProgressSpyStart.calledTwice).to.be.true;
          expect(ngProgressSpyComplete.calledTwice).to.be.true;

          org.value.adminUserName = '';
          Ctrl.deleteOrg(org);
          scope.$digest();
          expect(ngProgressSpyStart.calledThrice).to.be.true;
          expect(ngProgressSpyComplete.calledThrice).to.be.true;

        });

      it('deleteOrg() shoudld delete a associate',
        function () {
          Ctrl.createOrg();
          scope.$digest();
          expect(openModalSpy.calledOnce).to.be.true;
        });


      it('editOrg() shoudld open the edit associate modal',
        function () {
          Ctrl.orgs = mockOrgs;
          var orgId = 'Rangle';

          Ctrl.editOrg(orgId);
          scope.$digest();
          expect(openModalSpy.calledOnce).to.be.true;
        });

      it('createOrgAdmin() shoudld open the createOrgAdmin modal',
        function () {
          var org = {
            value: ''
          };
          Ctrl.createOrgAdmin(org);
          scope.$digest();
          expect(openModalSpy.calledOnce).to.be.true;
        });

      it(
        'deleteOrgAdmin() should remove adminUsername and call updateOrganizations',
        function () {
          var org = {};
          org.value = {
            adminUserName: 'testAdminUserName'
          };
          Ctrl.deleteOrgAdmin(org);
          scope.$digest();

          expect(org.value.adminUserName).to.eq('');
        });


    });
  });

});


