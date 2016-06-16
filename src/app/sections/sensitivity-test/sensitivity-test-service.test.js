'use strict';

describe('the sensitivity test service', function () {
  var sensitivityTest;
  beforeEach(module('ka-sensitivity-test'));
  beforeEach(module('ka-core'));
  beforeEach(module(function($provide) {
    $provide.factory('$q', function() {
      return Q;
    });
    $provide.factory('$modal', function() {
      return {
        open: function() {
          return {
            result: $q.reject()
          };
        }
      };
    });
  }));

  beforeEach(inject(function (_sensitivityTest_) {
    sensitivityTest = _sensitivityTest_;
  }));

  it('should update scores correctly', function () {
    sensitivityTest.updateScore(
      sensitivityTest.data.questions[0],
      sensitivityTest.data.questions[0].answers[0]
    );

    expect(sensitivityTest.data.score).to.be.equal(1);
    expect(sensitivityTest.data.questions[0].score).to.be.equal(1);
    expect(sensitivityTest.data.scoreRange.maxRange).to.be.equal(3);

    sensitivityTest.updateScore(
      sensitivityTest.data.questions[0],
      sensitivityTest.data.questions[0].answers[1]
    );

    expect(sensitivityTest.data.score).to.be.equal(0);
    expect(sensitivityTest.data.questions[0].score).to.be.equal(0);
    expect(sensitivityTest.data.scoreRange.maxRange).to.be.equal(3);

    R.forEach(function(question) {
      sensitivityTest.updateScore(
        question, question.answers[0]
      );
    }, sensitivityTest.data.questions);

    expect(sensitivityTest.data.score).to.be.equal(10);

    R.forEach(function(question) {
      expect(question.score).to.be.equal(1);
    }, sensitivityTest.data.questions);

    expect(sensitivityTest.data.scoreRange.maxRange).to.be.equal(10);
  });
});