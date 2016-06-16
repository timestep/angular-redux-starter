'use strict';

import {
  angular,
  ngCookies
} from 'angular';
// import fetch from 'fetch';
// import ngCookies from 'ngCookies';
import $ from 'jquery';

angular.module('kagenSite', [
  ngCookies,
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'geolocation',
  'ka-allerrhythm',
  'ka-generic-paginator',
  'ka-contact-us',
  'ka-csv-worker-instantiator',
  'ka-csv-worker',
  'ka-core',
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
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  'ngProgress',
  'angularjs-dropdown-multiselect',
  'ngDialog'
])
  .config(function ($compileProvider, $stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|blob):/);

    function checkLoggedin(session, $state) {
      if (session.userCtx && session.userCtx.name) {
        return true;
      } else if (session.getSession()) {
        return true;
      }
      $state.go('/');
      return false;
    }


    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'https://koddemo.herokuapp.com/*'
    ]);

    $stateProvider
      .state('main', {
        url: '/'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/sections/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('reference', {
        url: '/reference',
        templateUrl: 'app/sections/reference/reference.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('allerrhythm', {
        url: '/allerrhythm',
        templateUrl: 'app/sections/allerrhythm/allerrhythm.html',
        controller: 'AllerRhythmCtrl',
        controllerAs: 'ar',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('associates', {
        url: '/associates',
        templateUrl: 'app/sections/associates/associates.html',
        controller: 'AssociatesCtrl',
        controllerAs: 'OrgList',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('members', {
        url: '/members',
        templateUrl: 'app/sections/members/members.html',
        controller: 'MembersCtrl',
        controllerAs: 'MemberList',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/sections/users/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'UserList',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('watches', {
        url: '/watches',
        templateUrl: 'app/sections/watches/watches.html',
        controller: 'WatchesCtrl',
        controllerAs: 'WatchList',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/sections/profile/profile.html',
        controller: 'ProfileCtrl as Profile',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('video-chat-history', {
        url: '/video-chat-history',
        templateUrl: 'app/sections/video-chat/video-chat-data.html',
        controller: 'VideoChatDataCtrl as VCData',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('quickchatbilling', {
        url: '/quickchatbilling',
        templateUrl: 'app/sections/quick-chat-billing/quick-chat-billing.html',
        controller: 'QuickChatBillingCtrl as QCB',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('videochat', {
        url: '/video-chat',
        templateUrl: 'app/sections/video-chat/video-chat.html',
        controller: 'VideoChatCtrl',
        controllerAs: 'videoChat',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('videochat-preferences', {
        url: '/preferences',
        templateUrl: 'app/sections/video-chat/video-chat-preferences.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('sensitivitytest', {
        url: '/sensitivity-test',
        templateUrl: 'app/sections/sensitivity-test/sensitivity-test.html',
        controller: 'SensitivityTestCtrl',
        controllerAs: 'sensitivity',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notifications', {
        url: '/notifications',
        template: '<div ui-view=""></div>',
        controller: function () {},
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notifications.list', {
        url: '/list',
        templateUrl: 'app/sections/notifications/notifications.html',
        controller: 'NotificationsCtrl',
        controllerAs: 'NotificationList',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notifications.edit', {
        url: '/edit/:organizationId/:notificationId',
        controller: 'NotificationEditCtrl',
        controllerAs: 'NotificationEdit',
        templateUrl: 'app/sections/notifications/notification-edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notifications.create', {
        url: '/create/:organizationId',
        controller: 'NotificationEditCtrl',
        controllerAs: 'NotificationEdit',
        templateUrl: 'app/sections/notifications/notification-edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('notification-new', {
        url: '/notification-new',
        templateUrl: 'app/sections/notifications/notification-new.html'
      })
      .state('clients', {
        url: '/clients',
        templateUrl: 'app/sections/clients/clients.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
    /*   NEW REPORTS PORTAL */
      .state('report', {
        url: '/allergy-reports',
        template: '<div ui-view=""></div>',
        resolve: {
          loggedin: checkLoggedin
        },
        controller: function ($state) {
          $state.go('report.entry');
        }
      })
      .state('report.entry', {
        controller: 'ReportsCtrl',
        controllerAs: 'report',
        templateUrl: 'app/sections/reports/allergen-portal/reports-entry.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('report.history', {
        controller: 'ReportsHistoryCtrl',
        controllerAs: 'report',
        templateUrl: 'app/sections/reports/allergen-portal/reports-history.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('report.edit', {
        url: '/edit/:reportId',
        controller: 'ReportsEditCtrl',
        controllerAs: 'edit',
        templateUrl: 'app/sections/reports/edit/report-edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
    /*   OLD REPORTS PORTAL */
      .state('reports', {
        url: '/reports',
        template: '<div ui-view=""></div>',
        controller: function ($state) {
          $state.go('reports.list');
        }
      })
      .state('reports.list', {
        url: '/list',
        templateUrl: 'app/sections/reports/list/reports-list.html',
        controller: 'ReportsListCtrl',
        controllerAs: 'list',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('reports.edit', {
        url: '/edit/:reportId',
        controller: 'ReportsEditCtrl',
        controllerAs: 'edit',
        templateUrl: 'app/sections/reports/edit/report-edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('reports.create', {
        url: '/_new/:clinicId',
        controller: 'ReportsCreateCtrl',
        controllerAs: 'create',
        templateUrl: 'app/sections/reports/create/report-create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

    $urlRouterProvider.otherwise('/');
  })
  .config(function ($provide) {
    $provide.decorator('timepickerDirective', function ($delegate) {
      var directive = $delegate[0];
      delete directive.templateUrl;
      // Inline template markup copied from angular-bootstrap/ui-bootstrap-tpls.min.js and modified
      directive.template =
        '<table>\n' +
        '	<tbody>\n' +
        '		<tr class=\'text-center\'>\n' +
        '			<td><a ng-click=\'incrementHours()\' class=\'btn btn-link\'><span class=\'glyphicon glyphicon-chevron-up\'></span></a></td>\n' +
        '			<td>&nbsp;</td>\n' +
        '			<td></td>\n' +
        '			<td ng-show=\'showMeridian\'></td>\n' +
        '		</tr>\n' +
        '		<tr>\n' +
        '			<td style=\'width:50px;\' class=\'form-group\' ng-class=\'{"has-error": invalidHours}\'>\n' +
        '				<input type=\'text\' ng-model=\'hours\' ng-change=\'updateHours()\' class=\'form-control text-center\' ng-mousewheel=\'incrementHours()\' ng-readonly=\'readonlyInput\' maxlength=\'2\'>\n' +
        '			</td>\n' +
        '			<td>:</td>\n' +
        '			<td style=\'width:50px;\' class=\'form-group\' ng-class=\'{"has-error": invalidMinutes}\'>\n' +
        '				<input type=\'text\' ng-model=\'minutes\' ng-change=\'updateMinutes()\' class=\'form-control text-center\' readonly maxlength=\'2\'>\n' +
        '			</td>\n' +
        '			<td ng-show=\'showMeridian\'><button type=\'button\' class=\'btn btn-default text-center\' ng-click=\'toggleMeridian()\'>{{meridian}}</button></td>\n' +
        '		</tr>\n' +
        '		<tr class=\'text-center\'>\n' +
        '			<td><a ng-click=\'decrementHours()\' class=\'btn btn-link\'><span class=\'glyphicon glyphicon-chevron-down\'></span></a></td>\n' +
        '			<td>&nbsp;</td>\n' +
        '			<td></td>\n' +
        '			<td ng-show=\'showMeridian\'></td>\n' +
        '		</tr>\n' +
        '	</tbody>\n' +
        '</table>\n' +
        '';

      return $delegate;
    });
  })
  .run(function (session, $interval, $rootScope, $state) {
    session.loadAuthToken();
    // to store the last known state viewed
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {

      //remove localStorage items used to keep track of web A-R graph data requests
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
