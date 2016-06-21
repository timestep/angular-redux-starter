export default function AssociatesOrgAdminCtrl(
  $modalInstance,
  $log,
  organizations,
  selectedOrg,
  helper) {
  var vm = this;
  vm.org = selectedOrg; // current selected organization

  /**
   * [createOrgAdmin creates a orgAdmin user and assoicates it with the provided orgId]
   */
  vm.createOrgAdmin = function (username, password, orgId) {
    vm.spinner = true;
    organizations.createOrgAdmin(username, password, orgId)
      .then(function () {
        vm.org.adminUserName = username;
        organizations.updateOrganizations(orgId, vm.org)
          .then(function () {
            vm.spinner = false;
            vm.close();
          });
      }).then(null, function (err) {
        $log.error(err);
        toastr.error(err.data.error);
        vm.spinner = false;
        vm.close();
      });
  };

  /**
   * [checkPassword: validates that password/verifyPassword are identical]
   */
  vm.checkPassword = function (password, verifyPassword) {
    vm.validOrgAdmin = R.eq(password, verifyPassword);
    vm.passwordComplexitySatisfied = helper.isComplexPassword(password);
  };

  /**
   * [close: closed modal]
   */
  vm.close = function () {
    $modalInstance.close();
  };
};
