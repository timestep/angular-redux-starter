'use strict';

angular.module('ka-video-chat-data', [
  'ka-video-chat-logs',
  'ka-helper',
  'ka-csv-worker',
  'ka-video-chat-log-formatter'
])
  .controller('VideoChatDataCtrl', function VideoChatDataCtrl(
    videoChatLogs,
    helper,
    csvWorker,
    videoChatLogFormatter) {
    var vm = this;
    vm.callsPerPage = 6;
    vm.currentPage = 1;
    vm.disableExport = true;
    var logRows;

    vm.switchPage = function switchPage () {
      vm.logs = videoChatLogFormatter.formatPage(
        vm.currentPage, vm.callsPerPage, logRows);
    };

    vm.refresh = function refresh() {
      videoChatLogs.get()
        .then(function (data) {
          logRows = R.reverse(data.rows);
          vm.totalCalls = R.prop('total_rows', data);
          vm.switchPage();
          vm.updateCSVBlob();
        });
    };

    vm.getDownloadName = function getDownloadName() {
      return 'call-log.' +
        (new Date()).toISOString() +
        '.csv';
    };

    vm.updateCSVBlob = function updateCSVBlob() {
      vm.disableExport = true;
      return csvWorker.getCSV(videoChatLogFormatter.repairEmails(logRows))
        .then(function (csv) {
          var file = new Blob([csv]);
          vm.blobCSV = URL.createObjectURL(file);
          vm.disableExport = false;
        });
    };

    vm.refresh();
  });
