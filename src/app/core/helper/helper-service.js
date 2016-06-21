import angular from 'angular';

export default angular.module('kagenSite.helperSvc', [])
  .filter('offset', function () {
    return function (items, start) {
      start = parseInt(start, 10);
      return items.slice(start);
    };
  })
  .filter('reverse', function() {
    return function(items) {
      if (items) {
        return items.slice().reverse();
      }
    };
  })
  .factory('helper', function () {
    return {
      isEmail: function(email) {
        var re =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      },
      isComplexPassword: function(password) {
        var passwordPattern = /^(?=.*[^A-Za-z])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return passwordPattern.test(password);
      },
      emailToUserName: function(email) {
        return R.compose(R.replace(/\+/g, '_plus_'),
                         R.replace(/\./g, '_dot_'),
                         R.replace(/@/g,'_at_'))(email.toLowerCase());
      },
      userNameToEmail: function(username) {
        return R.compose(R.replace(/_plus_/g, '+'),
                         R.replace(/_dot_/g, '.'),
                         R.replace(/_at_/g, '@'))(username.toLowerCase());
      },
      checkRole : function(role, user) {
        return R.compose(R.contains(role),
                         R.prop('roles'))(user);
      },
      statesAndProvinceList: [{
        name: 'ALABAMA',
        country: 'UNITED STATES'
      }, {
        name: 'ALASKA',
        country: 'UNITED STATES'
      }, {
        name: 'AMERICAN SAMOA',
        country: 'UNITED STATES'
      }, {
        name: 'ARIZONA',
        country: 'UNITED STATES'
      }, {
        name: 'ARKANSAS',
        country: 'UNITED STATES'
      }, {
        name: 'CALIFORNIA',
        country: 'UNITED STATES'
      }, {
        name: 'COLORADO',
        country: 'UNITED STATES'
      }, {
        name: 'CONNECTICUT',
        country: 'UNITED STATES'
      }, {
        name: 'DELAWARE',
        country: 'UNITED STATES'
      }, {
        name: 'DISTRICT OF COLUMBIA',
        country: 'UNITED STATES'
      }, {
        name: 'FEDERATED STATES OF MICRONESIA',
        country: 'UNITED STATES'
      }, {
        name: 'FLORIDA',
        country: 'UNITED STATES'
      }, {
        name: 'GEORGIA',
        country: 'UNITED STATES'
      }, {
        name: 'GUAM',
        country: 'UNITED STATES'
      }, {
        name: 'HAWAII',
        country: 'UNITED STATES'
      }, {
        name: 'IDAHO',
        country: 'UNITED STATES'
      }, {
        name: 'ILLINOIS',
        country: 'UNITED STATES'
      }, {
        name: 'INDIANA',
        country: 'UNITED STATES'
      }, {
        name: 'IOWA',
        country: 'UNITED STATES'
      }, {
        name: 'KANSAS',
        country: 'UNITED STATES'
      }, {
        name: 'KENTUCKY',
        country: 'UNITED STATES'
      }, {
        name: 'LOUISIANA',
        country: 'UNITED STATES'
      }, {
        name: 'MAINE',
        country: 'UNITED STATES'
      }, {
        name: 'MARSHALL ISLANDS',
        country: 'UNITED STATES'
      }, {
        name: 'MARYLAND',
        country: 'UNITED STATES'
      }, {
        name: 'MASSACHUSETTS',
        country: 'UNITED STATES'
      }, {
        name: 'MICHIGAN',
        country: 'UNITED STATES'
      }, {
        name: 'MINNESOTA',
        country: 'UNITED STATES'
      }, {
        name: 'MISSISSIPPI',
        country: 'UNITED STATES'
      }, {
        name: 'MISSOURI',
        country: 'UNITED STATES'
      }, {
        name: 'MONTANA',
        country: 'UNITED STATES'
      }, {
        name: 'NEBRASKA',
        country: 'UNITED STATES'
      }, {
        name: 'NEVADA',
        country: 'UNITED STATES'
      }, {
        name: 'NEW HAMPSHIRE',
        country: 'UNITED STATES'
      }, {
        name: 'NEW JERSEY',
        country: 'UNITED STATES'
      }, {
        name: 'NEW MEXICO',
        country: 'UNITED STATES'
      }, {
        name: 'NEW YORK',
        country: 'UNITED STATES'
      }, {
        name: 'NORTH CAROLINA',
        country: 'UNITED STATES'
      }, {
        name: 'NORTH DAKOTA',
        country: 'UNITED STATES'
      }, {
        name: 'NORTHERN MARIANA ISLANDS',
        country: 'UNITED STATES'
      }, {
        name: 'OHIO',
        country: 'UNITED STATES'
      }, {
        name: 'OKLAHOMA',
        country: 'UNITED STATES'
      }, {
        name: 'OREGON',
        country: 'UNITED STATES'
      }, {
        name: 'PALAU',
        country: 'UNITED STATES'
      }, {
        name: 'PENNSYLVANIA',
        country: 'UNITED STATES'
      }, {
        name: 'PUERTO RICO',
        country: 'UNITED STATES'
      }, {
        name: 'RHODE ISLAND',
        country: 'UNITED STATES'
      }, {
        name: 'SOUTH CAROLINA',
        country: 'UNITED STATES'
      }, {
        name: 'SOUTH DAKOTA',
        country: 'UNITED STATES'
      }, {
        name: 'TENNESSEE',
        country: 'UNITED STATES'
      }, {
        name: 'TEXAS',
        country: 'UNITED STATES'
      }, {
        name: 'UTAH',
        country: 'UNITED STATES'
      }, {
        name: 'VERMONT',
        country: 'UNITED STATES'
      }, {
        name: 'VIRGIN ISLANDS',
        country: 'UNITED STATES'
      }, {
        name: 'VIRGINIA',
        country: 'UNITED STATES'
      }, {
        name: 'WASHINGTON',
        country: 'UNITED STATES'
      }, {
        name: 'WEST VIRGINIA',
        country: 'UNITED STATES'
      }, {
        name: 'WISCONSIN',
        country: 'UNITED STATES'
      }, {
        name: 'WYOMING',
        country: 'UNITED STATES'
      }, {
        name: 'ALBERTA',
        country: 'CANADA'
      }, {
        name: 'BRITISH COLUMBIA',
        country: 'CANADA'
      }, {
        name: 'MANITOBA',
        country: 'CANADA'
      }, {
        name: 'NEW BRUNSWICK',
        country: 'CANADA'
      }, {
        name: 'NEWFOUNDLAND AND LABRADOR',
        country: 'CANADA'
      }, {
        name: 'NOVA SCOTIA',
        country: 'CANADA'
      }, {
        name: 'NORTHWEST TERRITORIES',
        country: 'CANADA'
      }, {
        name: 'NUNAVUT',
        country: 'CANADA'
      }, {
        name: 'ONTARIO',
        country: 'CANADA'
      }, {
        name: 'PRICE EDWARD ISLAND',
        country: 'CANADA'
      }, {
        name: 'QUEBEC',
        country: 'CANADA'
      }, {
        name: 'SASKATCHEWAN',
        country: 'CANADA'
      }, {
        name: 'YUKON',
        country: 'CANADA'
      }]
    };
}).name;
