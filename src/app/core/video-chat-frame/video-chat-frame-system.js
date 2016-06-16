'use strict';

var handlers = {};
var other = parent;
var origin = window.location.href.split('/').slice(0, 3).join('/');

function post(type, payload) {
  other.postMessage({
    type: type,
    payload: payload
  }, origin);
}

// Metaphor to TCP
handlers['SYN-ACK'] = function () {
  post('ACK');
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

var options = {
  width: 420,
  height: 315
};

handlers.start = function (payload) {
  var subscriber;
  var publisher = OT.initPublisher('publisher-container', options);
  var session = OT.initSession(payload.apiKey, payload.sessionId);

  handlers.stop = function () {
    publisher.publishAudio(false);
    setTimeout(function () {
      session.disconnect();
    }, 100);
  };

  session.on('streamCreated', function (event) {
    subscriber = session.subscribe(event.stream, 'subscriber-container', options);
  });

  session.on('connectionDestroyed', function (event) {
    if (event.reason === 'clientDisconnected' && event.type === 'connectionDestroyed') {
      // the client has 'hung up' the call
      post('HANGUP');
    }
  });

  session.connect(payload.token, function (error) {
    session.publish(publisher);
  });
};


// After everything is defined

post('SYN'); // Metaphor to TCP
