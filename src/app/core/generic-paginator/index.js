import angular from 'angular';
import genericPaginator from './generic-paginator-service.js';

export default angular.module('kagenSite.genericPaginator', [])
  .factory(genericPaginator)
  .name;
