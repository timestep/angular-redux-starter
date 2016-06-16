'use strict';

angular.module('ka-reports-edit', ['ka-core'])
  .controller('ReportsEditCtrl', function (
    allergensFor,
    allergenCategories,
    allergenLevels,
    allergenLevelLabels,
    allergyReports,
    reportsService,
    $stateParams,
    $state,
    $log,
    ngProgress) {

    var vm = this;

    function pageReady() {
      vm.pageReady = true;
      ngProgress.complete();
    }

    function pageLoading() {
      vm.pageReady = false;
      ngProgress.start();
    }

    pageLoading();

    vm.allergenCategories = allergenCategories;
    vm.allergenLevels = allergenLevels;
    vm.allergenLevelLabels = allergenLevelLabels;
    vm.reportId = $stateParams.reportId;
    vm.clearAllergenLevel = allergyReports.clearAllergenLevel;
    vm.clearConcentrationLevel = allergyReports.clearConcentrationLevel;


    vm.saveReport = function (report) {
      pageLoading();
      allergyReports.updateReport(report)
        .then(function (res) {
          pageReady();
          $state.go($state.previous.name);
        }).then(null, $log.error);
    };

    vm.goBack = function () {
      $state.go($state.previous.name);
    };

    reportsService.getReportById($stateParams.reportId)
      .then(function (report) {

        var allergens = {};
        vm.report = report;

        allergyReports.setLastViewedReport(vm.report.clinicId);

        // for each allergen category...
        allergenCategories.forEach(function (allergenCategory) {
          allergens[allergenCategory] = [];

          // build concentration types for each allergen category
          angular.forEach(R.keys(allergensFor.data[allergenCategory]),
            function (
              value, index) {
              allergens[allergenCategory].push({
                'allergen': value,
                'concentration': null
              });
            });
          // append saved concentration data to each allergen objects
          angular.forEach(vm.report.report[allergenCategory].detailedConcentrations,
            function (value, index) {
              var reportToUpdate = R.find(R.propEq('allergen', value.allergen))
                (allergens[allergenCategory]);
              reportToUpdate.concentration = value.concentration;
            });
          vm.report.report[allergenCategory].detailedConcentrations =
            allergens[allergenCategory];
        });
        pageReady();
      }).then(null, $log.error);
  });