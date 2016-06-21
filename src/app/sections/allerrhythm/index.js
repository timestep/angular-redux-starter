import angular from 'angular';

import allerrhythmService from './allerrhythm-service.js';
import allerrhythmController from './allerrhythm-controller.js';

export default angular.module('kagenSite.allerrhythm', [])
  .service(allerrhythmService)
  .controller(allerrhythmController)
  .name;
