// /*jshint expr:true*/

'use strict';

function getService(serviceName) {
  var injectedService;
  inject([serviceName,
    function (serviceInstance) {
      injectedService = serviceInstance;
    }
  ]);
  return injectedService;
}


describe('the search-service', function () {

  beforeEach(module('ka-search'));

  it('should exist and contain', inject(function () {
    var search = getService('search');
    expect(search.createFields).to.be.defined;
    expect(search.createFilter).to.be.defined;
    expect(search.resetFilter).to.be.defined;
  }));

  describe('createFields(): ', function () {
    var rootScope;
    var scope;
    var search;
    var suggestionsAPI;

    beforeEach(inject(function ($rootScope, $q) {

      rootScope = $rootScope;
      scope = $rootScope.$new();
      suggestionsAPI = function (type) {

        var result = {};
        result[type] = ['SUGGESTION_' + type + '_0', 'SUGGESTION_' + type + '_1', 'SUGGESTION_' + type + '_2'];

        return $q.when({
          data: result
        });
      };
      search = getService('search');
    }));

    it('should create a collection of model objects', function () {

      var fields = [
        {
          label: 'label1',
          model: 'model1'
        },
        {
          label: 'label2',
          model: 'model2'
        },
        {
          label: 'label3',
          model: 'model3'
        }
      ];
      var list = {};
      var collection = [];

      search.createFields(fields, list, collection, suggestionsAPI);

      scope.$digest();

      expect(list.model1).to.exist;
      expect(list.model1.label).to.exist;
      expect(list.model1.model).to.exist;
      expect(list.model1.suggestions).to.exist;
      expect(list.model1.suggestions).to.eql(['SUGGESTION_model1_0', 'SUGGESTION_model1_1', 'SUGGESTION_model1_2']);

      expect(list.model2).to.exist;
      expect(list.model2.label).to.exist;
      expect(list.model2.model).to.exist;
      expect(list.model2.suggestions).to.exist;
      expect(list.model2.suggestions).to.eql(['SUGGESTION_model2_0', 'SUGGESTION_model2_1', 'SUGGESTION_model2_2']);

      expect(list.model3).to.exist;
      expect(list.model3.label).to.exist;
      expect(list.model3.model).to.exist;
      expect(list.model3.suggestions).to.exist;
      expect(list.model3.suggestions).to.eql(['SUGGESTION_model3_0', 'SUGGESTION_model3_1', 'SUGGESTION_model3_2']);

      expect(collection[0]).to.eql(list.model1);
      expect(collection[1]).to.eql(list.model2);
      expect(collection[2]).to.eql(list.model3);

    });

  });

  describe('createFilter(): ', function () {
    var search;

    beforeEach(inject(function () {
      search = getService('search');
    }));

    it('should create filter object based on a list of models', function () {

      var list = {
        model1: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-1'
        },
        model2: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-2'
        },
        model3: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-3'
        }
      };

      var filter = search.createFilter(list);

      expect (filter.model1).to.equal(list.model1.model);
      expect (filter.model2).to.equal(list.model2.model);
      expect (filter.model3).to.equal(list.model3.model);

    });

  });

  describe('resetFields(): ', function () {
    var search;

    beforeEach(inject(function () {
      search = getService('search');
    }));

    it('should clear a lists model objects', function () {

      var list = {
        model1: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-1'
        },
        model2: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-2'
        },
        model3: {
          model: 'SOME-CONTENT-THAT-SHOULD-BE-EXTRACTED-3'
        }
      };

      search.resetFields(list);

      expect (list.model1.model).to.equal('');
      expect (list.model2.model).to.equal('');
      expect (list.model3.model).to.equal('');

    });

  });

});

