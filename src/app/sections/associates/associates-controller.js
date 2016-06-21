export default function AssociatesCtrl(
    $modal,
    $log,
    $location,
    $window,
    organizations,
    associateViewHelper,
    session,
    ngProgress) {

    //backing function to update the organization list according to the values set on the controller
    function _getOrgs(){
      ngProgress.start();
      vm.orgs = null;
      var offset = (vm.currentPage - 1) * vm.itemsPerPage;
      var apiCall = vm.archiveToggle ?
       organizations.getArchivedOrganizations(offset, vm.itemsPerPage, vm.field, vm.direction) :
       organizations.getOrganizations(offset, vm.itemsPerPage, vm.field, vm.direction);

      apiCall.then(function (res) {
          ngProgress.complete();
          /*jshint camelcase: false */
          if(vm.archiveToggle && res.data.total_rows === 0){
            toastr.info('No Archived Organizations');
            vm.toggle();
          }
          vm.orgs = res.data.rows;
          vm.originalOrgList = vm.orgs;
          vm.total_rows = res.data.total_rows;
          /*jshint camelcase: true */
        }).then(null, $log.error);
    }

    function _getOrgIds () {
      vm.orgIds = [];
      organizations.getOrganizationIds()
        .then(function (response) {
          vm.orgIds = response.data.rows;
        });
    }

    if (session.userCtx.role !== 'operator') {
      $location.url('/');
    } else {

      var vm = this;
      vm.field = '_id'; // default filtered field
      vm.direction = 'asc'; //default to descending
      vm.archiveToggle = false; // show active orgs by default
      vm.options = {};

      vm.options.showVideo = associateViewHelper.showVideo;
      vm.options.showPush = associateViewHelper.showPush;
      vm.options.showReports = associateViewHelper.showReports;

      // pagination settings
      vm.itemsPerPage = 25;
      vm.currentPage = 1;

      _getOrgs(); //load default view
      _getOrgIds();

      /**
       * [searchValueOnChange: updates the organization view (to default)when the search box is cleared]
       */
      vm.searchValueOnChange = function () {
        if (vm.searchValue.length === 0) {
          // restore the original view
          vm.orgs = vm.originalOrgList;
        }
      };

      /**
       * [searchOnSelect: updates the organization view when a value is selected in the search box]
       */
      vm.searchOnSelect = function (item, model, label) {
        organizations.getOrganizationById(label)
          .then(function (response) {
            vm.orgs = [response.data];
          });
      };

      /**
       * [removeFromOrgs: removes the provided organization from the vm.orgs object]
       */
      vm.removeFromOrgs = function (org) {
        var removeById = function (data) {
          if (data.id !== org.id) {
            return data;
          }
        };
        vm.orgs = R.filter(removeById, vm.orgs);
      };


      /**
       * [toggle: toggles between displaying active/archived organizations]
       */
      vm.toggle = function () {
        vm.archiveToggle = !vm.archiveToggle;
        _getOrgs();
      };

      /**
       * [changeFilter: used to change the ng-repeat orderBy property]
       */
      vm.changeFilter = function (field) {
        if (vm.field === field){
          vm.direction = (vm.direction === 'desc') ? 'asc' : 'desc';
        } else {
          vm.direction = 'asc';
          vm.field = field;
        }
        _getOrgs();
      };

      /*
      * [pageChanged: updates the associates list when the paging + sorting changes]
      */
      vm.pageChanged = function(){
        _getOrgs();
      };

      /**
       * [setOrgState: used to change the state (archived/active) of a organization]
       */
      vm.setOrgState = function (org, state) {
        if (state || !state && $window.confirm('Do you want to archive ' + org.id)) {
          org.value.isArchived = !state;
          org.value.isPartner = false;
          ngProgress.start();
          organizations.updateOrganizations(org.value._id, org.value)
            .then(function () {
              if (org.value.isArchived === true && org.value.adminUserName) {
                organizations.disableOrgAdmin(org.value.adminUserName)
                  .then(function () {
                    vm.removeFromOrgs(org);
                    ngProgress.complete();
                  });
              } else if (org.value.isArchived === false && org.value.adminUserName) {
                organizations.enableOrgAdmin(org.value.adminUserName)
                  .then(function () {
                    vm.removeFromOrgs(org);
                    ngProgress.complete();
                  });
              } else {
                vm.removeFromOrgs(org);
                ngProgress.complete();
              }
            }).then(null, $log.error);
        }
      };

      /**
       * [deleteOrg: deletes an organization and the associated orgAdmin (if one exists).]
       */
      vm.deleteOrg = function (org) {
        var orgId = org.value._id;
        if ($window.confirm('Do you want to delete ' + orgId)) {
          ngProgress.start();
          organizations.deleteOrganizations(orgId)
            .then(function () {
              if (org.value.adminUserName) {
                organizations.deleteOrgAdmin(org.value.adminUserName)
                  .then(function () {
                    vm.removeFromOrgs(org);
                    ngProgress.complete();
                  }).then(null, $log.error);
              } else {
                vm.removeFromOrgs(org);
                ngProgress.complete();
              }
            }).then(null, $log.error);
        }
      };


      /**
       * [createOrg: opens a modal to handle the creation of an organization.]
       */
      vm.createOrg = function () {
        var createModalInstance = $modal.open({
          templateUrl: 'app/sections/associates/associates-edit.html',
          controller: 'AssociatesEditCtrl',
          controllerAs: 'OrgEdit',
          resolve: {
            selectedOrg: function () {
              return false;
            },
            allOrgs: function () {
              return organizations.getOrganizationIds();
            }
          }
        });
        createModalInstance.result.then(function (res) {
          if (res.save) {
            vm.orgs.push({
              id: res.data._id,
              key: res.data._id,
              value: res.data
            });
          }
        });

      };

      /**
       * [editOrg: opens a modal to handle the editing of organization data for a selected organization.]
       */
      vm.editOrg = function (orgId) {
        var getOrganizationById = function (orgID, orgs) {
          var getOrgId = function (org) {
            if (orgId === R.get('id', org)) {
              return R.pluck('_id', org);
            }
          };

          var getOrg = R.compose(R.get('value'),
            R.head,
            R.filter(getOrgId));
          return getOrg(orgs);
        };
        var orgData = getOrganizationById(orgId, vm.orgs);
        var orgBackup = JSON.stringify(orgData);
        var indexOfOrg = R.findIndex(R.propEq('id', orgId))(vm.orgs);

        var editModalInstance = $modal.open({
          templateUrl: 'app/sections/associates/associates-edit.html',
          controller: 'AssociatesEditCtrl',
          controllerAs: 'OrgEdit',
          resolve: {
            selectedOrg: function () {
              return orgData;
            },
            allOrgs: function () {
              return false;
            }
          }
        });
        // if modal was dismissed or canceled (not saved), reload orgs data from backup.
        editModalInstance.result.then(function (res) {
          if (!res.save && orgBackup !== JSON.stringify(res.data)) {
            vm.orgs[indexOfOrg].value = JSON.parse(orgBackup);
          }
        }, function () {
          vm.orgs[indexOfOrg].value = JSON.parse(orgBackup);
        });

      };

      /**
       * [createOrgAdmin: opens a modal to handle the creations of orgAdmin - for a selected organization.]
       */
      vm.createOrgAdmin = function (org) {
        var createOrgModalInstance = $modal.open({
          templateUrl: 'app/sections/associates/associates-admin-user.html',
          controller: 'AssociatesOrgAdminCtrl',
          controllerAs: 'orgAdmin',
          resolve: {
            selectedOrg: function () {
              return org.value;
            }
          }
        });
      };

      /**
       * [deleteOrgAdmin: deletes an orgAdmin for a selected organization.]
       */
      vm.deleteOrgAdmin = function (org) {
        organizations.deleteOrgAdmin(org.value.adminUserName)
          .then(function () {
            org.value.adminUserName = '';
            organizations.updateOrganizations(org.value._id, org.value);
          }).then(null, $log.error);
      };

    }

  };
