'use strict';
/*jshint expr:true*/

describe('WatchesCtrl', function () {
  beforeEach(module('ka-watches'));


  var Ctrl;
  var scope;
  var _watches_;
  var _ngProgress_;
  var _session_;
  var q;
  var ngProgressSpyStart;
  var ngProgressSpyComplete;

  describe('WatchesCtrl ', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function (
      $q,
      $rootScope,
      $controller,
      $log) {
      //    scope = $rootScope.$new();


      scope = $rootScope.$new();

      _ngProgress_ = {
        start: function () {},
        complete: function () {}
      };

      _watches_ = {
        getWatches: function () {
          var res = {};
          res.data = 'res.data';
          q = $q.defer();
          q.resolve(res);
          return q.promise;
        }
      };

      _session_ = {};
      _session_.userCtx = {
        role: 'operator'
      };


      ngProgressSpyStart = sinon.spy(_ngProgress_, 'start');
      ngProgressSpyComplete = sinon.spy(_ngProgress_, 'complete');

      Ctrl = $controller('WatchesCtrl', {
        $log: $log,
        ngProgress: _ngProgress_,
        watches: _watches_,
        session: _session_
      });

    }));


    describe('Initial state', function () {

      it('should instantiate the controller properly', function () {
        expect(Ctrl).to.be.defined;
      });

      it('should contain the following functions', function () {
        expect(Ctrl.showActive).to.exist;
        expect(Ctrl.changeFilter).to.exist;
        expect(Ctrl.field).to.eq('value.title');
      });

    });

    describe('Function:', function () {


      it('changeFilter() should change field', function () {
        Ctrl.changeFilter('filterField');
        scope.$digest();

        expect(Ctrl.field).to.eq('-filterField');

        Ctrl.changeFilter('filterField');
        scope.$digest();

        expect(Ctrl.field).to.eq('filterField');
      });


      it('showActive() should query and get back data', function () {
        Ctrl.showActive();
        scope.$digest();

        expect(ngProgressSpyStart.calledOnce).to.be.true;
        expect(ngProgressSpyComplete.calledOnce).to.be.true;
        expect(Ctrl.WatchList).to.eq('res.data');

      });
    });

  });

});