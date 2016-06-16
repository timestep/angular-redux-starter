'use strict';

angular.module('ka-video-chat-prefs-sync', ['ka-session'])
  .factory('videoChatPrefsSync', function videoChatPrefsSyncService($log, $http, session){
    function restURI () {
      return '/api/organization/' + session.userCtx.clinicId;
    }
    function get () {
      return $http.get(restURI())
        .then(function videoChatPrefsSyncGetResUnwrap(res) {
          return res.data.value;
        }, $log);
    }

    function put (value) {
      return $http.put(restURI(), value)
        .then(function videoChatPrefsSyncPutResUnwrap(res) {
          return res.data.value;
        }, $log);
    }

    var pmgr = {
      refresh: function () {
        get()
          .then(function (value) {
            pmgr.prefs = value;
          });
      },
      push: function (props) {
        if(typeof props === 'string') {
          props = [props];
        }
        return get()
          .then(function (value) {
            R.forEach(function (prop) {
              value[prop] = pmgr.prefs[prop];
            }, props);

            return put(value)
              .then(function () {
                pmgr.refresh();
                return value;
              });
          });
      },

      prefs: {}
    };

    return pmgr;
  });
