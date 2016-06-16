'use strict';

angular.module('ka-watches')
  .controller('WatchesCtrl', function (
    $log,
    $location,
    ngProgress,
    watches,
    session) {
    if (session.userCtx.role !== 'operator') {
      $location.url('/');
    } else {
      var vm = this;
      vm.field = 'value.title'; // default filtered field

      /**
       * [showActive: queries the active watches]
       */
      vm.showActive = function () {
        ngProgress.start();
        vm.WatchList = [];
        watches.getWatches()
          .then(function (response) {
            ngProgress.complete();
            vm.WatchList = response.data;
          }).then(null, $log.error);
      };
      /**
       * [changeFilter: used to change the ng-repeat orderBy property]
       * @param  {[type]} field [orderBy property]
       */
      vm.changeFilter = function (field) {
        if (R.head(vm.field) === '-') {
          vm.field = field;
        } else {
          vm.field = '-' + field;
        }
      };
    }
  });