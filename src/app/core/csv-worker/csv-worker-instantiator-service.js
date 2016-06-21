import angular from 'angular';

export default angular.module('kagenSite.csvWorkerInstantiator', [])
  .factory('csvWorkerInstantiator', function csvWorkerInstantiatorService() {
    return {
      makeWorker: function() {
        return new Worker('/app/core/csv-worker/csv-worker.js');
      },
    };
  }).name;
