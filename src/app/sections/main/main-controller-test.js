'use strict';
/*jshint expr:true*/

describe('MainCtrl', function () {
  beforeEach(module('ka-session'));
  beforeEach(module('ka-main'));


  var Ctrl;
  var scope;
  var modalOpenSpy;
  var mockSession;
  var mockState;
  var mockModal;
  var stateGoSpy;

  var q;


  describe('MainCtrl ', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $controller,
      $log,
      $rootScope,
      session) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      mockState = {
        go: function (a, b, c) {
          return true;
        }
      };

      mockModal = {
        open: function (modal) {
          return modal;
        }
      };

      mockSession = {
        logout: function () {
          q = $q.defer();
          q.resolve();
          return q.promise;
        },
        removeSessionStorage: function () {
          return true;
        },
        startSessionTimer: function () {
          return true;
        }
      };


      modalOpenSpy = sinon.spy(mockModal, 'open');
      stateGoSpy = sinon.spy(mockState, 'go');

      Ctrl = $controller('MainCtrl', {
        $modal: mockModal,
        $state: mockState,
        $log: $log,
        $rootScope: $rootScope,
        session: mockSession
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions', function () {
        expect(Ctrl.showAboutUs).to.exist;
        expect(Ctrl.showReference).to.exist;
        expect(Ctrl.logout).to.exist;
        expect(Ctrl.showContactForm).to.exist;
        expect(Ctrl.showLogin).to.exist;
      });

    });

    describe('Function:', function () {


      it('showAboutUs() should create a modal', function () {
        Ctrl.showAboutUs();
        scope.$digest();

        expect(modalOpenSpy.called).to.eq(true);
        expect(modalOpenSpy.calledWith({
          templateUrl: 'app/sections/main/about.html',
          windowClass: 'app-modal-window-aboutus'
        })).to.eq(true);

      });

      it('showReference() should create a modal', function () {
        Ctrl.showReference();
        scope.$digest();

        expect(modalOpenSpy.called).to.eq(true);
        expect(modalOpenSpy.calledWith({
          templateUrl: 'app/sections/reference/reference.html',
          windowClass: 'app-modal-window-reference'
        })).to.eq(true);

      });

      it('showContactForm() should create a modal', function () {
        Ctrl.showContactForm();
        scope.$digest();

        expect(modalOpenSpy.called).to.eq(true);
        expect(modalOpenSpy.calledWith({
          templateUrl: 'app/sections/contact/contact.html',
          controller: 'ContactCtrl as contact',
        })).to.eq(true);

      });

      it('showLogin() should create a modal', function () {
        Ctrl.showLogin();
        scope.$digest();

        expect(modalOpenSpy.called).to.eq(true);
        expect(modalOpenSpy.calledWith({
          templateUrl: 'app/sections/login/login.html',
          controller: 'LoginCtrl',
          controllerAs: 'login',
          size: 'sm'
        })).to.eq(true);

      });

      it('logout() should clear session and reload page', function () {
        Ctrl.logout();
        scope.$digest();

        expect(stateGoSpy.called).to.eq(true);
        expect(stateGoSpy.calledWith('main', {}, {
          reload: true
        })).to.eq(true);
      });

    });
  });

});