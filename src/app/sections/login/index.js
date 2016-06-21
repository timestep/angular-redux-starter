import angular from 'angular';
import session from '../../core/session';
import helper from '../../core/helper/helper-service.js';
import loginCtrl from './login-controller.js';

export default angular.module('kagenSite.login', [session, helper])
  .controller(loginCtrl)
  .name;
