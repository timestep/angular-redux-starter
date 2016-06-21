export default function UserSendNotificationCtrl($modalInstance,
                                                  $log,
                                                  userId,
                                                  session,
                                                  notifications,
                                                  ngDialog) {
  var vm = this;
  vm.link = '';
  vm.hideTemplates = false;

  notifications.getNotificationTemplates().then(function (response) {
    vm.templates = response.data;
    vm.template = vm.templates[0];
  });
  notifications.getNotificationTypes(session.userCtx.role === 'orgadmin',
    true).then(function (response) {
    vm.types = response;
    vm.type = vm.types[0];
  });

  notifications.getNotificationLinks().then(function (response) {
    vm.links = response.data;
  }).then(null, $log.error);

  /**
   * [close: edit/create modal]
   */
  vm.close = function () {
    $modalInstance.close();
  };

  /**
   * [sendNotification: send notification to user]
   */
  vm.sendNotification = function () {
    var confirmation = ngDialog.openConfirm({
      template: '\
              <div class="form-group">Are you sure this message does not have any personally identifiable information? If yes, please click OK</div>\
              <div class="form-group">\
                  <button type="button" class="btn btn-info" ng-click="closeThisDialog()">Cancel</button>\
                  <button type="button" class="btn btn-success" ng-click="confirm()">OK</button>\
              </div>',
      plain: true,
      className: 'ngdialog-theme-default'
    });
    confirmation.then(function () {
        delete vm.types;
        delete vm.templates;
        delete vm.links;
        delete vm.hideTemplates;
        vm.spinner = true;

        notifications.sendAdHocNotification(userId, vm)
          .then(function (response) {
              toastr.info('message sent with status ' + response.status +
                '. Message id: ' + response.data.id);
              $modalInstance.close();
            },
            function (response) {
              toastr.info(response.data.error + ': ' + response.status +
                ' ' + response.statusText);
              $modalInstance.close();
            })
          .then(null, function () {
            vm.spinner = false;
          });
      })
      .then(null, function () {
        toastr.warning('Send Notification cancelled.');
      });
  };

  vm.updateTemplateView = function () {
    if (vm.link === 'Edit Profile') {
      vm.hideTemplates = true;
    } else {
      vm.hideTemplates = false;
    }
  };
}
