import angular from 'angular';
import core from '../../../core';
import reportsService from './reports-service.js';

export default angular.module('kagenSite.reportsService', [core])
  .factory(reportsService)
  .name;
