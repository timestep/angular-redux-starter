'use strict';

angular.module('ka-members', [])
  .factory('members', function ($http) {
    var service = {
      DEFAULT_MEMBERS_SORT: 'organization_name',
      DEFAULT_MEMBERS_DIRECTION: 'desc',
      DEFAULT_MEMBERS_LIMIT: 200,

      getMembers: function (offset, limit, sort, direction, filter) {
        return $http.post('/api/organization/' + filter.organization + '/members',
          angular.extend({
            offset: offset || 0,
            limit: limit || service.DEFAULT_MEMBERS_LIMIT,
            sort: sort || service.DEFAULT_MEMBERS_SORT,
            direction: direction || service.DEFAULT_MEMBERS_DIRECTION
          }, filter || {}));

      },

      getSuggestions: function (orgId, field) {
        return $http.get('/api/organization/' + orgId + '/suggestions/' + field);
      }
    };

    return service;
  });
