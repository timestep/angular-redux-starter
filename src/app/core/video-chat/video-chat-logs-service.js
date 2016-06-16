'use strict';

angular.module('ka-video-chat-logs', ['ka-session'])
  .factory('videoChatLogs', function videoChatLogsService($log, $http, session) {
    function restURI() {
      return '/api/videocalls/logs/' + session.userCtx.clinicId;
    }
    function get(data) {
      return $http.get(restURI(), data)
        .then(function videoChatLogsGetResUnwrap(res) {
          return res.data;
        }, $log);
    }

    var logmgr = {
      get: function (limit, offset) {
        return get({
          limit: limit,
          offset: offset
        });
      }
    };

    return logmgr;
  });
