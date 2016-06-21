import angular from 'angular';
import session from '../session';
import videoChatQueueSvc from './video-chat-queue-service.js';
import videoChatPrefsSyncSvc from './video-chat-prefs-sync-service.js';
import videoChatFrameSvc from './video-chat-frame-service.js';
import videoChatReject from
  '../../sections/video-chat/video-chat-reject-controller.js';

export default angular.module('kagenSite.videoChatSessionSvc',
  [
    session,
    videoChatQueueSvc,
    videoChatPrefsSyncSvc,
    videoChatFrameSvc,
    videoChatReject,
  ])
  .factory('videoChatSession', function videoChatSessionService(
    $rootScope,
    $log,
    $http,
    $modal,
    $window,
    videoChatQueue,
    videoChatPrefsSync,
    videoChatFrame) {
    var findCall = function findCall(callId) {
      return R.find(R.propEq('callId', callId), videoChatQueue.queue);
    };

    var service = {
      init: function () {
        videoChatFrame.init();
        videoChatQueue.init();
      },
      toggleOnline: function () {
        service.state.online = !service.state.online;
      },
      clearCurrentCall: function () {
        var currentCallId;
        if (service.state.currentCall) {
          currentCallId = R.cloneDeep(service.state.currentCall);
          videoChatQueue.removeCall(currentCallId);
          videoChatFrame.stop();
        }

        service.state.currentCall = null;
      },
      clientHangUp: function () {
        $window.alert('The client has ended the call.');
        service.clearCurrentCall();
      },
      rejectCall: function (callId) {
        $modal.open({
          templateUrl: 'app/sections/video-chat/video-chat-reject-call.html',
          controller: 'RejectCallCtrl',
          controllerAs: 'RejectCall',
          resolve: {
            callId: function () {
              return callId;
            }
          }
        });
      },
      switchCurrentCall: function (callId) {
        service.clearCurrentCall();
        service.state.currentCall = callId;

        findCall(callId).started = true;
      },
      startCall: function (callId) {

        if (!callId) {
          callId = videoChatQueue.queue[0].callId;
        }
        service.switchCurrentCall(callId);

        $http.post('/api/videocalls/' + callId + '/start')
          .then(function (res) {
            return res.data;
          }, $log)
          .then(function (data) {
            videoChatFrame.start(data);
          });
      },
      updateUserProfile: function (email, profile) {
        return $http.put('/api/' + email + '/profile', profile);
      },
      getUserProfile: function (email) {
        var user = {};
        var getProfile = function () {
          return $http.get('/api/' + email + '/profile')
            .then(function (res) {
              user.session = res.data;
            });
        };
        var getPhoto = function () {
          user.profilePhoto = '';
          return $http.get('/api/profile-photo/' + email)
            .then(function (res) {
              user.profilePhoto = 'data:image/jpg;base64,' + res.data;
              return user;
            },
            function () {
              user.profilePhoto = '';
              return user;
            });
        };
        return R.pCompose(getPhoto, getProfile)();
      },
      state: {
        get online() {
          return videoChatPrefsSync.prefs.videoIsOnline;
        },
        set online(val) {
          videoChatPrefsSync.prefs.videoIsOnline = val;
          videoChatPrefsSync.push('videoIsOnline');
        }
      }

    };

    videoChatPrefsSync.refresh();

    $rootScope.$on('clientHangUp', function () {
      service.clientHangUp();
      service.clearCurrentCall();
    });

    return service;
  }).name;
