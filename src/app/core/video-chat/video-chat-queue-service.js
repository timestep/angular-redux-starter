'use strict';

angular.module('ka-video-chat-queue', ['ka-session'])
  .factory('videoChatQueue', function videoChatQueueService(
    $rootScope,
    $log,
    $interval,
    $http,
    session) {
    var pollBusy = false;

    var sound = new Audio('/resources/ringer.mp3');
    sound.load();
    sound.volume = 1;

    var qmgr = {
      removeCall: function (callId) {
        this.queue = R.filter(
          R.not(R.propEq('callId', callId)), this.queue);
      },

      init: function () {
        $rootScope.quickCallIntervalStop = $interval(function videoChatQueueUpdatePollIntervalFunction() {
          if (!pollBusy) {
            pollBusy = true;
            $http.get('/api/videocalls/queue/' + session.userCtx.clinicId)
              .then(function videoChatQueueUpdatePollGetDotThen(res) {
                return res.data;
              }, $log)
              .then(function (data) {
                qmgr.queue = mergeQueues(data, qmgr.queue);
                pollBusy = false;
                if (qmgr.queue.length > 0) {
                  if (qmgr.queue[0] &&
                    qmgr.queue[0].started &&
                    qmgr.queue[0].started === true) {
                    sound.pause();
                    sound.currentTime = 0;
                  } else {
                    toastr.options.preventDuplicates = true;
                    toastr.info('Incoming Call...');
                    sound.play();
                  }
                }
              });
          }
        }, 5000);
      },

      queue: []
    };

    function mergeQueues(queueData, queue) {

      var startedOnly = R.filter(function (call) {
        return !!call.started;
      }, queue);

      var tQueueData = R.filter(function (call) {
        return !R.some(R.propEq('callId', call.callId), startedOnly);
      }, queueData);

      return R.map(function (call) {
        call.name = (call.firstName !== null ? call.firstName : '') + ' ' +
          (call.lastName !== null ? call.lastName : '');
        return call;
      }, R.concat(startedOnly, tQueueData));
    }

    return qmgr;
  });