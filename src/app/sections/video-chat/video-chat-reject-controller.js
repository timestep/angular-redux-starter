import angular from 'angular';

import videoChatQueueSvc from
  '../../core/video-chat/video-chat-queue-service.js';

export default angular.module('kagenSite.videoChatReject', [videoChatQueueSvc])
.controller('RejectCallCtrl', function(
  $http,
  $log,
  $modalInstance,
  $window,
  callId,
  videoChatQueue) {

  var DEFAULT_REJECT_MESSAGE = 'You have not scheduled a video chat with the clinic. Kindly call via phone to schedule a live video office visit.';

  var vm = this;
  var previousMessage = '';

  vm.spinner = false;
  /**
   * [close: edit/create modal]
   */
  vm.close = function () {
    $modalInstance.close();
  };

  /**
   * [submit: send reject message to member]
   */
  vm.submit = function () {
    var opts = {
      callId: callId,
      message: vm.message
    };

    vm.spinner = true;

    $http.post('/api/videocalls/' + callId + '/reject', opts)
      .then(function (resp) {
        if (resp.data === 'Success') {
          videoChatQueue.removeCall(callId);
        } else {
          $window.alert('Unable to reject call. Please try again later.');
        }

        $modalInstance.close();
        vm.spinner = false;

        return resp;
      })
      .then(null, $log.error);
  };

  /**
   * [toggleDefaultMessage: pre-fill the message input box]
   */
  vm.toggleDefaultMessage = function () {
    if (vm.defaultMessage) {
      previousMessage = vm.message;
      vm.message = DEFAULT_REJECT_MESSAGE;
    } else {
      vm.message = previousMessage;
    }
  };
}).name;
