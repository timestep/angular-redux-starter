'use strict';

describe('the captailization filter', function () {
  var $filter;
  beforeEach(module('ka-capitalize'));
  beforeEach(inject(function (_$filter_) {
    $filter = _$filter_;
  }));

  it('should captalize the first letter', function () {

    var input = 'input';
    var result = $filter('capitalize')(input);
    expect(result).to.be.equal('Input');

  });
});