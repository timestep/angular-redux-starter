'use strict';

angular.module('ka-profile')
  .directive('results', function () {
    return {
      restrict: 'E',
      scope: {
        data: '=',
        model: '=',
        profile: '=',
        dropdownList: '='
      },
      templateUrl: 'app/sections/profile/results.html',
      controller: function ($scope, $element, $attrs) {
        $scope.toggle = false;

        $scope.validFEV1Form = true;
        $scope.validFENOForm = true;
        $scope.validDate = true;

        // FEV Functions
        $scope.clearFevAnswers = function () {
          $scope.profile.session.fev1.wholeNum = '';
          $scope.profile.session.fev1.firstDecimal = '';
          $scope.profile.session.fev1.secondDecimal = '';
          $scope.profile.session.fev1.day = '';
          $scope.profile.session.fev1.month = '';
          $scope.profile.session.fev1.year = '';

          $scope.validFEV1Form = true;
        };

        $scope.onFevChange = function () {
          if ($scope.profile.session.fev1.wholeNum === 10) {
            $scope.profile.fev1Decimal = [0];
          } else {
            $scope.profile.fev1Decimal = R.range(0, 10);
          }


          if ($scope.profile.session.fev1.wholeNum &&
            typeof $scope.profile.session.fev1.firstDecimal === 'number' &&
            typeof $scope.profile.session.fev1.secondDecimal === 'number' &&
            $scope.profile.session.fev1.day &&
            $scope.profile.session.fev1.month &&
            $scope.profile.session.fev1.year) {
            $scope.validFEV1Form = true;
          } else {
            $scope.validFEV1Form  = false;
          }

          var year = $scope.profile.session.fev1.year;
          var month = $scope.profile.session.fev1.month;
          var day = $scope.profile.session.fev1.day;
          var selectedDate = moment(year + '-' + month + '-' +day);
          $scope.isValidDate(selectedDate);
        };

        // FENO Functions
        $scope.clearFenoAnswers = function () {
          $scope.profile.session.feno.value = '';
          $scope.profile.session.feno.day = '';
          $scope.profile.session.feno.month = '';
          $scope.profile.session.feno.year = '';

          $scope.validFENOForm = true;
        };

        $scope.onFenoChange = function () {
          if (Number($scope.profile.session.feno.value) >= 0 &&
            Number($scope.profile.session.feno.value) <= 250 &&
            $scope.profile.session.feno.day &&
            $scope.profile.session.feno.month &&
            $scope.profile.session.feno.year) {
            $scope.validFENOForm = true;
          } else {
            $scope.validFENOForm = false;
          }

          var year = $scope.profile.session.feno.year;
          var month = $scope.profile.session.feno.month;
          var day = $scope.profile.session.feno.day;
          var selectedDate = moment(year + '-' + month + '-' +day);
          $scope.isValidDate(selectedDate);
        };

        // Helpers
        $scope.isValidDate = function (date) {
          // in the future
          if (moment().diff(date, 'seconds') < 0) {
            $scope.validDate = false;
          } else {
            $scope.validDate = true;
          }
        };
      }
    };
  });