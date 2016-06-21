import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-bootstrap';

import fetch from 'whatwg-fetch';
import JSON from 'json.date-extensions';
import moment from 'moment';

import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngRoute from 'angular-route';
import ngCookies from 'angular-cookies';

import routing from './routing.config.jsx';
import config from './app.config.jsx';
import run from './app.run.jsx';

import geolocation from './core/geolocation';
import core from './core';
import allerrhythm from './sections/allerrhythm';
import genericPaginator from './core/generic-paginator';
import contactUs from './sections/contact';
import csvWorkerInstantiator from
  './core/csv-worker/csv-worker-instantiator-service.js';
import csvWorker from './core/csv-worker/csv-worker-service.js';
import search from './core/search';
import timezoneAutocomplete from './core/timezone-autocomplete.js';
import timeFieldFormatter from './core/time-field-formatter.js';
import login from './sections/login';
import reports from './sections/reports';
import main from './sections/main';
import profile from './sections/profile';
import sensitivityTest from './sections/sensitivity-test';
import associates from './sections/associates';
import members from './sections/members/members.js';
import users from './sections/users';

import videoChatSessionSvc
  from './core/video-chat/video-chat-session-service.js';
import videoChatControlsSvc
  from './core/video-chat/video-chat-controls-service.js';
import videoChatQueueSvc from './core/video-chat/video-chat-queue-service.js';
import videoChat from './sections/video-chat/video-chat-controller.js';
import videoChatPreferences
  from './sections/video-chat/video-chat-preferences-controller.js';
import videoChatPrefsSyncSvc
  from './core/video-chat/video-chat-prefs-sync-service.js';
import videoChatLogsSvc
  from './core/video-chat/video-chat-logs-service.js';
import videoChatLogFormatter
  from './core/video-chat/video-chat-log-formatter-service.js';
import videoChatData
  from './sections/video-chat/video-chat-data-controller.js';
import quickChatUsageData from './core/quick-chat-usage-data-service';
import quickChatBilling from './sections/quick-chat-billing';
// if (typeof global.fetch === 'undefined') {
//   global.fetch = fetch;
// }
//
// if (typeof global.moment === 'undefined') {
//   global.moment = moment;
// }

// JSON.useDateParser();
angular.module('kagenSite', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  geolocation,
  allerrhythm,
  genericPaginator,
  contactUs,
  csvWorkerInstantiator,
  csvWorker,
  core,
  search,
  timezoneAutocomplete,
  timeFieldFormatter,
  login,
  reports,
  main,
  profile,
  sensitivityTest,
  associates,
  members,
  users,
  videoChatSessionSvc,
  videoChatControlsSvc,
  videoChatQueueSvc,
  videoChat,
  videoChatPreferences,
  videoChatPrefsSyncSvc,
  videoChatLogsSvc,
  videoChatLogFormatter,
  videoChatData,
  quickChatUsageData,
  quickChatBilling,
  'uirouter',
  'uibootstrap',
  'uiselect',
  'ngProgress',
  'angularjs-dropdown-multiselect',
  'ngDialog',
]).config(routing)
  .config(config)
  .run(run);
