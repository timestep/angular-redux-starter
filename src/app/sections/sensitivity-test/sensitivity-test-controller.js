'use strict';

angular.module('ka-sensitivity-test')
  .controller('SensitivityTestCtrl', function (sensitivityTest, $timeout,
    ngProgress) {
    var vm = this;

    vm.pageReady = true;
    vm.sensitivityTest = sensitivityTest;

    vm.sensitivityTest.initialize();

    vm.sensitivityTest.data.score = 0;
  });
