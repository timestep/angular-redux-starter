'use strict';

angular.module('ka-users', [])
  .factory('users', function ($http) {
    var service = {
      DEFAULT_USER_SORT: 'id',
      DEFAULT_USER_LIMIT: 25,
      DEFAULT_USER_DIRECTION: 'asc', //ascending

      /*
       * getUsers: get paginated and sorted user info
       *   offset: number of pages of results to skip ahead
       *   limit: maximum number of results to return in one page
       *   sort: column to sort results by
       *   direction: sort direction. ie asc or desc
       */
      getUsers: function (offset, limit, sort, direction, filter) {

        return $http.post('/api/users/',
          angular.extend ({
              offset: offset || 0,
              limit: limit || service.DEFAULT_USER_LIMIT,
              sort: sort || service.DEFAULT_USER_SORT,
              direction: direction || service.DEFAULT_USER_DIRECTION
            }, filter || {})
          );
      },

      getSuggestions: function (field) {
        return $http.get('/api/users/suggestions/' + field);
      },

      /*
       * getUserIds: get ids of all users for searching
       * through the userbase on the User Portal
       */
      getUserIds: function () {
        return $http.get('/api/users/ids');
      },

      /*
       * A delete user option might be needed in the future for the admin
       * deleteUsers: function (orgID) {
       *   return $http.delete('/api/'+userId);
       * },
       */

      /*
       * getUserById: get individual profile of a user
       */
      getUserById: function (userID) {
        return $http.get('/api/' + userID + '/profile');
      }
    };

    return service;
  });