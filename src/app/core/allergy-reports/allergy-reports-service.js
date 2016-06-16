'use strict';

angular.module('ka-allergy-reports', [])
  .service('reportsUrlService', function () {
    return {
      getReportUrl: function (organizationId) {
        if (!!organizationId) {
          return '/api/organization/' + organizationId + '/allergy_reports';
        }

        return '/api/allergy_reports';
      }
    };
  })
  .service('allergyReports', function (
    $state,
    $http,
    reportsUrlService,
    allergensFor,
    allergenCategories,
    reportsService,
    $log) {

    var clinicIdForLastViewedReport;

    function keys(allergensFor, allergenCategory) {
      if (!allergensFor) {
        return;
      } else {
        return Object.keys(allergensFor[allergenCategory]);
      }
    }

    return {
      setLastViewedReport: function (clinicId) {
        clinicIdForLastViewedReport = clinicId;
      },
      getLastViewedReport: function () {
        return clinicIdForLastViewedReport;
      },
      getClinics: function () {
        return $http.get('/api/organizations/');
      },
      getClinicIds: function () {
        return $http.get('/api/organizations/ids');
      },
      getClinic: function (clinicId) {
        return $http.get('/api/organization/' + clinicId)
          .then(function (res) {
            return res.data;
          });
      },
      getClinicReports: function (clinic) {
        return $http.get(reportsUrlService.getReportUrl(clinic))
          .then(function (res) {
            return res.data;
          });
      },
      clearConcentrationLevel: function (item) {
        if (item.concentrationNotAvailable) {
          item.concentration = '';
          angular.forEach(item.detailedConcentrations, function (item) {
            item.concentration = '';
          });
        }
        return item;
      },
      clearAllergenLevel: function (item) {
        if (item.levelNotAvailable) {
          item.level = -1;
        } else {
          item.level = 0;
        }
        return item;
      },
      updateReport: function (report, reportId) {
        return reportsService.updateReportById(report._id, report);
      },
      createReport: function (report) {
        return reportsService.createReport(report);
      },
      getReportTemplate: function (clinicId) {
        var report = {
          clinicId: clinicId,
          timestamp: new Date(),
          type: 'report',
          report: (function () {
            var o = {};
            allergenCategories.forEach(function (category) {
              o[category] = {
                level: 0,
                concentration: '',
                concentrationNotAvailable: true,
                detailedConcentrations: []
              };

              keys(allergensFor.data, category)
                .forEach(function (key) {
                  o[category].detailedConcentrations.push({
                    allergen: key,
                    concentration: ''
                  });
                });
            });

            return o;
          })()
        };
        return report;
      }
    };
  });