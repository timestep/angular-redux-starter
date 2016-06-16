'use strict';
/*jshint expr:true*/


function getService(serviceName) {
  var injectedService;
  inject([serviceName,
    function (serviceInstance) {
      injectedService = serviceInstance;
    }
  ]);
  return injectedService;
}


describe('AssociatesOrgAdminCtrl - OrgAdmin Creation Modal', function () {
  beforeEach(module('ka-helper'));
  beforeEach(module('ka-organizations'));
  beforeEach(module('ka-associates'));



  var Ctrl;
  var modalInstance;
  var selectedOrg;
  var scope;
  var modalCloseSpy;
  var $logSpy;
  var organizations;
  var q;


  describe('AssociatesOrgAdminCtrl - OrgAdmin Creation Modal', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $rootScope,
      $q,
      $controller,
      $log,
      helper) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();
      selectedOrg = {
        id: 'testOrg'
      };

      modalInstance = {
        close: function () {
          return true;
        },
        dismiss: function () {
          return true;
        },
        result: function () {
          var res = {};
          res.status = 200;
          return res;
        }
      };

      organizations = {
        createOrgAdmin: function (username, password, orgId) {
          q = $q.defer();
          q.resolve();
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          q = $q.defer();
          q.resolve();
          return q.promise;
        }
      };

      modalCloseSpy = sinon.spy(modalInstance, 'close');

      Ctrl = $controller('AssociatesOrgAdminCtrl', {
        $log: $log,
        $modalInstance: modalInstance,
        organizations: organizations,
        selectedOrg: selectedOrg,
        helper: helper
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should instantiate a selected org on scope', function () {
        expect(Ctrl.org.id).to.eq('testOrg');
      });

      it('should contain the following public functions', function () {
        expect(Ctrl.close).to.be.defined;
        expect(Ctrl.checkPassword).to.be.defined;
        expect(Ctrl.createOrgAdminw).to.be.defined;
      });

    });

    describe('Function:', function () {

      it('createOrgAdmin() should create orgAdmin', function () {
        Ctrl.createOrgAdmin('testUsername', 'testPassword', selectedOrg
          .id);
        scope.$digest();

        expect(modalCloseSpy.called).to.eq(true);
        expect(Ctrl.spinner).to.eq(false);
        expect(Ctrl.org.adminUserName).to.eq('testUsername');
      });

      it(
        'checkPassword() with identical passwords and non-complex password',
        function () {
          var password = 'testing';
          var retryPassword = 'testing';
          Ctrl.checkPassword(password, retryPassword);
          scope.$digest();

          expect(Ctrl.validOrgAdmin).to.be.true;
          expect(Ctrl.passwordComplexitySatisfied).to.be.false;
        });

      it('checkPassword() with identical passwords and complex password',
        function () {
          var password = 'testing!101A';
          var retryPassword = 'testing!101A';
          Ctrl.checkPassword(password, retryPassword);
          scope.$digest();

          expect(Ctrl.validOrgAdmin).to.be.true;
          expect(Ctrl.passwordComplexitySatisfied).to.be.true;
        });

      it('checkPassword() with different passwords', function () {
        var password = 'testing!101A';
        var retryPassword = 'testing2d1A';
        Ctrl.checkPassword(password, retryPassword);
        scope.$digest();

        expect(Ctrl.validOrgAdmin).to.be.false;
      });

      it('close() should close the orgAdmin creation modal', function () {
        Ctrl.close();
        scope.$digest();

        expect(modalCloseSpy.called).to.eq(true);
      });

    });
  });

  describe('AssociatesOrgAdminCtrl - OrgAdmin Creation Modal', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $rootScope,
      $q,
      $controller,
      $log,
      helper) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();
      selectedOrg = {
        id: 'testOrg'
      };

      modalInstance = {
        close: function () {
          return true;
        },
        dismiss: function () {
          return true;
        },
        result: function () {
          var res = {};
          res.status = 200;
          return res;
        }
      };

      var mockError = {
        'error': 'failed'
      };
      organizations = {
        createOrgAdmin: function (username, password, orgId) {
          var err = {};
          err.data = mockError;
          q = $q.defer();
          q.reject(err);
          return q.promise;
        },
        updateOrganizations: function (orgId, org) {
          var err = {};
          err.data = mockError;
          q = $q.defer();
          q.reject(err);
          return q.promise;
        }
      };

      modalCloseSpy = sinon.spy(modalInstance, 'close');
      $logSpy = sinon.spy($log, 'error');

      Ctrl = $controller('AssociatesOrgAdminCtrl', {
        $log: $log,
        $modalInstance: modalInstance,
        organizations: organizations,
        selectedOrg: selectedOrg,
        helper: helper
      });

    }));


    describe('Function:', function () {

      it('createOrgAdmin() on error', function () {
        Ctrl.createOrgAdmin('testUsername', 'testPassword', selectedOrg
          .id);
        scope.$digest();

        expect(modalCloseSpy.called).to.eq(true);
        expect($logSpy.called).to.eq(true);
        expect(Ctrl.spinner).to.eq(false);
      });

    });
  });
});