// jshint ignore: start

'use strict';

describe('reports-service.createReport()', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));

  var http;

  beforeEach(inject(function ($httpBackend, reportsUrlService) {
    http = $httpBackend;
    $httpBackend.when('POST', reportsUrlService.getReportUrl('Rangle'))
      .respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should create reports', inject(function (reportsService, allergyReports) {
    var report = allergyReports.getReportTemplate('Rangle');
    reportsService.createReport(report).then(function (res) {
      expect(res.status).to.eq(200);
    }, function (err) {
      console.log('error', err);
      expect(err).to.be.undefined();
    })
      .finally(function () {
        done();
      });
    http.flush();
  }));
});

describe('reports-service.getReportById()', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));

  var http;
  var mockResponse = {
    report: {
      Trees: {
        detailedConcentrations: [{
          a: 0
        }]
      },
      Weeds: {
        detailedConcentrations: [{
          a: 0
        }]
      },
      Grass: {
        detailedConcentrations: [{
          a: 0
        }]
      },
      'Mold Spores': {
        detailedConcentrations: [{
          a: 0
        }]
      }
    },
  };

  beforeEach(inject(function ($httpBackend, reportsUrlService) {
    http = $httpBackend;
    $httpBackend.when('GET', reportsUrlService.getReportUrl() + '/rangle.io').respond(200,
      mockResponse);
    $httpBackend.resetExpectations();
  }));

  it('should get reports', inject(function (reportsService) {

    reportsService.getReportById('rangle.io').then(function (res) {
      expect(res.report['Trees']).to.deep.eq({
        detailedConcentrations: [{
          a: 0
        }]
      });
      expect(res.report['Weeds']).to.deep.eq({
        detailedConcentrations: [{
          a: 0
        }]
      });
      expect(res.report['Grass']).to.deep.eq({
        detailedConcentrations: [{
          a: 0
        }]
      });
      expect(res.report['Mold Spores']).to.deep.eq({
        detailedConcentrations: [{
          a: 0
        }]
      });
    }, function (err) {
      console.log('error', err);
      expect(err).to.be.undefined();
    })
      .finally(function () {
        done();
      });
    http.flush();
  }));
});

describe('reports-service.updateReportById()', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));

  var http;
  beforeEach(inject(function ($httpBackend, reportsUrlService) {
    http = $httpBackend;
    var url = reportsUrlService.getReportUrl('Rangle') + '/1234';
    $httpBackend.when('PUT', url).respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should update reports', inject(function (reportsService, allergyReports) {
    var report = allergyReports.getReportTemplate("Rangle");
    var reportId = '1234';
    reportsService.updateReportById(reportId, report)
      .then(function (res) {
        expect(res.status).to.eq(200);
      }, function (err) {
        console.log('error', err);
        expect(err).to.be.undefined();
      })
      http.flush();
    }));
});

describe('reports-service.updateSelectedClinic()', function () {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));

  var http;

  beforeEach(inject(function ($httpBackend, reportsUrlService) {
    http = $httpBackend;
    $httpBackend.when('GET', reportsUrlService.getReportUrl('Rangle'))
      .respond(200);
    $httpBackend.resetExpectations();
  }));

  it('should create reports', inject(function (reportsService, allergyReports) {
    var report = {};
    report.id = 'Rangle';
    reportsService.updateSelectedClinic(report).then(function (res) {
      expect(res.status).to.eq(200);
    }, function (err) {
      console.log('error', err);
      expect(err).to.be.undefined();
    })
    http.flush();
  }));

});

describe('reports-service.checkTimeStamp()', function() {

  beforeEach(module('ka-core'));
  beforeEach(module('ui.router'));
  beforeEach(module('ka-reports-service'));

  it('should determine if the provided date is from the current day', inject(function (reportsService) {
    var yesterday = moment().subtract(1, 'day')
    var sometimeAgo = moment().minutes(0);
    var test1 = {'timestamp': yesterday.toDate()}
    var test2 = {'timestamp': sometimeAgo.toDate()};
    var check1 = reportsService.checkTimeStamp(test1);
    var check2 = reportsService.checkTimeStamp(test2);

    expect(check1).to.be.undefined;
    expect(check2).to.deep.eq({'timestamp': sometimeAgo._d});
  }));
})

describe('reports-service.prepareReports()', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));


  it('should prepare report for saving', inject(function (reportsService, allergyReports, $timeout) {
    var clinic = {};
    clinic.reports =  allergyReports.getReportTemplate("Rangle");

    clinic.value = { lastReportEntered: new Date()}

      clinic.reports.timestamp = moment(clinic.reports.timestamp).subtract(1, 'seconds');
      var oldTimestamp = clinic.reports.timestamp;
      var results = reportsService.prepareReports(clinic);
      var newTimestamp = moment(results.reports.timestamp);

      expect(moment(oldTimestamp).diff(newTimestamp)).to.be.below(0);

      expect(results.reports.report['Trees'].concentrationNotAvailable).to.be.true;
      expect(results.reports.report['Weeds'].concentrationNotAvailable).to.be.true;
      expect(results.reports.report['Grass'].concentrationNotAvailable).to.be.true;
      expect(results.reports.report['Mold Spores'].concentrationNotAvailable).to.be.true;

      clinic.reports.report['Trees'].concentration = 1;
      clinic.reports.report['Weeds'].concentration = 1;
      clinic.reports.report['Grass'].concentration = 1;
      clinic.reports.report['Mold Spores'].concentration = 1;

      var results = reportsService.prepareReports(clinic);
      expect(results.reports.report['Trees'].concentrationNotAvailable).to.be.false;
      expect(results.reports.report['Weeds'].concentrationNotAvailable).to.be.false;
      expect(results.reports.report['Grass'].concentrationNotAvailable).to.be.false;
      expect(results.reports.report['Mold Spores'].concentrationNotAvailable).to.be.false;

  }));
})

describe('reports-service.attachReportToClinic()', function() {

  beforeEach(module('ui.router'));
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-service'));

  it('should attached a report', inject(function (reportsService, allergyReports) {
    var report = allergyReports.getReportTemplate('Rangle');
    var clinic = {};
    clinic.id = 'Rangle';
    clinic.value = { lastReportEntered: report.timestamp };
    reportsService.attachReportToClinic(report, clinic);
    expect(clinic.reports).to.be.an('object')
  }));

  it('should not attached a report', inject(function (reportsService, allergyReports) {
    var report = allergyReports.getReportTemplate('Rangle');
    var clinic = {};
    clinic.id = 'Rangle';
    clinic.value = { lastReportEntered: ''};

    reportsService.attachReportToClinic(report, clinic);
    expect(clinic.reports).to.be.an('undefined')

    clinic.id = '';
    clinic.value = { lastReportEntered: report.timestamp };

    reportsService.attachReportToClinic(report, clinic);
    expect(clinic.reports).to.be.an('undefined')

  }));
});
