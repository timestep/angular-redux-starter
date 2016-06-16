'use strict';

angular.module('ka-sensitivity-test')
  .controller('SensitivityTestResultCtrl', function (sensitivityTest, $timeout) {
    var vm = this;
    var resultGuage;

    $timeout(function () {
      resultGuage = new JustGage({
        id: 'resultgauge',
        value: 0,
        min: 0,
        max: 10,
        title: '',
        titleFontColor: '#000000',
        label: '',
        levelColors: ['#69D194', '#F4D501', '#F9B95A', '#F1465B'],
        labelFontColor: '#000000'
      });

      resultGuage.refresh(sensitivityTest.data.score);
    }, 0);

    vm.sensitivityTest = sensitivityTest;
  });
