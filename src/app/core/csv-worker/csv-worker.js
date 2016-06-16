'use strict';

function quoteWrap(s) {
  return '"' + s + '"';
}

function csvColumns(os) { // assume for now that all objects in the list have the same fields
  return Object.keys(os[0]);
}

function csvRow(cols) {
  return function (o) {
    var vs = cols.map(function (col) {
      return o[col];
    });
    return vs.map(quoteWrap).join(',');
  };
}

function csv(os) {
  var columns = csvColumns(os);
  var header = columns.map(quoteWrap).join(',') + '\n';
  var body = os.map(csvRow(columns)).join('\n') + '\n';
  return header + body;
}

onmessage = function(e) {
  var reply = {
    seq: e.data.seq
  };
  try {
    reply.value = csv(e.data.object);
    reply.verb = 'resolve';
  } catch (err) {
    // Error objects can't be passed through postMessage
    reply.value = 'An uncaught exception was thrown in csv-worker.';
    reply.verb = 'reject';
  }
  postMessage(reply);
};
