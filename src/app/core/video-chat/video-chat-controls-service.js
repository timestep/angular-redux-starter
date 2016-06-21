import videoChatSessionSvc from './video-chat-session-service.js';
import videoChatQueueSvc from './video-chat-queue-service.js';

export default angular.module('kagenSite.videoChatControlsSvc',
  [
    videoChatSessionSvc,
    videoChatQueueSvc,
  ])
  .factory('videoChatControls', function videoChatControlsService(
    videoChatSession,
    videoChatQueue
  ) {
    function findCall() {
      return R.find(function (call) {
        return call.callId === videoChatSession.state.currentCall;
      }, videoChatQueue.queue);
    }
    return {
      online: function () {
        videoChatSession.toggleOnline();
      },
      hold: function () {
        this.state.hold = !this.state.hold;
      },
      mute: function () {
        this.state.mute = !this.state.mute;
      },
      continueCall: function (callId) {
        videoChatSession.switchCurrentCall(callId);
        this.hold();
      },
      endCall: function () {
        videoChatSession.clearCurrentCall();
      },
      rejectCall: function (callId) {
        videoChatSession.rejectCall(callId);
      },
      nextCall: function () {

      },
      startCall: function (callId) {
        videoChatSession.startCall(callId);
      },
      get state () {
        return findCall(videoChatSession.state.currentCall);
      }
    };
  }).name;
