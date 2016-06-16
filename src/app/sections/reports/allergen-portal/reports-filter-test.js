'use strict';

describe('dateLimit filter', function () {
  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-portal'));
  beforeEach(module('ka-reports-service'));


  it('should return reports only from today', inject(function ($filter,
    reportsService, allergyReports) {
    var time = new Date();
    var yesterday = moment(new Date()).day(-1);
    var reports = [];

    reports.push({
      timestamp: yesterday._d,
      reports: allergyReports.getReportTemplate('Rangle1')
    });
    reports.push({
      timestamp: new Date(),
      reports: allergyReports.getReportTemplate('Rangle2')
    });
    reports.push({
      timestamp: yesterday._d,
      reports: allergyReports.getReportTemplate('Rangle3')
    });

    var result = $filter('dateLimit')(reports, time);

    expect(result.length).to.equal(1);
  }));
});