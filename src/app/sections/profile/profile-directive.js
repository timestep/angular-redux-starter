'use strict';

angular.module('ka-profile')
  .directive('multiselect', function () {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        model: '=',
        profile: '=',
        dropdownList: '='
      },
      templateUrl: 'app/sections/profile/multiselect.html',
      link: function (scope, element, attrs) {
        scope.toggle = attrs.toggle;
        scope.title = attrs.title;
        scope.icon = attrs.icon;
        scope.toggle = !scope.toggle;

        if (scope.profile) {
          scope.multiDropDownSwitch = true;
        }
      }
    };
  });