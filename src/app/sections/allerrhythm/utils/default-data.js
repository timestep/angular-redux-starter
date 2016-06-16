'use strict';

var map = {
  'tree': 'Trees',
  'weeds': 'Weeds',
  'grass': 'Grass'
};

var data = {
  'NORTHEAST': {
    'states': ['ME', 'NH', 'PA', 'VT', 'NY', 'NJ', 'MA', 'RI', 'DE',
      'CT'
    ],
    'weeks': {
      'tree': {
        'onset': 10,
        'peakStart': 17,
        'peakEnd': 25,
        'end': 30
      },
      'grass': {
        'onset': 13,
        'peakStart': 20,
        'peakEnd': 30,
        'end': 40
      },
      'weeds': {
        'onset': 16,
        'peakStart': 34,
        'peakEnd': 42,
        'end': '2nd FROST'
      }
    }
  },
  'NORTHERN MIDWEST': {
    'states': ['MI', 'WI', 'MN', 'ND', 'SD'],
    'weeks': {
      'tree': {
        'onset': 12,
        'peakStart': 17,
        'peakEnd': 24,
        'end': 30
      },
      'grass': {
        'onset': 20,
        'peakStart': 21,
        'peakEnd': 28,
        'end': 42
      },
      'weeds': {
        'onset': 29,
        'peakStart': 32,
        'peakEnd': 39,
        'end': '2nd FROST'
      }
    }
  },
  'CENTRAL MIDWEST': {
    'states': ['IL', 'OH', 'IN', 'IA', 'NE', 'MO', 'KS'],
    'weeks': {
      'tree': {
        'onset': 9,
        'peakStart': 13,
        'peakEnd': 20,
        'end': 30
      },
      'grass': {
        'onset': 16,
        'peakStart': 20,
        'peakEnd': 29,
        'end': 44
      },
      'weeds': {
        'onset': 21,
        'peakStart': 32,
        'peakEnd': 42,
        'end': '2nd FROST'
      }
    }
  },
  'SOUTHEAST': {
    'states': ['DC', 'VA', 'WV', 'KY', 'TN', 'NC', 'SC', 'MS', 'AL',
      'GA'
    ],
    'weeks': {
      'tree': {
        'onset': 2,
        'peakStart': 9,
        'peakEnd': 19,
        'end': 20
      },
      'grass': {
        'onset': 12,
        'peakStart': 18,
        'peakEnd': 27,
        'end': 39
      },
      'weeds': {
        'onset': 10,
        'peakStart': 27,
        'peakEnd': 38,
        'end': '2nd FROST'
      }
    }
  },
  'SOUTH': {
    'states': ['OK', 'TX', 'LA', 'AR', 'FL'],
    'weeks': {
      'tree': {
        'onset': 6,
        'peakStart': 10,
        'peakEnd': 20,
        'end': 30
      },
      'grass': {
        'onset': 7,
        'peakStart': 15,
        'peakEnd': 25,
        'end': 42
      },
      'weeds': {
        'onset': 10,
        'peakStart': 31,
        'peakEnd': 42,
        'end': 44
      }
    }
  },
  'ROCKY MOUNTAINS': {
    'states': ['MT', 'ID', 'WY', 'CO', 'UT'],
    'weeks': {
      'tree': {
        'onset': 9,
        'peakStart': 12,
        'peakEnd': 22,
        'end': 30
      },
      'grass': {
        'onset': 18,
        'peakStart': 23,
        'peakEnd': 31,
        'end': 40
      },
      'weeds': {
        'onset': 19,
        'peakStart': 32,
        'peakEnd': 39,
        'end': 42
      }
    }
  },
  'SOUTHWEST': {
    'states': ['NM', 'AZ', 'NV'],
    'weeks': {
      'tree': {
        'onset': 6,
        'peakStart': 12,
        'peakEnd': 18,
        'end': 31
      },
      'grass': {
        'onset': 10,
        'peakStart': 20,
        'peakEnd': 30,
        'end': 42
      },
      'weeds': {
        'onset': 12,
        'peakStart': 31,
        'peakEnd': 39,
        'end': 44
      }
    }
  },
  'CENTRAL CALIFORNIA': {
    'states': ['CA'],
    'weeks': {
      'tree': {
        'onset': 7,
        'peakStart': 10,
        'peakEnd': 15,
        'end': 26
      },
      'grass': {
        'onset': 10,
        'peakStart': 16,
        'peakEnd': 27,
        'end': 44
      },
      'weeds': {
        'onset': 26,
        'peakStart': 31,
        'peakEnd': 39,
        'end': 42
      }
    }
  },
  'PACIFIC NORTHWEST': {
    'states': ['WA', 'OR', 'AK'],
    'weeks': {
      'tree': {
        'onset': 6,
        'peakStart': 9,
        'peakEnd': 15,
        'end': 24
      },
      'grass': {
        'onset': 15,
        'peakStart': 22,
        'peakEnd': 30,
        'end': 35
      },
      'weeds': {
        'onset': 16,
        'peakStart': 22,
        'peakEnd': 28,
        'end': 35
      }
    }
  }
};

function getDefaultData(stateAbbreviation, startDate, endDate) {
  var report = {};

  if (stateAbbreviation === null) {
    report['Trees'] = {
      level: 0
    };
    report['Weeds'] = {
      level: 0
    };
    report['Grass'] = {
      level: 0
    };
    report['Mold Spores'] = {
      level: 0
    };
    return report;
  }

  var currentWeek = moment(startDate);

  while (currentWeek.isBefore(moment(endDate).add(1, 'week'))) {
    report[currentWeek.week()] = {};
    currentWeek = currentWeek.add(1, 'week');
  }

  // loop throgh each week
  Object.keys(report).forEach(function (week) {

    // loop through all regions
    Object.keys(data).forEach(function (regionName) {
      var region = data[regionName]; // index our hashset

      // loop through all region states
      region.states.forEach(function (state) {
        if (state === stateAbbreviation) {
          // calculate the level based on the week
          Object.keys(region.weeks).forEach(function (allergen) {
            var dateRange = region.weeks[allergen];

            var level;
            if (week < dateRange.onset) {
              level = 0;
            } else if (week >= dateRange.onset && week < dateRange.peakStart) {
              level = 1;
            } else if (week >= dateRange.peakStart && week < dateRange.peakEnd) {
              level = 3;
            } else if (week >= dateRange.peakEnd && week < dateRange.end) {
              level = 1;
            } else {
              level = 0;
            }

            allergen = map[allergen] ? map[allergen] : allergen;
            report[week][allergen] = {
              level: level
            };
            report[week]['Mold Spores'] = {
              level: 0
            };
          });
        }
      });
    });
  });

  return report;
}

function isEmptyAllergenData(payload) {
  var allergenData = payload.data.factors.Allergens;
  var empty = true;
  // map thru all the factors
  // [grass, trees, weeds, molds]
  // if there are any real points, return false
  // otherwise true
  R.mapObj(function (factor) {
    factor.data.map(function (point) {
      if (point.value !== 0 && point.value !== 0.3) {
        empty = empty && false;
      }
    });
  }, allergenData);

  return empty;
}

module.exports = {
  getDefaultData: getDefaultData,
  isEmptyAllergenData: isEmptyAllergenData
};
