/*jshint multistr: true */
'use strict';

angular.module('ka-users')
  .controller('UsersCtrl', function ($modal,
                                     $log,
                                     $location,
                                     $window,
                                     users,
                                     session,
                                     search,
                                     ngProgress) {
    var vm = this;

    var searchFields = [
      {
        label: 'Organization',
        model: 'organization'
      },
      {
        label: 'First Name',
        model: 'firstname'
      },
      {
        label: 'Last Name',
        model: 'lastname'
      },
      {
        label: 'Address',
        model: 'address'
      },
      {
        label: 'City',
        model: 'city'
      },
      {
        label: 'State',
        model: 'state'
      },
      {
        label: 'Zip Code',
        model: 'zipcode'
      },
      {
        label: 'Email',
        model: 'email'
      },
      {
        label: 'Birth-month',
        model: 'birthmonth'
      },
      {
        label: 'Birth-year',
        model: 'birthyear'
      },
      {
        label: 'Phone (###-###-####)',
        model: 'phonenumber'
      }
    ];

    vm.field = users.DEFAULT_USER_SORT;
    vm.direction = users.DEFAULT_USER_DIRECTION;
    vm.itemsPerPage = users.DEFAULT_USER_LIMIT;
    vm.currentPage = 1;
    vm.searchFields = {};
    vm.searchFieldsCollection = [];
    vm.searchForUsers = _getUsers;

    vm.resetSearch = function () {
      vm.totalRows = 0;
      search.resetFields (vm.searchFields);
      _getUsers();
    };

    function _getUsers() {
      ngProgress.start();
      vm.users = null;

      var filter = search.createFilter(vm.searchFields);
      var offset = (vm.currentPage - 1) * vm.itemsPerPage;
      var apiCall = users.getUsers(offset, vm.itemsPerPage, vm.field, vm.direction, filter);

      apiCall.then(function (response) {
        ngProgress.complete();
        /*jshint camelcase: false */
        vm.users = response.data.rows;
        vm.totalRows = response.data.total_rows;
        /*jshint camelcase: true */
      }).then(null, $log.error);
    }

    function _updateUserIds() {
      vm.userIds = [];
      users.getUserIds()
        .then(function (response) {
          vm.userIds = response.data.rows;
        }).then(null, $log.error);
    }

    if (session.userCtx.role !== 'operator') {
      $location.url('/');
    } else {

      var fields = search.createFields(searchFields, vm.searchFields, vm.searchFieldsCollection, users.getSuggestions);
      vm.searchFields = fields.list;
      vm.searchFieldsCollection = fields.collection;

      _getUsers(); //load default view
      _updateUserIds(); //used for searching the userbase

      /**
       * [changeSorting: used to change the ng-repeat orderBy property]
       */
      vm.changeSorting = function (field) {
        if (vm.field === field) {
          vm.direction = (vm.direction === 'desc') ? 'asc' : 'desc';
        } else {
          vm.direction = 'asc';
          vm.field = field;
        }
        _getUsers();
      };

      /*
       * [pageChanged: updates the user list when the paging + sorting changes]
       */
      vm.pageChanged = function () {
        _getUsers();
      };

      /*
       * [createNotification: Creates notification to be sent to user]
       */
      vm.createNotification = function (userId) {
        var createModalInstance = $modal.open({
          templateUrl: 'app/sections/users/user-send-notification.html',
          controller: 'UserSendNotificationCtrl',
          controllerAs: 'UserNotification',
          resolve: {
            userId: function () {
              return userId;
            }
          }
        });
      };

      vm.viewUsersPortal = session.switchUser;
    }
  })
  .controller('UserSendNotificationCtrl', function ($modalInstance,
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
  });