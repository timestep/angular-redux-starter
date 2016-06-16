'use strict';

angular.module('ka-capitalize', [])
  .filter('capitalize', function () {
    return function (input) {
      return input[0].toUpperCase() + input.slice(1);
    };
  });