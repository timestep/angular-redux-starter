'use strict';

angular.module('ka-timezone-autocomplete', [])
  .factory('timezoneAutocomplete', function timezoneAutocompleteService(){
    var zones = moment.tz.names();
    var tzac = {
      filterZones: function (term) {
        return R.sortBy
        (R.prop('length'),
         R.filter
         (R.not
          (R.compose
           (R.eq(-1),
            R.strIndexOf(R.toLowerCase(term)),
            R.toLowerCase)),
          zones));
      }
    };

    return tzac;
  });
