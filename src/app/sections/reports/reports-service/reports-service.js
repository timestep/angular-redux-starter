export default function reportsService(
    reportsUrlService,
    $http,
    allergenCategories) {
    var service = {};

    // add timestamp to clinic and report to establish common timestamp - used to indicate daily report complete
    service.prepareReports = function (clinic) {
      var report = clinic.reports.report;
      clinic.reports.timestamp = new Date();
      clinic.value.lastReportEntered = clinic.reports.timestamp;

      // clear concentration value when value is not a number
      [
        'Trees',
        'Weeds',
        'Grass',
        'Mold Spores'
      ].forEach(function (key) {
        if (isNaN(report[key].concentration)) {
          report[key].concentration = '';
        }
      });

      // add levelNotAvailable flag into report if level not provided
      [
        'Trees',
        'Weeds',
        'Grass',
        'Mold Spores'
      ].forEach(function (key) {
        if (report[key].level === -1) {
          report[key].levelNotAvailable = true;
          report[key].concentration = '';
          report[key].concentrationNotAvailable = true;
          report[key].detailedConcentrations = [];
        } else {
          report[key].levelNotAvailable = false;
        }
      });

      // add ConcentrationNotAvailable flag into report if concentration provided
      report.Trees.concentrationNotAvailable = !report.Trees.concentration;
      report.Weeds.concentrationNotAvailable = !report.Weeds.concentration;
      report.Grass.concentrationNotAvailable = !report.Grass.concentration;
      report['Mold Spores'].concentrationNotAvailable = !report['Mold Spores'].concentration;
      return clinic;
    };

    // generates allergen objecst for povided allergen type
    service.generateTopAllergens = function (type, modal) {
      angular.forEach(type, function (value, key) {
        modal.push({
          id: key,
          label: value.allergen
        });
      });
    };

    // checks if report's timestamp is from today
    service.checkTimeStamp = function(report) {
      if (moment(report.timestamp).isSame(moment(), 'day')) {
        return report;
      }
    };

    // if provided clinic and report have the same timestmap - add to clinic
    service.attachReportToClinic = R.curry(function(report, clinic) {
      if (report.clinicId === clinic.id &&
        Math.abs(moment(report.timestamp).diff(moment(clinic.value.lastReportEntered), 'day')) === 0) {
        clinic.reports = report;
        return true;
      }
    });

    // uses alasql to export report data  (all data or time range) as .cvs
    service.exportReportData = function(range, reports) {
      var dataToExport = [];

      // given report data will create a cvs row combining all relevant report data
      var createDataRow = function(data) {
        var tempObj = {};
        tempObj.timestamp = data.timestamp;
        tempObj.clinic = data.clinicId;

        angular.forEach(allergenCategories, function(allergen, key) {
          if (data.report[allergen]) {
            tempObj[allergen+' Concentration'] = !data.report[allergen].concentrationNotAvailable ? data.report[allergen].concentration : 0;
            tempObj[allergen+' Level'] = data.report[allergen].level;
            tempObj[allergen+' Detailed Concentrations'] = '';
            if (data.report[allergen].detailedConcentrations) {
              angular.forEach(data.report[allergen].detailedConcentrations, function(value, key) {
                var allergenValue = value.allergen;
                var concentration = value.concentration ? value.concentration : 0;
                tempObj[allergen+' Detailed Concentrations'] = tempObj[allergen+' Detailed Concentrations'] + '[ALLERGEN: ' + allergenValue + ' CONCENTRATION: ' + concentration + ']';
              });
            }
          }

        });

        dataToExport.push(tempObj);
      };

      // if range was provided, only return reports within range
      if (range) {
        var isDateWithinRange = function(report) {
          if (Number(moment(report.timestamp).diff(range, 'hours')) >= 0 &&
              Number(moment(report.timestamp).diff(range, 'hours') <= 24)) {
              return report;
          }
        };
        reports = R.filter(isDateWithinRange, reports);
      }

      // generate rows for all filterd report data
      R.map(createDataRow, reports);

      // save exported report data as .cvs if data exist
      if (dataToExport.length > 0 ) {
        alasql('SELECT * INTO CSV("report.csv",{headers:true}) FROM ?',[dataToExport]);
      } else {
        window.alert('Sorry - no report data to export for this day');
      }
    };

    service.updateSelectedClinic = function (selectedClinic) {
      return $http.get(reportsUrlService.getReportUrl(selectedClinic.id));
    };

    var filterEmptyDetailedConcentrations = function(reportCopy) {
      Object.keys(reportCopy.report)
        .forEach(function (category) {
          reportCopy.report[category].detailedConcentrations =
            reportCopy.report[category].detailedConcentrations.filter(
              function (detail) {
                return detail.concentration;
              });
        });
      return reportCopy;
    };

    service.createReport = function (report) {
      //filter out all zero categories so that they are not included in the saved report
      var reportCopy = filterEmptyDetailedConcentrations(JSON.parse(JSON.stringify(report)));

      return $http.post(reportsUrlService.getReportUrl(report.clinicId), reportCopy);
    };

    service.updateReportById = function (reportId, report) {
      //filter out all zero categories so that they are not included in the saved report
      var reportCopy = filterEmptyDetailedConcentrations(JSON.parse(JSON.stringify(report)));
      return $http.put(reportsUrlService.getReportUrl(report.clinicId) + '/' + reportId, reportCopy );
    };

    service.getReportById = function (reportId) {

      return $http.get(reportsUrlService.getReportUrl() + '/' + reportId)
        .then(
          function (response) {
            var report = response.data;
            allergenCategories.forEach(function (category) {
              report.report[category].detailedConcentrations =
                report.report[category].detailedConcentrations || [];
            });
            return report;
          });
    };
    return service;
  };
