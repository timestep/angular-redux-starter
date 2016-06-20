import angular from 'angular';
import ngCookies from 'angular-cookies';
import JSON from 'json.date-extensions';
import routing from './routing.config.jsx';
import config from './app.config.jsx';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngRoute from 'angular-route';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-bootstrap';
import geolocation from './core/geolocation';
import core from './core/kagen-core.js';

JSON.useDateParser();

angular.module('kagenSite', [
  ngCookies,
  ngResource,
  ngSanitize,
  ngRoute,
  geolocation,
  'ka-allerrhythm',
  'ka-generic-paginator',
  'ka-contact-us',
  'ka-csv-worker-instantiator',
  'ka-csv-worker',
  core,
  'ka-search',
  'ka-timezone-autocomplete',
  'ka-time-field-formatter',
  'ka-login',
  'ka-reports',
  'ka-main',
  'ka-profile',
  'ka-sensitivity-test',
  'ka-associates',
  'ka-members',
  'ka-users',
  'ka-video-chat-session',
  'ka-video-chat-controls',
  'ka-video-chat-queue',
  'ka-video-chat',
  'ka-video-chat-preferences',
  'ka-video-chat-prefs-sync',
  'ka-video-chat-logs',
  'ka-video-chat-log-formatter',
  'ka-video-chat-data',
  'ka-quick-chat-usage-data',
  'ka-quick-chat-billing',
  uirouter,
  uibootstrap,
  'uiselect',
  'ngProgress',
  'angularjs-dropdown-multiselect',
  'ngDialog',
]).config(routing)
  .config(config)
  .run(function(session, $interval, $rootScope, $state) {
    session.loadAuthToken();
    // to store the last known state viewed
    $rootScope.$on('$stateChangeSuccess',
      function sChangeSuccess(event, toState, toParams, fromState) {
        // remove localStorage items used
        // to keep track of web A-R graph data requests
        window.localStorage.removeItem('startDate1Year');
        window.localStorage.removeItem('startDate6Months');
        window.localStorage.removeItem('startDate3Months');

        // Cancel the video-chat interval on route change
        if ($rootScope.quickCallIntervalStop) {
          $interval.cancel($rootScope.quickCallIntervalStop);
          $rootScope.quickCallIntervalStop = undefined;
        }

        $state.previous = fromState;
      });
  });
