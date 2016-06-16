/*jshint multistr: true */
'use strict';

angular.module('ka-notifications')
  .controller('NotificationsCtrl', function ($modal, $log, $state, $location, $scope,
                                             $window, notifications, session, ngProgress, ngDialog) {
    if (session.userCtx.role !== 'operator' && session.userCtx.role !== 'orgadmin' ) {
      $location.url('/');
    } else {
      var vm = this;
      vm.field = 'value.title'; // default filtered field
      vm.archiveToggle = false; // show active notifications by default

      /**
       * [showActive: queries the active notifications]
       */
      vm.showActive = function (orgId) {
        ngProgress.start();
        vm.NotificationList = [];
        notifications.getNotifications(orgId)
          .then(function (response) {
            ngProgress.complete();
            vm.NotificationList = response.data.rows;
            vm.NotificationList.forEach(function(item) {
              item.timeMoment = moment(item.sendTime, 'hh:mm:ss');
              item.status = item.enabled ? 'Enabled' : 'Disabled';
            });
          }).then(null, $log.error);
      };

      /**
       * [changeFilter: used to change the ng-repeat orderBy property]
       * @param  {[type]} field [orderBy property]
       */
      vm.changeFilter = function (field) {
        if (R.head(vm.field) === '-') {
          vm.field = field;
        } else {
          vm.field = '-' + field;
        }
      };

      /**
       * [deleteNotification: Deletes notifications]
       * @param  {[string]} organizationId [Notification to delete]
       * @param  {[int]} notificationId [Notification to delete]
       */
      vm.deleteNotification = function (organizationId, notificationId) {
        var confirmation = ngDialog.openConfirm({
          template:'\
                <div>Delete cannot be undone. Proceed?</div>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="btn btn-info" ng-click="closeThisDialog()">No</button>\
                    <button type="button" class="btn btn-success" ng-click="confirm()">Yes</button>\
                </div>',
          plain: true,
          className: 'ngdialog-theme-default'
        });
        confirmation.then(function() {
          notifications.deleteNotification(organizationId, notificationId)
          .then(function (response) {
            toastr.info('Notification deleted with status ' + response.status  + ' ' + response.statusText + '.');
            $state.go($state.current, {}, {
              reload: true
            });
          }, function(response) {
            toastr.error('Failed to delete Notification.<br>' + response.status + ' ' + response.statusText + '.' + response.data);
          });
        })
        .then(null, function() {
          toastr.warning('Notification delete cancelled.');
        });
      };

      vm.enableNotification = function (organizationId, notificationId) {
        var confirmation = ngDialog.openConfirm({
          template:'\
                <div>Enable notification?</div>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="btn btn-info" ng-click="closeThisDialog()">No</button>\
                    <button type="button" class="btn btn-success" ng-click="confirm()">Yes</button>\
                </div>',
          plain: true,
          className: 'ngdialog-theme-default'
        });
        confirmation.then(function() {
          notifications.enableNotification(organizationId, notificationId)
            .then(function (response) {
              toastr.info('Notification enabled with status ' + response.status  + ' ' + response.statusText + '.');
              $state.go($state.current, {}, {
                reload: true
              });
            }, function(response) {
              toastr.error('Failed to enable Notification.<br>' + response.status + ' ' + response.statusText + '.' + response.data);
            });
        })
          .then(null, function() {
            toastr.warning('Notification enable cancelled.');
          });
      };

      vm.disableNotification = function (organizationId, notificationId) {
        var confirmation = ngDialog.openConfirm({
          template:'\
                <div>Disable notification?</div>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="btn btn-info" ng-click="closeThisDialog()">No</button>\
                    <button type="button" class="btn btn-success" ng-click="confirm()">Yes</button>\
                </div>',
          plain: true,
          className: 'ngdialog-theme-default'
        });
        confirmation.then(function() {
          notifications.disableNotification(organizationId, notificationId)
            .then(function (response) {
              toastr.info('Notification disabled with status ' + response.status  + ' ' + response.statusText + '.');
              $state.go($state.current, {}, {
                reload: true
              });
            }, function(response) {
              toastr.error('Failed to disable Notification.<br>' + response.status + ' ' + response.statusText + '.' + response.data);
            });
        })
          .then(null, function() {
            toastr.warning('Notification disable cancelled.');
          });
      };

      vm.showTemplatePreview = function(notification) {
        $scope.notification = notification;
        ngDialog.open({
          template: 'app/sections/notifications/template-preview.html',
          className: 'ngdialog-theme-default',
          scope: $scope
        });
      };

      vm.showRulesPreview = function(notification) {
        $scope.notification = notification;
        ngDialog.open({
          template: 'app/sections/notifications/rules-preview.html',
          className: 'ngdialog-theme-default',
          scope: $scope
        });
      };
    }
  })
  .filter('utcDate', function() {
    return function(string) {
      var date = moment(string);
      return date.isValid() ? date.utc().format('YYYY-MM-DD') : 'N/A';
    };
  })
  .filter('dateTime', function() {
    return function(string) {
      var date = moment(string);
      return date.isValid() ? date.format('YYYY-MM-DD HH:mm') : 'N/A';
    };
  });
