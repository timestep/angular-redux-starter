import angular from 'angular';
import core from '../../../core';
import reportsEditCtrl from './reports-list-controller.js';

export default angular.module('kagenSite.reportsList', [core])
  .controller(reportsEditCtrl)
  .name;
