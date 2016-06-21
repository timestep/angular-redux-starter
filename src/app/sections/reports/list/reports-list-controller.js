export default function ReportsListCtrl(
  $state,
  $log,
  allergyReports,
  reportsService,
  session,
  organizations) {

  var clinicIdForLastViewedReport = allergyReports.getLastViewedReport();
  var vm = this;

  vm.createReport = function (clinicId) {
    $state.go('reports.create', {
      clinicId: clinicId
    });
  };

  if (session.userCtx.role !== 'operator') {
    //if user is clinic, just query their only one clinic
    var clinicId = session.userCtx.clinicId;
    allergyReports.getClinic(clinicId)
      .then(function (res) {
        vm.clinics = [];
        vm.clinics.push(res);
        vm.selectedClinic = res;
        vm.updateSelectedClinic(vm.selectedClinic);
      });
  } else if (session.userCtx.role === 'operator') {
    //if user is operator get all clinics

    organizations.getOrganizationIds()
      .then(function (res) {
        vm.clinics = res.data.rows;
        vm.selectedClinic =
          clinicIdForLastViewedReport ?
          vm.clinics.filter(function (clinic) {
            return clinic.id === clinicIdForLastViewedReport;
          })[0] :
          vm.clinics[0];
        vm.updateSelectedClinic(vm.selectedClinic);
      }).then(null, $log);
  }

  //update reports when clinic is selected
  vm.updateSelectedClinic = function (selectedClinic) {
    if (!selectedClinic) {
      return;
    }
    vm.reports = null;
    reportsService.updateSelectedClinic(selectedClinic)
      .then(function (res) {
        var getClinicReports = R.curry(function (id, data) {
          if (id === data.key) {
            return data;
          }
        });
        vm.reports = R.filter(getClinicReports(selectedClinic.id), res.data.rows);
      }).then(null, $log);
  };

};
