export default function UsersCtrl($modal,
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
  }
