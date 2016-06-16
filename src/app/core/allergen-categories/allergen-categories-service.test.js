/*jshint expr:true*/

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


describe('the ka-allergen-categories value services', function () {

  beforeEach(module('ka-allergen-categories'));

  it('allergenCategories should exist', inject(function (allergenCategories) {
    expect(allergenCategories).to.be.truthy;
    expect(allergenCategories).to.eql(['Trees', 'Weeds', 'Grass',
      'Mold Spores'
    ]);
  }));

  it('allergenLevels should exist', inject(function (allergenLevels) {
    expect(allergenLevels).to.be.truthy;
    expect(allergenLevels).to.eql([0, 1, 2, 3, 4]);
  }));

  it('allergenLevelLabels should exist', inject(function (allergenLevelLabels) {
    expect(allergenLevelLabels).to.be.truthy;
    expect(allergenLevelLabels).to.eql(['Absent', 'Low', 'Medium', 'High',
      'Very High'
    ]);
  }));

  it('should fetch allergensFor data', function () {
    var allergensFor = getService('allergensFor');

    var data = allergensFor.data;
    expect(data).to.have.property('Weeds');
    expect(data).to.have.property('Grass');
    expect(data).to.have.property('Trees');
    expect(data).to.have.property('Mold Spores');
  });
});