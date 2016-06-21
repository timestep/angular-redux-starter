export default function ReportsCtrl(
  $state,
  allergenLevels,
  allergenLevelLabels,
  allergyReports,
  reportsService,
  $log,
  ngProgress,
  organizations,
  $modal,
  $q
  ) {
  var vm = this;

  // get report template
  var report = allergyReports.getReportTemplate().report;

  var REPORTS_DEFAULT_OFFSET = 25;
  var ENTRY_ROUTE = 'report.entry';
  var HISTORY_ROUTE = 'report.history';

  vm.clinicReports = [];
  vm.allergenValues = [];
  vm.grassData = [];
  vm.treesData = [];
  vm.weedsData = [];
  vm.moldData = [];

  //PAGEINATION SETTINGS
  vm.itemsPerPage = REPORTS_DEFAULT_OFFSET;
  vm.currentPage = 1;

  vm.allergenLevelLabels = allergenLevelLabels;
  vm.allergenCategories = [{
    type: 'Trees',
    data: vm.treesData
  }, {
    type: 'Weeds',
    data: vm.weedsData
  }, {
    type: 'Grass',
    data: vm.grassData
  }, {
    type: 'Mold Spores',
    data: vm.moldData
  }];

  var getDataCollectors = function () {
    var offset = (vm.currentPage - 1) * REPORTS_DEFAULT_OFFSET;
    return organizations.getKagenDataCollectors(offset, vm.itemsPerPage)
      .then(function (res) {
        vm.total_rows = res.data.total_rows;
        vm.clinics = R.filter(isKagenDataCollector, res.data.rows);
      })
      .then(function () {
        return $q.all(R.map(getAllReportsAndAttachTodays, vm.clinics));
      });
  };

  vm.pageLoaded = function () {
    ngProgress.complete();
    vm.pageReady = true;
  };

  vm.pageReset = function () {
    ngProgress.start();
    vm.pageReady = false;
  };

  vm.reportSaved = function () {
    ngProgress.complete();
    vm.saving = false;
  };

  vm.reportSaving = function () {
    ngProgress.start();
    vm.saving = true;
  };

  vm.viewAllData = function () {
    $state.transitionTo('report.history');
  };

  vm.isLastReportDateFromToday = function (clinic) {
    return moment(clinic.value.lastReportEntered).isSame(moment(), 'day');
  };


  /**
   * [getTopAllergens provides a modal to capature the top three ranked allergens]
   * @param  {[type]} index  [index of the viewModel clinic that was selected]
   * @param  {[type]} items  [items to populate the modal with]
   * @param  {[type]} clinic [the clinic data to append the results to]
   * @param  {[type]} type   [the type of allergen 'Trees', 'Weeds', 'Grass', or 'Mold']
   */
  vm.getTopAllergens = function (index, items, clinic, type) {
    var createModalInstance = $modal.open({
      templateUrl: 'app/sections/reports/allergen-portal/top-allergens.html',
      controller: 'TopAllergenCtrl',
      controllerAs: 'allergens',
      resolve: {
        selectedOrg: function () {
          return clinic;
        },
        allergenItems: function () {
          return items;
        },
        allergenType: function () {
          return type;
        }
      }
    });
    createModalInstance.result
      .then(function (res) {
        var sortedAllergens = R.sortBy(R.prop('res'));
        var temp = allergyReports.getReportTemplate(clinic.id);
        if (res.data && res.data.length > 0) {
          vm.clinics[index].reports.report[type].detailedConcentrations =
            temp.report[type].detailedConcentrations;

          angular.forEach(sortedAllergens(res.data), function (value, key) {
            vm.clinics[index].reports.report[type].detailedConcentrations[
              value.id].allergen = value.label;
            vm.clinics[index].reports.report[type].detailedConcentrations[
              value.id].concentration = value.res;
          });
        } else {
          if (res.data && res.data.length === 0) {
            angular.forEach(vm.clinics[index].reports.report[type].detailedConcentrations,
              function (value, key) {
                vm.clinics[index].reports.report[type].detailedConcentrations[
                  key].allergen = '';
                vm.clinics[index].reports.report[type].detailedConcentrations[
                  key].concentration = '';
              });
          }
        }
      });
  };

  /**
   * [undoReport Allows the user to remove a previous created 'No Data' report]
   * @param  {[type]} clinic [clinic owner of the report to be revised]
   */
  vm.undoReport = function (clinic) {
    clinic.value.lastReportEntered = null;
    vm.reportSaving();
    organizations.updateOrganizations(clinic.id, clinic.value)
      .then(function (res) {
        vm.reportSaved();
      }).then(null, $log.error);
  };

  /**
   * [reviseReports Allows the user to revised a previous created report]
   * @param  {[type]} clinic [clinic owner of the report to be revised]
   */
  vm.reviseReports = function (clinic) {
    vm.reportSaving();
    clinic = reportsService.prepareReports(clinic);
    organizations.updateOrganizations(clinic.id, clinic.value)
      .then(function (res) {
        reportsService.updateReportById(clinic.reports._id, clinic.reports)
          .then(function (res) {
            clinic.reports._id = res.data.id;
            vm.reportSaved();
          });
      }).then(null, $log.error);
  };

  /**
   * [createReport Allows the user to create a report]
   * @param  {[type]} clinic [clinic owner of the report to be created]
   */
  vm.createReport = function (clinic) {
    vm.reportSaving();
    clinic = reportsService.prepareReports(clinic);
    organizations.updateOrganizations(clinic.id, clinic.value)
      .then(function (res) {
        reportsService.createReport(clinic.reports)
          .then(function (res) {
            clinic.reports._id = res.data.id;
            vm.reportSaved();
          });
      }).then(null, $log.error);
  };

  // used to filter only clinics that are dataCollectors
  var isKagenDataCollector = function (clinic) {
    if (clinic.value.isKagenDataCollector) {

      clinic.reports = allergyReports.getReportTemplate(clinic.id);
      return clinic;
    }
  };

  // gets all reports and attaches reports from 'today' to a clinic
  var getAllReportsAndAttachTodays = function (clinic) {
    return allergyReports.getClinicReports(clinic.id)
      .then(function (res) {

        var getClinicData = R.map(R.prop('value'), res.rows);
        var clinicDataSortedByDate = R.reverse(
          R.sortBy(
            R.prop('timestamp'), getClinicData));

        vm.clinicReports = vm.clinicReports.concat(
          clinicDataSortedByDate);

        var clinicReportsFromToday = R.filter(reportsService.checkTimeStamp,
          clinicDataSortedByDate);

        if (clinicReportsFromToday) {
          angular.forEach(clinicReportsFromToday, function (report, key) {
            // attached report and return if valid timestamp
            if (reportsService.attachReportToClinic(report, clinic)) {
              return;
            }
          });
        }
      }).then(null, $log.error);
  };

  vm.pageChange = function () {
    vm.pageReset();
    vm.clinics = '';
    getDataCollectors()
      .then(function () {
        vm.pageLoaded();
      });
  };

  var initController = function () {
    vm.pageReset();

    // used in reports.entry view for drop down list
    angular.forEach(allergenLevelLabels, function (value, key) {
      vm.allergenValues.push({
        id: key,
        label: value
      });
    });
    vm.allergenValues.push({
      id: -1,
      label: 'No Data'
    });

    // used to populate the allergen list in the ranking modal
    var getTopAllergens = reportsService.generateTopAllergens;
    getTopAllergens(report.Trees.detailedConcentrations, vm.treesData);
    getTopAllergens(report.Weeds.detailedConcentrations, vm.weedsData);
    getTopAllergens(report.Grass.detailedConcentrations, vm.grassData);
    getTopAllergens(report['Mold Spores'].detailedConcentrations, vm.moldData);

    // gets all clinics
    // filters only data collectors
    // get all reports and attaches valid reports to the clinic
    // calls pageLoaded when compelete
    getDataCollectors()
      .then(function () {
        vm.pageLoaded();
      }).then(null, function (err) {
        vm.pageLoaded();
        window.alert(
          'Sorry - something went wrong!\nPlease refresh the page.');
        $log.error(err);
      });
  };

  initController();
};
