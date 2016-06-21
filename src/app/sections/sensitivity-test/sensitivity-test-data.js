export const sensitivityTestData = {
    'header': 'Hypersensitivity Test',
    'scoreRanges': [{
      'minRange': 0,
      'maxRange': 3,
      'class': 'good',
      'title': 'Low'
    }, {
      'minRange': 4,
      'maxRange': 6,
      'class': 'mild',
      'title': 'Moderate'
    }, {
      'minRange': 7,
      'maxRange': 8,
      'class': 'moderate',
      'title': 'High'
    }, {
      'minRange': 9,
      'maxRange': 10,
      'class': 'severe',
      'title': 'Very High'
    }],
    'questions': [{
      'title': 'Are your eyes sensitive to sunlight?',
      'name': 'needSunglasses',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Does the smell of perfume, exhaust or smoke irritate you?',
      'name': 'smellIrritate',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Do you have cold hands and cold feet?',
      'name': 'coldHands',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Are you very ticklish?',
      'name': 'ticklish',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Does cold air make your nose wet and runny?',
      'name': 'coldAir',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Do you take really hot showers?',
      'name': 'hotShowers',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Are you sleepy by the middle of your day?',
      'name': 'sleepyMidday',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Have you ever had a migraine headache?',
      'name': 'migraineHeadache',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Are you sensitive to medications or alcoholic drinks?',
      'name': 'sensitiveMedication',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      }]
    }, {
      'title': 'Can you feel when you ovulate?',
      'name': 'feelOvulate',
      'answers': [{
        'desc': 'Yes',
        'value': 1
      }, {
        'desc': 'No',
        'value': 0
      },{
        'desc': 'I do not Ovulate',
        'value': -1
      }]
    }]
  };
