import angular from 'angular';

export default angular.module('kagenSite.allergens', [])
  .factory('allergens', function ($http){
    return {
      getMedications: function () {
        return $http.get('/api/medications');
      },
      getMedicalConditions: function () {
        return $http.get('/api/medical-conditions');
      },
      getAllergens: function () {
        return $http.get('/api/allergens');
      },
      flattenAllergenList: function(columnedList) {
        return R.flatten(columnedList).filter(function(item) {
          return item.hasOwnProperty('selected') && item.selected;
        });
      }
    };
  })
  .name;
