'use strict';

angular.module('ka-csv-worker-instantiator', [])
  .factory('csvWorkerInstantiator', function csvWorkerInstantiatorService() {
    return {
      makeWorker: function () {
        return new Worker('/app/core/csv-worker/csv-worker.js');
      }
    };
  });
