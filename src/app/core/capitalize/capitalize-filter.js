import angular from 'angular';

export default angular.module('kagenSite.capitalize', [])
  .filter('capitalize', function() {
    return function(input) {
      return input[0].toUpperCase() + input.slice(1);
    };
  });
