import angular from 'angular';
import core from '../../../core';
import reportsService from '../reports-service';

import ReportsCtrl from './reports-entry-controller.js';
import dateFilter from './reports-filter.js';
import ReportsHistoryCtrl from './reports-history-controller.js';
import TopAllergenCtrl from './top-allergens-controller.js';

export default angular.module('kagenSite.reportsPortal', [core, reportsService])
  .controller(ReportsCtrl)
  .filter(dateFilter)
  .controller(ReportsHistoryCtrl)
  .controller(TopAllergenCtrl)
  .name;
