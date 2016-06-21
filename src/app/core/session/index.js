import angular from 'angular';
import helper from '../helper/helper-service.js';
import organizations from '../organizations/organizations-service.js';
import session from './session-service.js';

export default angular.module('kagenSite.session', [helper, organizations])
  .service(session)
  .name;
