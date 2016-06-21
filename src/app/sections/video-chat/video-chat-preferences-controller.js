import angular from 'angular';

import videoChatPrefsSync
  from '../../core/video-chat/video-chat-session-service.js';

import timezoneAutocomplete from '../../core/timezone-autocomplete.js';
import timeFieldFormatter from '../../core/time-field-formatter.js';

export default angular.module('kagenSite.videoChatPreferences',
  [
    videoChatPrefsSync,
    timezoneAutocomplete,
    timeFieldFormatter,
  ])
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
  }).name;
