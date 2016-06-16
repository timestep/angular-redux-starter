'use strict';
/*jshint expr:true*/

describe('ReportsListCtrl', function () {
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-edit'));


  var Ctrl;
  var scope;
  var q;

  var _allergensFor_;
  var _allergenCategories_;
  var _allergenLevels_;
  var _allergenLevelLabels_;
  var _allergyReports_;
  var _reportsService_;
  var _$state_;
  var _$stateParams_;
  var _ngProgress_;
  var stateGoSpy;
  var ngProgressSpyStart;
  var ngProgressSpyComplete;

  describe('ReportsEditCtrl', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _reportsService_ = {
        getReportById: function (id) {
          var res = {
            report: {}
          };
          res.report.cat1 = {
            detailedConcentrations: []
          };
          res.report.cat2 = {
            detailedConcentrations: []
          };
          res.report.cat3 = {
            detailedConcentrations: []
          };

          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };

      _allergenLevels_ = '';
      _allergenLevelLabels_ = '';
      _allergenCategories_ = ['cat1', 'cat2', 'cat3'];

      _allergensFor_ = {
        data: []
      };

      _allergensFor_.data.cat1 = 'test1';
      _allergensFor_.data.cat2 = 'test2';
      _allergensFor_.data.cat3 = 'test3';


      _allergyReports_ = {
        updateReport: function (report) {
          var res = 'report';
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        setLastViewedReport: function (clinicId) {
          return true;
        },
        clearConcentrationLevel: function (report) {
          return true;
        },
        clearAllergenLevel: function (report) {
          return true;
        }
      };

      _$stateParams_ = {
        reportId: 'Rangle'
      };

      _$state_ = {
        previous: {
          name: 'last_page'
        },
        go: function () {
          return true;
        }
      };

      _ngProgress_ = {
        start: function () {},
        complete: function () {}
      };



      stateGoSpy = sinon.spy(_$state_, 'go');
      ngProgressSpyStart = sinon.spy(_ngProgress_, 'start');
      ngProgressSpyComplete = sinon.spy(_ngProgress_, 'complete');


      Ctrl = $controller('ReportsEditCtrl', {
        allergensFor: _allergensFor_,
        allergenCategories: _allergenCategories_,
        allergenLevels: _allergenLevels_,
        allergenLevelLabels: _allergenLevelLabels_,
        allergyReports: _allergyReports_,
        reportsService: _reportsService_,
        $stateParams: _$stateParams_,
        $state: _$state_,
        $log: $log,
        ngProgress: _ngProgress_
      });

    }));


    describe('Initial state ', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        scope.$digest();
        expect(Ctrl.pageReady).to.be.true;
        expect(ngProgressSpyStart.calledOnce).to.be.true;
        expect(ngProgressSpyComplete.calledOnce).to.be.true;
      });

      it('should contain the following functions/variables', function () {
        expect(Ctrl.allergenCategories).to.exist;
        expect(Ctrl.allergenLevels).to.exist;
        expect(Ctrl.allergenLevelLabels).to.exist;
        expect(Ctrl.reportId).to.exist;
        expect(Ctrl.saveReport).to.exist;
        expect(Ctrl.goBack).to.exist;
        expect(Ctrl.clearConcentrationLevel).to.exist;
        expect(Ctrl.clearAllergenLevel).to.exist;
      });
    });

    describe('Functions: - with operator', function () {

      it('goBack() should call $state.go', function () {
        Ctrl.goBack();
        scope.$digest();
        expect(stateGoSpy.calledOnce).to.be.true;
      });

      it('saveReport() should save report', function () {
        var report = {};
        Ctrl.saveReport(report);
        scope.$digest();
        expect(Ctrl.pageReady).to.be.true;
        expect(ngProgressSpyStart.called).to.be.true;
        expect(ngProgressSpyComplete.called).to.be.true;
      });

      // it('clearConcentrationLevel() should clear concentration level',
      //   function () {
      //     var report = {
      //       concentration: 'testing',
      //       concentrationNotAvailable: true
      //     };
      //     var test = Ctrl.clearConcentrationLevel(report);
      //     scope.$digest();
      //     console.log("x",test);

      //     expect(report.concentration).deep.equal({concentration: ''});
      //   });

      // it('clearAllergenLevel() should clear allergen level', function () {
      //   var report = {
      //     level: 1
      //   };
      //   Ctrl.clearAllergenLevel(report);
      //   scope.$digest();
      //   expect(report).deep.equal({
      //     level: 0
      //   });
   //   });
    });
  });
});