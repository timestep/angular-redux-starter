import angular from 'angular';

import QuickChatBillingCtrl from './quick-chat-billing-controller.js';
import genericPaginator from '../../core/generic-paginator';
import csvWorkerSvc from '../../core/csv-worker/csv-worker-service.js';

export default angular.module('kagenSite.quickChatBilling', [
  genericPaginator,
  csvWorkerSvc,
])
.controller(QuickChatBillingCtrl)
.name;
