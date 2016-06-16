'use strict';

angular.module('geolocation', [])
  .factory('geolocation', function ($q) {

    /**
     * Get Geo location functionality
     * @returns {*}
     */
    function getPosition() {
      var deferred = $q.defer();
      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject);
      return deferred.promise;
    }

    function getStateName(googleResults) {
      var hasLocality = R.contains('locality');
      var hasArea3 = R.contains('administrative_area_level_3');
      var hasArea2 = R.contains('administrative_area_level_2');
      var hasPostalCode = R.contains('postal_code');
      var foundLocalityOrPostalCode = false;

      function pullLocale (locale) {
        if (hasLocality(locale.types)) {
          foundLocalityOrPostalCode = true;
          return locale.formatted_address.split(',', 2).join(',');
        }
        else if (hasPostalCode(locale.types) && !foundLocalityOrPostalCode) {
          foundLocalityOrPostalCode = true;
          var address = locale.formatted_address.split(',', 2).join(',');
          address = address.substr(0, address.lastIndexOf(' ')); // remove the postal code
          return address;
        }
        else if (hasArea3(locale.types) && !foundLocalityOrPostalCode) {
          return locale.formatted_address.split(',', 2).join(',');
        }
        else if (hasArea2(locale.types) && !foundLocalityOrPostalCode) {
          // formatted_address: "Hartley County, TX, USA"
          return locale.formatted_address.split(',', 2).join(',');
        }
        else {
          return '';
        }

      }

      // The map function returns a list of either an empty string,
      // or the actual answers we want. However the last answer in the list
      // will be the most relevant. (ex Toronto, ON)
      // ** We exit early once we find the town/city (re: foundLocailty (bool))
      var isNotEmptyString = function(x) { return x !== ''; };
      var localeName = R.findLast(isNotEmptyString)(R.map(pullLocale, googleResults));

      var segments = localeName.split(',');

      // if we don't have a state, return what we have
      if (segments.length < 2) {
        return '';
      }

      var stateName = segments[1].trim();
      //var stateAbrv = states.getStateAbbreviation(stateName);
      var stateAbrv = null;

      if (stateAbrv === null && stateName.length === 2) {
        stateAbrv = stateName;
      }

      return stateAbrv;
    }

    return {
      getPosition: getPosition,
      getStateName: getStateName
    };

  });