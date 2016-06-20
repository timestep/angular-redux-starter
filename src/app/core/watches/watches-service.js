import angular from 'angular';
export default angular.module('kagenSite.watches', [])
  .factory('watches', function($http) {
    return {
      getWatches: function() {
        return $http.get('/api/nws-watches/');
      },
    };
  });
