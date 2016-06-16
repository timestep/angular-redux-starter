'use strict';

angular.module('ka-video-chat-preferences', ['ka-video-chat-prefs-sync', 'ka-timezone-autocomplete', 'ka-time-field-formatter'])
  .controller('VideoChatPreferencesCtrl', function VideoChatPreferencesCtrl($modalInstance, videoChatPrefsSync, timezoneAutocomplete, timeFieldFormatter) {
    var vm = this;
    var pickPrefs = ['videoStartTime', 'videoEndTime', 'videoTimeZone', 'videoMinutesToWait'];
    var pushPrefs = [];
    vm.prefs  = R.pick(pickPrefs, videoChatPrefsSync.prefs);
    vm.dirty = function (pref) {
      pushPrefs = R.uniq(R.append(pref, pushPrefs));
    };

    vm.time = {
      start: timeFieldFormatter.extract(vm.prefs.videoStartTime),
      end: timeFieldFormatter.extract(vm.prefs.videoEndTime)
    };

    vm.dirtyTime = function () {
      vm.prefs.videoStartTime = timeFieldFormatter.format(vm.time.start);
      vm.prefs.videoEndTime = timeFieldFormatter.format(vm.time.end);
      vm.dirty('videoStartTime');
      vm.dirty('videoEndTime');
    };

    vm.close = function($event) {
      $modalInstance.close();
    };

    vm.saveBusy = false;
    vm.save = function() {
      function done(){
        vm.saveBusy = false;
      }
      if(!vm.saveBusy) {
        vm.saveBusy = true;
        videoChatPrefsSync.prefs = R.mixin(videoChatPrefsSync.prefs, R.pick(pushPrefs, vm.prefs));
        videoChatPrefsSync.push(pushPrefs).then(function () {
          vm.close();
        }).then(done, done);
      }
    };

    vm.zoneList = timezoneAutocomplete.filterZones('');

    vm.refreshZoneList = function (term) {
      vm.zoneList = timezoneAutocomplete.filterZones(term);
    };
  });
