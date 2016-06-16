/*jshint camelcase: false */
'use strict';

angular.module('ka-reports-portal')
  .controller('ReportsHistoryCtrl', function (
    $state,
    $q,
    allergenLevelLabels,
    reportsService,
    $log,
    ngProgress,
    organizations) {

    var REPORTS_DEFAULT_OFFSET = 200;

    var vm = this;

    //PAGEINATION SETTINGS
    vm.currentPage = 1;
    vm.itemsPerPage = REPORTS_DEFAULT_OFFSET;

    vm.allergenLevelLabels = allergenLevelLabels;


    function toInteger(number) {
      return Math.round( // round to nearest integer
        Number(number) // type cast your input
      );
    }

    /**
     * [getReportsByOffset - returns a report for a specific offset]
     * @param {offset} - data offset to retrieve from backend]
     */
    function getReportsByOffset(offset) {
      return organizations.getAllReports(offset, vm.itemsPerPage);
    }

    /**
     * [getAllReports - returns all reports - paginated.
     *  saves return data to reportHistory and stores total rows]
     */
    function getAllReports() {
      var offset = (vm.currentPage - 1) * REPORTS_DEFAULT_OFFSET;
      return organizations.getAllReports(offset, vm.itemsPerPage)
        .then(function (res) {
          vm.total_rows = res.data.total_rows;
          vm.reportHistory = R.map(R.get('value'), res.data.rows);
        });
    }

    /**
     * [exportData - used to get all report data, filter by data, and
     * passes along to reportService to export .csv]
     */
    vm.exportData = function () {
      vm.spinner = true;

      var totalPageCalls = toInteger(vm.total_rows / vm.itemsPerPage);
      var offsets = [];

      for (var i = 0; i < totalPageCalls; i++) {
        offsets.push(i * vm.itemsPerPage);
      }

      $q.all(R.map(getReportsByOffset, offsets))
        .then(function (res) {
          var resultArray = [];
          var resultAsArrays = R.map(
            R.compose(
              R.get('rows'),
              R.get('data')))(res);

          angular.forEach(resultAsArrays, function (value, index) {
            resultArray = resultArray.concat(value);
          });
          resultArray = R.map(R.get('value'))(resultArray);
          reportsService.exportReportData(vm.date, resultArray);
          vm.spinner = false;
        });
    };

    vm.viewTodaysData = function () {
      $state.transitionTo('report.entry');
    };

    vm.pageLoaded = function () {
      ngProgress.complete();
      vm.pageReady = true;
    };

    vm.pageReset = function () {
      ngProgress.start();
      vm.pageReady = false;
    };

    // Called on initial load and pagination changes
    vm.pageChange = function () {
      vm.pageReset();
      vm.reportHistory = '';
      getAllReports()
        .then(function () {
          vm.pageLoaded();
        })
        .then(null, function (err) {
          vm.pageLoaded();
          window.alert(
            'Sorry - something went wrong!\nPlease refresh the page.');
          $log.error(err);
        });
    };

    vm.pageChange();
  });