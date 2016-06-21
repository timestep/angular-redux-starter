import angular from 'angular';

export default angular.module('kagenSite.organizations', [])
  .factory('organizations', function ($http) {
    var DEFAULT_ORGS_SORT = '_id';
    var DEFAULT_ORGS_LIMIT = 25;
    var DEFAULT_ORGS_DIRECTION = 'asc'; //ascending
    var DEFAULT_REPORTS_LIMIT = 25;
    return {
      getOrganizationIds: function () {
        return $http.get('/api/organizations/ids');
      },
      /*
      * getOrganizations: get paginated and sorted organization info
      *   offset: number of pages of results to skip ahead
      *   limit: maximum number of results to return in one page
      *   sort: column to sort results by
      *   direction: sort direction. ie asc or desc
      * returns a promise that resolves to HTTP response
      */
      getOrganizations: function (offset, limit, sort, direction) {
        return $http.get('/api/organizations',
          {
            params : {
              offset : offset || 0,
              limit : limit || DEFAULT_ORGS_LIMIT,
              sort : sort || DEFAULT_ORGS_SORT,
              direction : direction || DEFAULT_ORGS_DIRECTION
            }
          });
      },
      /*
      * getArchivedOrganizations: get paginated and sorted archived organization info
      *   offset: number of pages of results to skip ahead
      *   limit: maximum number of results to return in one page
      *   sort: column to sort results by
      *   direction: sort direction. ie asc or desc
      * returns a promise that resolves to HTTP response
      */
      getArchivedOrganizations: function (offset, limit, sort, direction) {
        return $http.get('/api/organizations/archived',
          {
            params : {
              offset : offset || 0,
              limit : limit || DEFAULT_ORGS_LIMIT,
              sort : sort || DEFAULT_ORGS_SORT,
              direction : direction || DEFAULT_ORGS_DIRECTION
            }
          });
      },
      /*
      * getKagenDataCollectors: get paginated list of (KAGEN-PORTAL) data collectors
      *   offset: number of pages of results to skip ahead
      *   limit: maximum number of results to return in one page
      *   sort: column to sort results by
      *   direction: sort direction. ie asc or desc
      * returns a promise that resolves to HTTP response
      */
      getKagenDataCollectors: function(offset, limit, sort, direction) {
        return $http.get('/api/organizations?kagenDataCollectorsOnly=true',
          {
            params : {
              offset : offset || 0,
              limit : limit || DEFAULT_ORGS_LIMIT,
              sort : sort || DEFAULT_ORGS_SORT,
              direction : direction || DEFAULT_ORGS_DIRECTION
            }
          });
      },

      /*
      * getDataCollectors: get paginated list of data collectors
      *   offset: number of pages of results to skip ahead
      *   limit: maximum number of results to return in one page
      *   sort: column to sort results by
      *   direction: sort direction. ie asc or desc
      * returns a promise that resolves to HTTP response
      */
      getDataCollectors: function(offset, limit, sort, direction) {
        return $http.get('/api/organizations?dataCollectorsOnly=true',
          {
            params : {
              offset : offset || 0,
              limit : limit || DEFAULT_ORGS_LIMIT,
              sort : sort || DEFAULT_ORGS_SORT,
              direction : direction || DEFAULT_ORGS_DIRECTION
            }
          });
      },
      /*
      * getAllReports: get paginated and sorted list of allergy reports
      *   offset: number of pages of results to skip ahead
      *   limit: maximum number of results to return in one page
      * returns a promise that resolves to HTTP response
      */
      getAllReports: function(offset, limit) {
        return $http.get('/api/allergy_reports_any_org',
          {
            params : {
              offset : offset || 0,
              limit : limit || DEFAULT_REPORTS_LIMIT,
            }
          });
      },
      updateOrganizations: function (orgID, payload) {
        return $http.put('/api/organization/' + orgID, payload);
      },
      deleteOrganizations: function (orgID) {
        return $http.delete('/api/organization/' + orgID);
      },
      getOrganizationById: function (orgID) {
        return $http.get('/api/organization/' + orgID);
      },
      createOrgAdmin: function (username, password, orgId) {
        return $http.post('/api/role-user', {
          username: username,
          password: password,
          orgId: orgId,
          roles: ['orgadmin']
        });
      },
      disableOrgAdmin: function (username) {
        return $http.put('/api/user/' + username + '/disable');
      },
      enableOrgAdmin: function (username) {
        return $http.put('/api/user/' + username + '/enable');
      },
      deleteOrgAdmin: function (username) {
        return $http.delete('/api/user/' + username);
      }
    };
  }).name;
