export default function AssociatesEditCtrl(
    $modalInstance,
    $log,
    organizations,
    selectedOrg,
    allOrgs,
    associateViewHelper) {

    var allAssociates = null;

    if (allOrgs.data && allOrgs.data.rows) {
      allAssociates = allOrgs.data.rows;
    }

    var vm = this;
    vm.org = selectedOrg;

    // To populate ng-options
    vm.orgTypes = associateViewHelper.orgTypes;
    vm.clinicSubTypes = associateViewHelper.clinicSubTypes;

    // To upate Account Type permissions on type toggle
    vm.updatePresets = function (org) {
      if (selectedOrg) {
        vm.org.isKagenDataCollector = false;
        vm.org.canSendNotifications = false;
        vm.org.nonMembersCanCall = false;
        vm.org.isDataCollector = false;
      }

      vm.options = associateViewHelper.updatePresets(org);
    };

    // To check for orgId duplicates
    vm.checkId = function (id) {
      vm.dupeId = associateViewHelper.checkId(id, allAssociates);
    };

    /**
     * [close: closes the edit/create modal and returns an updated organization object.]
     */
    vm.close = function (save) {
      vm.spinner = false;
      var modalReturn = {};
      modalReturn.data = vm.org;
      modalReturn.save = save || false;
      $modalInstance.close(modalReturn);
    };

    /**
     * [setDataCollector: if kagen dataCollector is selected we autopunch showReports]
     */
    vm.setDataCollector = function () {
      if (vm.org.isKagenDataCollector) {
        vm.options.showReports = true;
      } else {
        vm.options.showReports = false;
      }
    };

    /**
     * [save: save/create]
     */
    vm.save = function () {
      if (!vm.dupeId) {
        vm.spinner = true;
        vm.org.isPartner = false;
        vm.org.allMembersCanCall = false; // currently not used;

        vm.org.type = vm.orgType.type;

        // 'Clinic' OR 'Clinic/Data' set as partner - Mobile app uses this to discover clinics
        if (vm.org.type === vm.orgTypes[0].type || vm.org.type === vm.orgTypes[
          1].type) {
          vm.org.isPartner = true;
        }

        vm.org.canSendNotifications = vm.options.showPush || false;
        vm.org.nonMembersCanCall = vm.options.showVideo || false;
        vm.org.isDataCollector = vm.options.showReports || false;

        organizations.updateOrganizations(vm.org._id, vm.org)
          .then(function () {
            vm.close(true);
          }).then(null, function (err) {
            $log.error(err);
            vm.close();
          });
      }
    };

    // if organization is selected, show editView (instead of the create new organization view.)
    if (selectedOrg) {
      vm.editView = true;
      vm.options = {};

      vm.options.showPush = associateViewHelper.showPush(vm.org);
      vm.options.showVideo = associateViewHelper.showVideo(vm.org);
      vm.options.showReports = associateViewHelper.showReports(vm.org);

      switch (selectedOrg.type) {
      case vm.orgTypes[0].type:
        vm.orgType = vm.orgTypes[0]; // 'Clinic'
        break;
      case vm.orgTypes[1].type:
        vm.orgType = vm.orgTypes[1]; //'Clinic/Data'
        break;
      case vm.orgTypes[2].type:
        vm.orgType = vm.orgTypes[2]; //'Business'
        break;
      case vm.orgTypes[3].type:
        vm.orgType = vm.orgTypes[3]; //'Data Collector'
        break;
      }

    } else {
      vm.editView = false;
      vm.orgType = vm.orgTypes[0]; // 'Clinic' [default account type]
      vm.updatePresets(vm.orgType);
    }
  };
