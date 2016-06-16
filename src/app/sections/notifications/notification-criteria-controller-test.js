'use strict';
/*jshint expr:true*/

describe('NotificationCriteriaCtrl', function () {
  beforeEach(module('ka-notifications'));


  var Ctrl;
  var scope;
  var q;

  var _$modalInstance;
  var modalInstanceSpy;
  var criteriaType;
  var AllergenColumns;

  describe('NotificationCriteriaCtrl ', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      criteriaType = {id: 'Meds'};
      AllergenColumns = [{id: 'Meds', allergen : 'test'}];

      _$modalInstance = {
        close: function () {}
      };

      modalInstanceSpy = sinon.spy(_$modalInstance, 'close');

      Ctrl = $controller('NotificationCriteriaCtrl', {
        $modalInstance: _$modalInstance,
        criteriaType: criteriaType,
        AllergenColumns: AllergenColumns
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions', function () {
        expect(Ctrl.save).to.exist;
        expect(Ctrl.criteriaType).to.exist;
        expect(Ctrl.AllergenColumns).to.exist;
      });

    });

    describe('Function:', function () {

      it('save() should close modal', function () {
        var memberId = 'testId';
        Ctrl.save();
        scope.$digest();

        expect(modalInstanceSpy.calledOnce).to.be.true;
        expect(modalInstanceSpy.calledWith({
          criteriaType: criteriaType,
          AllergenColumns: Ctrl.AllergenColumns[criteriaType.id]
        })).to.be.true;
      });

    });
  });

});