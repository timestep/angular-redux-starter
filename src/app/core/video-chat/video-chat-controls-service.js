angular.module('ka-video-chat-controls',
  [
    'ka-video-chat-session',
    'ka-video-chat-queue'
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
  });
