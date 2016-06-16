'use strict';

angular.module('ka-quick-chat-usage-data', [])
  .factory('usageData', function usageDataService($http, $log){
    function restURI() {
      return '/api/videocalls/usage/';
    }
    function get(from, to) {
      var params = from + '/' + to;
      return $http.get(restURI() + params)
        .then(function usageDataGetResUnwrap(res) {
          return res.data;
        }, $log);
    }

    var usagemgr = {
      get: get
    };

    return usagemgr;
  });
