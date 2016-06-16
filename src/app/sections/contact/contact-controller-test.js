'use strict';
/*jshint expr:true*/

describe('ContactCtrl', function () {
  beforeEach(module('ka-helper'));
  beforeEach(module('ka-contact-us'));



  var Ctrl;
  var scope;
  var q;
  var _$http_;
  var _$modalInstance_;
  var _toastr_;
  var httpPostSpy;
  var modalInstanceSpy;

  describe('ContactCtrl ', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log,
      helper) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _$modalInstance_ = {
        close: function () {}
      };

      _$http_ = {
        post: function () {
          q = $q.defer();
          q.resolve();
          return q.promise;
        }
      };

      httpPostSpy = sinon.spy(_$http_, 'post');
      modalInstanceSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('ContactCtrl', {
        $http: _$http_,
        $modalInstance: _$modalInstance_,
        helper: helper
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions', function () {
        expect(Ctrl.submit).to.exist;
      });

    });

    describe('Function:', function () {

      it('submit() should return if not a valid email', function () {
        Ctrl.email = 'notvalidemail.com';
        Ctrl.submit();
        scope.$digest();

        expect(httpPostSpy.calledWith('/api/contact')).to.eq(false);
        expect(modalInstanceSpy.called).to.be.false;
      });

      it('submit() should submit', function () {
        Ctrl.email = 'test@test.com';
        Ctrl.submit();
        scope.$digest();

        expect(httpPostSpy.calledWith('/api/contact')).to.eq(true);
        expect(modalInstanceSpy.called).to.be.true;
      });

    });

  });

});


describe('ContactCtrl', function () {
  beforeEach(module('ka-helper'));
  beforeEach(module('ka-contact-us'));



  var Ctrl;
  var scope;
  var q;
  var _$http_;
  var _$modalInstance_;
  var _toastr_;
  var httpPostSpy;
  var modalInstanceSpy;

  describe('ContactCtrl ', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log,
      helper) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _$modalInstance_ = {
        close: function () {}
      };

      _$http_ = {
        post: function () {
          q = $q.defer();
          q.reject();
          return q.promise;
        }
      };

      httpPostSpy = sinon.spy(_$http_, 'post');
      modalInstanceSpy = sinon.spy(_$modalInstance_, 'close');

      Ctrl = $controller('ContactCtrl', {
        $http: _$http_,
        $modalInstance: _$modalInstance_,
        helper: helper
      });

    }));


    describe('Function:', function () {

      it('submit() http.post fails', function () {
        Ctrl.email = 'test@test.com';
        Ctrl.submit();
        scope.$digest();

        expect(httpPostSpy.calledWith('/api/contact')).to.eq(true);
        expect(modalInstanceSpy.called).to.be.true;
      });

    });

  });

});