import angular from 'angular';

import SensitivityTestCtrl from './sensitivity-test-controller.js';
import { sensitivityTestData } from './sensitivity-test-data.js';
import SensitivityTestResultCtrl from './sensitivity-test-result-controller.js';
import sensitivityTest from './sensitivity-test-service.js';

export default angular.module('kagenSite.sensitivityTest', [])
  .controller(SensitivityTestCtrl)
  .controller(SensitivityTestResultCtrl)
  .factory(sensitivityTest)
  .value(sensitivityTestData)
  .name;
