'use strict';
angular.module('ka-notifications')
  .controller('NotificationCriteriaCtrl', function (
    $modalInstance,
    criteriaType,
    AllergenColumns) {
    var vm = this;
    vm.criteriaType = criteriaType;
    vm.AllergenColumns = AllergenColumns;

    /**
     * [save: closes the modal saves the record.]
     */
    vm.save = function () {
      vm.spinner = false;
      $modalInstance.close({
        criteriaType: criteriaType,
        AllergenColumns: vm.AllergenColumns[criteriaType.id]
      });
    };
  });
