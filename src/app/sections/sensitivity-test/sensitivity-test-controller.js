export default function SensitivityTestCtrl(sensitivityTest, $timeout,
    ngProgress) {
    var vm = this;

    vm.pageReady = true;
    vm.sensitivityTest = sensitivityTest;

    vm.sensitivityTest.initialize();

    vm.sensitivityTest.data.score = 0;
  };
