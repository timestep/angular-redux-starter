import angular from 'angular';
import search from './search-service.js';

export default angular.module('kagenSite.search', [])
  .factory(search)
  .name;
