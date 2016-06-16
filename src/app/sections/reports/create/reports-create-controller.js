'use strict';

angular.module('ka-reports-create', ['ka-core', 'ka-reports-service'])
  .controller('ReportsCreateCtrl', function (
    allergenCategories,
    allergenLevels,
    allergenLevelLabels,
    allergyReports,
    $stateParams,
    $state,
    $log,
    ngProgress) {

    var vm = this;

    var clinicId = $stateParams.clinicId;

    vm.allergenCategories = allergenCategories;
    vm.allergenLevels = allergenLevels;
    vm.allergenLevelLabels = allergenLevelLabels;
    vm.clearAllergenLevel = allergyReports.clearAllergenLevel;
    vm.clearConcentrationLevel = allergyReports.clearConcentrationLevel;
    vm.pageReady = true;

    allergyReports.setLastViewedReport(clinicId);

    vm.report = allergyReports.getReportTemplate(clinicId);

    vm.save = function (report) {
      vm.pageReady = false;
      ngProgress.start();
      allergyReports.createReport(report)
        .then(function () {
          vm.pageReady = true;
          ngProgress.complete();
          $state.go($state.previous.name);
        }).then(null, $log.error);
    };

    vm.goBack = function () {
      $state.go($state.previous.name);
    };
  });