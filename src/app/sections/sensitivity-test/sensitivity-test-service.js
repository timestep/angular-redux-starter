export default function sensitivityTest($window, $log, $http, $modal, session,
    sensitivityTestData) {
    var service = {};
    service.data = {};


    service.getHypersensitivityTest = function () {
      return $http.get('/api/hypersensitivity/' + session.userCtx.username);
    };

    service.saveHypersensitivityTest = function (answers) {
      return $http.put('api/hypersensitivity/' + session.userCtx.username, answers);
    };


    service.initialize = function () {
      angular.copy(sensitivityTestData, service.data);

      // setup the scoreRange
      service.data.scoreRange = R.find(R.pipe(R.prop('maxRange'), R.lte(
        service.data.score)))(service.data.scoreRanges);
    };

    service.updateScore = function (question, answer) {
      question.score = answer.value;

      service.data.score = Math.round(R.reduce(
        function (totalScore, question) {
          var score = question.score ? Number(question.score) : 0;
          if (score === -1) {
            score = 0;
          }
          return totalScore + score;
        }, 0, service.data.questions));

      service.data.scoreRange = R.find(function (scoreRange) {
        return service.data.score <= scoreRange.maxRange;
      }, service.data.scoreRanges);
    };

    service.submit = function () {
      if (session.userCtx && session.userCtx.name) {
        var answers = {};
        angular.forEach(service.data.questions, function (question) {
          if (question.score === -1) {
            answers[question.name] = null;
          } else {
            answers[question.name] = question.score === 1 ? true : false;
          }
        });

        service.saveHypersensitivityTest(answers).then(function (res) {}).then(
          null, $log.error);
      }

      var resultModal = $modal.open({
        templateUrl: 'app/sections/sensitivity-test/sensitivity-test-result.html',
        controller: 'SensitivityTestResultCtrl',
        controllerAs: 'result',
        size: 'md'
      });
    };

    service.initialize();

    return service;
  };
