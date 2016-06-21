import angular from 'angular';

import csvWorkerInstantiatorSvc from './csv-worker-instantiator-service.js';

export default angular.module('kagenSite.csvWorkerSvc', [csvWorkerInstantiatorSvc])
  .factory('csvWorker', function csvWorkerService($q, csvWorkerInstantiator) {
    var seq = 0;
    var completions = [];
    var worker = csvWorkerInstantiator.makeWorker();

    worker.onmessage = function csvWorkerOnMessage(e) {
      var message = e.data;
      completions[message.seq][message.verb](message.value);
    };

    function makeWork(object, resolve, reject) {
      completions[seq] = {
        resolve: resolve,
        reject: reject
      };
      worker.postMessage({
        object: object,
        seq: seq++
      });
    }

    var csvwkr = {
      getCSV: function (object) {
        var d = $q.defer();
        makeWork(object, d.resolve, d.reject);
        return d.promise;
      }
    };

    return csvwkr;
  }).name;
