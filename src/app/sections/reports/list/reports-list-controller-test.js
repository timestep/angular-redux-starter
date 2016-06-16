'use strict';
/*jshint expr:true*/

describe('ReportsListCtrl', function () {
  beforeEach(module('ka-core'));
  beforeEach(module('ka-reports-list'));


  var Ctrl;
  var scope;
  var q;

  var _$state_;
  var _allergyReports_;
  var _reportsService_;
  var _session_;
  var _organizations_;
  var stateGoSpy;

  describe('ReportsListCtrl - with operator', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _organizations_ = {
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: [{
              id: 'Rangle'
            }]
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };

      _reportsService_ = {
        updateSelectedClinic: function (selectedClinic) {
          var res = {};
          res.data = {
            rows: [{
              id: 'Rangle'
            }]
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;

        }
      };

      _allergyReports_ = {
        getLastViewedReport: function () {
          return {};
        }
      };

      _$state_ = {
        go: function () {
          return true;
        }
      };

      _session_ = {};
      _session_.userCtx = {
        role: 'operator'
      };

      stateGoSpy = sinon.spy(_$state_, 'go');

      Ctrl = $controller('ReportsListCtrl', {
        $state: _$state_,
        $log: $log,
        allergyReports: _allergyReports_,
        reportsService: _reportsService_,
        session: _session_,
        organizations: _organizations_
      });

    }));


    describe('Initial state - with operator', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        scope.$digest();
      });

      it('should contain the following functions/variables', function () {
        expect(Ctrl.createReport).to.exist;
        expect(Ctrl.updateSelectedClinic).to.exist;
      });
    });

    describe('Functions: - with operator', function () {

      it('createReport() should go to create report state', function () {
        var clinicId = 'Rangle';
        Ctrl.createReport(clinicId);
        scope.$digest();
        expect(stateGoSpy.calledOnce).to.be.true;
        expect(stateGoSpy.calledWith('reports.create', {
          clinicId: clinicId
        })).to.be.true;
      });


      it(
        'updateSelectedClinic() should update reports when clinic is selected',
        function () {
          var clinicId = 'Rangle';
          Ctrl.updateSelectedClinic(clinicId);
          console.log(Ctrl.reports);
          scope.$digest();
          expect(Ctrl.reports).to.deep.equal([{
            id: 'Rangle'
          }]);
        });


    });
  });

  describe('ReportsListCtrl - without operator', function () {

    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {
      //    scope = $rootScope.$new();

      scope = $rootScope.$new();

      _organizations_ = {
        getOrganizationIds: function (org) {
          var res = {};
          res.data = {
            rows: [{
              id: 'Rangle'
            }]
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };

      _reportsService_ = {
        updateSelectedClinic: function (selectedClinic) {
          var res = {};
          res.data = {
            rows: [{
              id: 'Rangle'
            }]
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };

      _allergyReports_ = {
        getClinic: function (clinicId) {
          var res = {};
          res.data = {
            rows: [{
              id: 'Rangle'
            }]
          };
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        },
        getLastViewedReport: function () {
          return {};
        }
      };

      _$state_ = {
        go: function () {
          return true;
        }
      };

      _session_ = {};
      _session_.userCtx = {
        role: 'orgAdmin'
      };

      stateGoSpy = sinon.spy(_$state_, 'go');

      Ctrl = $controller('ReportsListCtrl', {
        $state: _$state_,
        $log: $log,
        allergyReports: _allergyReports_,
        reportsService: _reportsService_,
        session: _session_,
        organizations: _organizations_
      });

    }));


    describe('Initial state - without operator', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
        scope.$digest();
      });

      it('should contain the following functions/variables', function () {
        expect(Ctrl.createReport).to.exist;
        expect(Ctrl.updateSelectedClinic).to.exist;
      });
    });

    describe('Functions: - without operator', function () {

      it('createReport() should go to create report state', function () {
        var clinicId = 'Rangle';
        Ctrl.createReport(clinicId);
        scope.$digest();
        expect(stateGoSpy.calledOnce).to.be.true;
        expect(stateGoSpy.calledWith('reports.create', {
          clinicId: clinicId
        })).to.be.true;
      });


      it(
        'updateSelectedClinic() should update reports when clinic is selected',
        function () {
          var clinicId = 'Rangle';
          Ctrl.updateSelectedClinic(clinicId);
          scope.$digest();
          expect(Ctrl.reports).to.deep.equal([{
            id: 'Rangle'
          }]);
        });


    });
  });

});