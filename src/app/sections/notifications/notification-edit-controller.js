'use strict';

angular.module('ka-notifications')
  .controller('NotificationEditCtrl', function ($state, $log, $stateParams, allergens, $scope,
                                                notifications, organizations, session, $modal, $window) {
    var vm = this;
    vm.medicalCriteriaRows = [{id: 'medicalConditions', name: 'Medical Conditions'}, {id: 'medications', name: 'Medications'}];
    vm.allergenCriteriaRows = [[{id: 'Trees', name: 'Trees'}, {id: 'Grasses', name: 'Grass'}], [{id:'Weeds', name: 'Weeds'}, {id:'Mold', name: 'Spores'}],
      [{id: 'Drugs', name: 'Drugs'}, {id: 'Animals', name: 'Animals'}], [{id: 'Food', name: 'Food'}, {id: 'null', name: 'Others'}]];
    vm.dialogSections  = [].concat.apply(vm.medicalCriteriaRows, vm.allergenCriteriaRows);
    vm.AllergenColumns = {};
    vm.editView = $stateParams.hasOwnProperty('notificationId');
    vm.dayRange = R.range(1, 32);
    vm.hideTemplates = false;
    vm.hideMessage = false;

    if (session.userCtx.role === 'operator') {
      organizations.getOrganizationIds().then(function (response) {
        vm.organizationList = response.data.rows.map(
          function (item) {
            return item.id;
          }
        );
      }).then(null, $log.error);
    }

    var notificationReady = notifications.getNotificationByIdAndOrg( $stateParams.organizationId, $stateParams.notificationId).then(function(response){
      vm.notification = response.data;
      var timeMoment = new Date();
      timeMoment.setHours(vm.notification.sendTime.substring(0,2));
      timeMoment.setMinutes(vm.notification.sendTime.substring(3,5));
      timeMoment.setSeconds(vm.notification.sendTime.substring(6,8));
      vm.notification.timeMoment = timeMoment;
      if (vm.notification.beginDate) { vm.notification.beginDateDate = moment(vm.notification.beginDate).utc().format('YYYY-MM-DD');}
      if (vm.notification.endDate) { vm.notification.endDateDate = moment(vm.notification.endDate).utc().format('YYYY-MM-DD');}

      if (!vm.editView) {
        vm.notification.organizationName = session.userCtx.role === 'operator' ?
          '' :
          session.userCtx.orgId;
      }
    }).then(null,
      $log.error
    );

    notifications.getNotificationTypes(session.userCtx.role === 'operator', false).then(function(response) {
      vm.types = response;
    }).then(null, $log.error);

    notifications.getNotificationTemplates().then(function(response) {
      vm.templates = response.data;
    }).then(null, $log.error);

    notifications.getNotificationStatuses().then(function(response) {
      vm.statuses = response.data;
    }).then(null, $log.error);

    notifications.getNotificationFrequencies().then(function(response) {
      vm.frequencies = response.data;
    }).then(null, $log.error);

    notifications.getNotificationSexes().then(function(response) {
      vm.sexes = response.data;
    }).then(null, $log.error);

    notifications.getNotificationLinks().then(function(response) {
      vm.links = response.data;
    }).then(null, $log.error);

    notifications.getDaysOfTheWeek().then(function(response) {
      vm.daysOfTheWeek = response.data;
    }).then(null, $log.error);

    allergens.getMedications().then(function(response) {
      notificationReady.then(function() {
        if (!vm.notification.rules.hasOwnProperty('medications')) {
          vm.notification.rules.medications = 'N/A';
        }
        if (vm.notification.rules.medications.hasOwnProperty('filter')) {
          vm.notification.rules.medications.filter.forEach(function(filter) {
            response.data.forEach(function(medication){
              if(Number(medication.medicationId) === Number(filter)) {
                medication.selected = true;
              }
            });
          });
        }
        if (vm.notification.rules.medications.hasOwnProperty('any')) {
          vm.notification.rules.medications = 'Any';
        }
        vm.AllergenColumns.medications = third(response.data);
      });
    });

    allergens.getMedicalConditions().then(function (response) {
      notificationReady.then(function() {
        if (!vm.notification.rules.hasOwnProperty('medicalConditions')) {
          vm.notification.rules.medicalConditions = 'N/A';
        }
        if (vm.notification.rules.medicalConditions.hasOwnProperty('filter')) {
          vm.notification.rules.medicalConditions.filter.forEach(function(filter) {
            response.data.forEach(function(medicalConditions){
              if(Number(medicalConditions.conditionId) === Number(filter)) {
                medicalConditions.selected = true;
              }
            });
          });
        }
        if (vm.notification.rules.medicalConditions.hasOwnProperty('any')) {
          vm.notification.rules.medicalConditions = 'Any';
        }
        vm.AllergenColumns.medicalConditions = third(response.data);
      });
    });

    allergens.getAllergens().then(function (response) {
      notificationReady.then(function() {
        if (vm.notification.rules.hasOwnProperty('allergens')) {
          if (vm.notification.rules.allergens.hasOwnProperty('filter')) {
            vm.notification.rules.allergens.filter.forEach(function (filter) {
              response.data.forEach(function (allergen) {
                if (Number(allergen.allergenId) === Number(filter)) {
                  allergen.selected = true;
                }
              });
            });
          }
          if (vm.notification.rules.allergens.hasOwnProperty('anyCategories')) {
            vm.notification.rules.allergens.anyCategories.forEach(function(item){
              vm.notification.rules[item] = 'Any';
            });
          }
        }
        var allergenList = R.groupBy(R.prop('category'), response.data);
        for (var key in allergenList) {
          if (key && allergenList.hasOwnProperty(key)) {
            vm.AllergenColumns[key] = third(allergenList[key]);
            var allergenSelectedCount = allergens.flattenAllergenList(vm.AllergenColumns[key]).length;
            if (!allergenSelectedCount && !vm.notification.rules.hasOwnProperty(key)) {
              vm.notification.rules[key] = 'N/A';
            }
          }
        }
      });
    });

    function third(array) {
      var newArray = [];
      var length = array.length;
      var modThreeRemainder = array.length % 3;
      var columnLength = Math.floor(length / 3);
      var offset = 0;
      for (var i = 0; i < 3; i++) {
        var extraItem = (i === 0 && modThreeRemainder) || (i === 1 && modThreeRemainder === 2) ? 1 : 0;
        var slice =  array.slice(offset, offset + columnLength + extraItem);
        newArray.push(slice);
        offset += slice.length;
      }
      return newArray;
    }

    vm.timeChanged = function() {
      var timeAsDate = new Date();
      timeAsDate.setHours(vm.notification.timeMoment.getHours());
      timeAsDate.setMinutes(0);
      timeAsDate.setSeconds(0);
      vm.notification.timeMoment = timeAsDate;
    };

    vm.changeLink = function () {
      if (vm.notification.link === '') {
        vm.hideTemplates = false;
        vm.hideMessage = false;
      } else {
        vm.hideTemplates = true;
        vm.hideMessage = true;
        vm.notification.template = 'Text';
      }
    };

    vm.changeType = function () {
      if (vm.notification.type === 'Not feeling well') {
        vm.hideTemplates = true;
      } else if (vm.notification.link !== '') {
         // change type, but link is still edit profile or call your doc
         vm.hideTemplates = true;
      } else {
        vm.hideTemplates = false;
      }
    };

    /**
     * [save: save/create]
     */
    vm.save = function () {
      $window.scrollTo(0, 0);
      vm.spinner = true;
      if (vm.notification.template.indexOf('Image') === -1 && vm.notification.hasOwnProperty('image')) {
        delete vm.notification.image;
        vm.notification.imageUrl = null;
      }
      if (vm.notification.template.indexOf('Text') === -1 && vm.notification.hasOwnProperty('message')) {
        vm.notification.message = null;
      }

      var medicalConditionsFilter = R.pluck('conditionId')(allergens.flattenAllergenList(vm.AllergenColumns.medicalConditions));
      if (medicalConditionsFilter.length) {
        vm.notification.rules.medicalConditions = {filter: medicalConditionsFilter};
      } else {
        if (vm.notification.rules.medicalConditions === 'Any') {
          vm.notification.rules.medicalConditions = {any: true};
        } else {
          delete vm.notification.rules.medicalConditions;
        }
      }

      var medicationsFilter = R.pluck('medicationId')(allergens.flattenAllergenList(vm.AllergenColumns.medications));
      if (medicationsFilter.length) {
        vm.notification.rules.medications = {filter: medicationsFilter};
      } else {
        if (vm.notification.rules.medications === 'Any') {
          vm.notification.rules.medications = {any: true};
        } else {
          delete vm.notification.rules.medications;
        }
      }

      var allergenFilter = [];
      var allergenAnys = [];
      Object.keys(vm.AllergenColumns).forEach(function(item) {
        if (item !== 'medications' && item !== 'medicalConditions') {
          var allergenList = allergens.flattenAllergenList(vm.AllergenColumns[item]);
          allergenFilter = [].concat.apply(allergenFilter, allergenList);
          if (vm.notification.rules[item] === 'Any') {
            allergenAnys.push(item);
          }
          delete vm.notification.rules[item];
        }
      });
      if (allergenFilter.length || allergenAnys.length) {
        vm.notification.rules.allergens = {};
      }
      if (allergenFilter.length) {
        vm.notification.rules.allergens.filter = R.pluck('allergenId')(allergenFilter);
      }
      if (allergenAnys.length) {
        vm.notification.rules.allergens.anyCategories = allergenAnys;
      }
      delete vm.notification.periodFilter;
      var apiPayload = notifications.mapVmToApi(vm.notification);
      notifications.createUpdateNotification(vm.notification.organizationName, apiPayload)
        .then(function (response) {
          vm.spinner = false;
          toastr.info('Notification saved with status ' + response.status + ' ' + response.statusText + '.');
          $state.go('notifications.list');
        }).then(null, function(response) {
          toastr.error('Failed to save Notification.<br/>' + response.status + ' ' + response.statusText + '.' + response.data);
          vm.spinner = false;
        });
    };

    /**
     * [cancelEdit: cancel save/create]
     */
    vm.cancelEdit = function() {
      toastr.info('Notification changes discarded.');
      $state.go('notifications.list');
    };

    vm.removeImage = function() {
      vm.notification.imageSelect = null;
    };

    notifications.getStates().then(function(response){
      vm.states = response.data;
    });

    notifications.getCities().then(function(response){
      vm.cities = response.data;
    });

    vm.selectedButton = function(criteriaType) {
      if (vm.AllergenColumns.hasOwnProperty(criteriaType.id)) {
        var count = allergens.flattenAllergenList(vm.AllergenColumns[criteriaType.id]).length;
        return count ? count : '';
      } else {
        return '';
      }
    };

    vm.removeCheckedItems = function(criteriaType) {
      vm.AllergenColumns[criteriaType.id].forEach(function(column){
        column.forEach(function(item){
          if (item.hasOwnProperty('selected')) { delete item.selected;}
        });
      });
    };

    vm.showCriteriaDialog = function(criteriaType) {
      var criteriaModal = $modal.open({
        size: 'lg',
        templateUrl: 'app/sections/notifications/notification-criteria.html',
        controller: 'NotificationCriteriaCtrl',
        controllerAs: 'Notification',
        resolve: {
          AllergenColumns: function () { return vm.AllergenColumns;},
          dialogSections: function() { return vm.dialogSections;},
          criteriaType: function() { return criteriaType;}
        }
      });
      criteriaModal.result.then(function(modalReturn) {
        vm.AllergenColumns[modalReturn.criteriaType.id] = modalReturn.AllergenColumns;
        var count = allergens.flattenAllergenList(vm.AllergenColumns[criteriaType.id]).length;
        if (count) {
          vm.notification.rules[criteriaType.id] = null;
        }
        if (vm.notification.rules[criteriaType.id] === null && !count) {
          vm.notification.rules[criteriaType.id] = 'N/A';
        }
      }, function() {
      });
    };
    vm.openBeginDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.beginDateOpened = true;
    };
    vm.openEndDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.endDateOpened = true;
    };
  })
  .directive('dateValidator', function() {
    return {
      require: 'ngModel',
      link: function (scope, elem, attr, ngModel) {
        function validate(value) {

          var d = Date.parse(value);

          // it is a date
          if (isNaN(d)) { // d.valueOf() could also work
            ngModel.$setValidity('valid', false);
          } else {
            ngModel.$setValidity('valid', true);
          }
        }

        scope.$watch(function () {
          return ngModel.$viewValue;
        }, validate);
      }
    };
  });