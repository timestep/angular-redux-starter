'use strict';

angular.module('ka-watches', [])
  .factory('watches', function ($http) {
    return {
      getWatches: function () {
        return $http.get('/api/nws-watches/');
      }
    };
  });
