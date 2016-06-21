import angular from 'angular';
import session from '../session';

export default angular.module('kagenSite.videoChatLogsSvc', [session])
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
  }).name;
