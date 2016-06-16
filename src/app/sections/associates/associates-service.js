'use strict';

angular.module('ka-associates')
  .value('accountTypes', [{
    type: 'Clinic',
    roles: {
      showVideo: true,
      showReports: false,
      showPush: false
    }
  }, {
    type: 'Clinic/Data',
    roles: {
      showVideo: true,
      showReports: true,
      showPush: false
    }
  }, {
    type: 'Business',
    roles: {
      showVideo: false,
      showReports: false,
      showPush: true
    }
  }, {
    type: 'Data Collector',
    roles: {
      showVideo: false,
      showReports: true,
      showPush: false
    }
  }])
  .factory('associateViewHelper', function (accountTypes) {

    var orgTypes = R.map(R.pick(['type']))(accountTypes);

    var clinicSubTypes = ['Allergy - Immunology', 'Neurology', 'Rheumatology', 'Retail Pharmacy', 'Pharmaceutical Co.'];
    /**
     * [showVideo: checks if the user has the video chat permission]
     */
    var showVideo = function (org) {
      if (org.allMembersCanCall || org.nonMembersCanCall) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * [showPush: checks if the user has the notification permission]
     */
    var showPush = function (org) {
      return !!org.canSendNotifications;
    };

    /**
     * [showReports: checks if the user has the data collection permission]
     */
    var showReports = function (org) {
      return !!org.isDataCollector;
    };

    /**
     * [showReports: returns the permissions for a provided account type]
     */
    var returnRoles = function (orgType) {
      var check = R.curry(function (type, accounts) {
        if (type === accounts.type) {
          return type;
        }
      });
      return R.compose(R.prop('roles'),
        R.head,
        R.filter(check(orgType)))(accountTypes);
    };

    /**
     * [updatePresets: changes the default permissions when the organization type is changed via drop down box.]
     */

    var updatePresets = function (org) {
      return R.some(R.eqProps('type', org), orgTypes)? returnRoles(org.type): undefined;
    };

    /**
     * [checkId: ng-change function for orgId field - used to prevent duplicate OrgIds.]
     */
    var checkId = function (id, allOrgs) {
      var getId = R.propEq('id', id);
      return R.some(getId, allOrgs);
    };

    return {
      orgTypes: orgTypes,
      clinicSubTypes: clinicSubTypes,
      showVideo: showVideo,
      showPush: showPush,
      showReports: showReports,
      updatePresets: updatePresets,
      checkId: checkId
    };
  });