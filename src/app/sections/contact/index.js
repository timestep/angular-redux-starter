import angular from 'angular';
import ContactCtrl from './contact-controller.js';
import helper from '../../core/helper/helper-service.js';

export default angular.module('kagenSite.contactUs', [helper])
  .controller(ContactCtrl)
  .name;
