'use strict';

angular.module('ka-video-chat-frame', [])
  .factory('videoChatFrame', function videoChatFrameService ($rootScope) {
    var other;
    var handlers = {};
    var origin = window.location.href.split('/').slice(0, 3).join('/');

    function post(type, payload) {
      other.postMessage({
        type: type,
        payload: payload
      }, origin);
    }

    handlers.SYN = function () {
      post('SYN-ACK');
    };

    handlers.HANGUP = function () {
      $rootScope.$emit('clientHangUp', null);
    };

    function receive(event) {
      if (event.origin !== origin) {
        return;
      }

      if (handlers[event.data.type]) {
        handlers[event.data.type](event.data.payload);
      }
    }

    window.addEventListener('message', receive, false);

    function reloadFrame() {
      other.location.reload();
    }

    var service = {
      init: function videoChatFrameServiceInit() {
        other = angular.element('iframe.video-chat-iframe')[0].contentWindow;
      },
      start: function videoChatFrameServiceStart(details) {
        handlers.ACK = function () {
          post('start', details);
          handlers.ACK = undefined;
        };

        reloadFrame();
      },
      stop: function videoChatFrameServiceStop() {
        post('stop');
      }
    };

    return service;
  });
