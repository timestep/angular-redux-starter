'use strict';

angular.module('ka-time-field-formatter', [])
  .factory('timeFieldFormatter', function timeFieldFormatterService(){
    function zeroPad(num, numZeros) {
      var n = Math.abs(num);
      var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
      var zeroString = Math.pow(10,zeros).toString().substr(1);
      if(num < 0) {
        zeroString = '-' + zeroString;
      }
      return zeroString + n;
    }

    var tff = {
      extract: function extractTimeParts(str) {
        var parts = ['00', '00', '00'];
        if(typeof str === 'string') {
          parts = str.split(':');
        }

        return {
          hours: parseInt(parts[0] || '0'),
          minutes: parseInt(parts[1] || '0')
        };
      },

      format: function formatTimeParts(time) {
        var parts = [time.hours, time.minutes, 0];
        return R.join(
          ':',
          R.map(function (part) {
            return zeroPad(part, 2);
          }, parts));
      }
    };

    return tff;
  });
