import angular from 'angular';
import usageDataService from './quick-chat-usage-data-service.js';

export default angular.module('kagenSite.quickChatUsageData', [])
  .factory(usageDataService)
  .name;
