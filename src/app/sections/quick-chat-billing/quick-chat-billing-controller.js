'use strict';

angular.module('ka-quick-chat-billing', [
  'ka-generic-paginator',
  'ka-csv-worker'
])
  .controller('QuickChatBillingCtrl', function QuickChatBillingCtrl(
    usageData,
    genericPaginator,
    csvWorker) {
    var vm = this;
    vm.itemsPerPage = 6;
    vm.currentPage = 1;
    vm.disableExport = true;
    var usageRows;

    function formatFirstDay(t) {
      return (t.clone()
              .date(1)
              .format('YYYY-MM-DD'));
    }

    vm.init = function() {
      var now = moment.utc();
      vm.from = (
        formatFirstDay(
          now.clone()
            .subtract('1', 'month'))
      );
      vm.to = formatFirstDay(now);

      vm.refresh();
    };

    vm.switchPage = function switchPage () {
      vm.usage = genericPaginator(vm.currentPage,
                                  vm.itemsPerPage,
                                  usageRows);
    };

    vm.refresh = function refresh() {
      usageData.get(vm.from, vm.to)
        .then(function (data) {
          usageRows = data.rows;
          vm.total = R.prop('total_rows', data);
          vm.switchPage();
          vm.updateCSVBlob();
        });
    };

    vm.getDownloadName = function getDownloadName() {
      return 'usages.' +
        (new Date()).toISOString() +
        '.csv';
    };

    vm.updateCSVBlob = function updateCSVBlob() {
      vm.disableExport = true;
      return csvWorker.getCSV(usageRows)
        .then(function (csv) {
          var file = new Blob([csv]);
          vm.blobCSV = URL.createObjectURL(file);
          vm.disableExport = false;
        });
    };

    vm.init();
  });
