import angular from 'angular';

import geolocation from './geolocation-service.js';

export default angular.module('kagenSite.geolocation', [])
  .factory(geolocation)
  .name;
