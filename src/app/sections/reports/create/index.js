import angular from 'angular';
import core from '../../../core';
import reportsService from '../reports-service';
import reportsCreateCtrl from './reports-create-controller.js';

export default angular.module('ka-reports-create', [core, reportsService])
  .controller(reportsCreateCtrl)
  .name;
