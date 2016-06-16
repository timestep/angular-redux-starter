'use strict';

function collisionFilter(valueCache, value, distance) {

  function nearestPoint(val) {
    var nearest = 0;

    for (var i = 0; i < valueCache.length; i++) {
      var difference = Math.abs(val - valueCache[i]);
      if (!nearest) {
        nearest = valueCache[i];
      } else if (difference < Math.abs(val - nearest)) {
        nearest = valueCache[i];
      }
    }
    return nearest;
  }

  var nearest = nearestPoint(value);
  var nearestDifference = Math.abs(value - nearest);
  if (nearest && nearestDifference < distance) {
    return collisionFilter(valueCache, value - distance, distance);
  }
  valueCache.push(value);
  return value;
}

/**
 * TODO: Fix all of these arbitrary values, so they scale better
 */
function drawKeyGroup (domNode, name, data, boxX, textX, boxY, textY, valueX, symptomEnum) {
  var svg = d3.select(domNode);
  svg.select('g.' + name)
    .selectAll('*')
    .remove();

  var text = svg.select('g.' + name)
    .selectAll('text')
    .data(data)
    .enter();

  text.append('text')
    .attr('dx', textX)
    .attr('dy', textY)
    .text(function (d) {
      return d.proper_name;
    });

  text.append('text')
    .attr('dx', valueX)
    .attr('dy', textY)
    .text(function (d) {
      var out = '';
      if (d.activePoint) {
        var value = Math.round(d.activePoint.value);
        var valueString = value.toString();

        if (symptomEnum) {
          valueString = symptomEnum[value];
        }
        out += valueString + ' ' + d.units;
      }
      return out;
    });

  svg.select('g.' + name)
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', boxX)
    .attr('cy', boxY)
    .attr('fill', function (d) {
      return d.color;
    })
    .style('stroke', 'black')
    .attr('r', 7);

}

// Get a copy of a symptom or factor with display data included
//   xScale - scale for rendering x-axis
//   yScale - scale for rendering y-axis
//   activePoint - the {date: ..., value: ...} pair closest to
//    the focus
function getDisplayData(datum, datumName, focusX, xScale, yScale) {
  var bisectDate = d3.bisector(function (d) {
    return d.date;
  }).left;

  // This sets the default activePoint to 1 year ago.
  // This will never show up in the rendered chart, however it will ensure
  // that there is a default value for activePoint used with D3.
  var activePoint = {date: moment().subtract(1, 'year'), value: 0};

  if (focusX && datum.data && datum.data.length) {
    var x0 = xScale.invert(focusX);
    var i = bisectDate(datum.data, x0, 1);

    if (datum.data[i]) {
      var d0 = datum.data[i - 1];
      var d1 = datum.data[i];

      activePoint = x0 - d0.date > d1.date - x0 ? d1 : d0;
    }

  }

  if (datumName === 'fev1') {
    console.log(activePoint);
    console.log(datum);
  }

  return _.assign({},
    datum,
    {
      yScale: yScale,
      xScale: xScale,
      activePoint: activePoint
    });
}

/**
 * This massages the Adult FENO results data to fit the low-moderate-high-veryHigh range
 * @param results
 * @returns {*}
 */
function convertAdultFENOResultsData (results) {

  if (!results) {
    return;
  }

  results.domain = [0, 4];
  results.data = _.map(results.data,
    function (item) {
      item._value = item.value;

      // Low
      if (item.value <= 25) {
        item.value = 0.5;
      }

      // Moderate
      else if (item.value >= 26 && item.value <= 50) {
        item.value = 1.5;
      }

      // High
      else if (item.value >= 51 && item.value <= 99) {
        item.value = 2.5;
      }

      // Very High
      else {
        item.value = 3.5;
      }

      return item;
    }
  );
  return results;
}

/**
 * This massages the Child FENO results data to fit the low-moderate-high-veryHigh range
 * @param results
 * @returns {*}
 */
function convertChildFENOResultsData (results) {

  if (!results) {
    return;
  }

  results.domain = [0, 4];
  results.data = _.map(results.data,
    function (item) {
      item._value = item.value;

      // Low
      if (item.value <= 25) {
        item.value = 0.5;
      }

      // High
      else if (item.value >= 26 && item.value <= 47) {
        item.value = 2.5;
      }

      // Very High
      else {
        item.value = 3.5;
      }

      return item;
    }
  );
  return results;
}

function convertTemperatureResultsData(results) {
  if (!results) {
    return;
  }

  results.data = _.map(results.data, function (item) {
    // _value will be used for the tooltip
    item._value = item.value;

    if (item.value < 0) {
      item.value = 0;
    }

    return item;
  });

  return results;
}

function getDatesSubset(dates, start, end) {
  var padding_ms = Math.floor(0.5 * (end.getTime() - start.getTime()));
  var dataStart = new Date(start.getTime() - padding_ms);
  var dataEnd = new Date(end.getTime() + padding_ms);

  return _(dates).filter(function (val) {
    return val.date >= dataStart && val.date <= dataEnd;
  }).value();
}

function translate(x, y) {
  return 'translate(' + x + ', ' + y + ')';
}


module.exports = {
  collisionFilter: collisionFilter,
  convertAdultFENOResultsData: convertAdultFENOResultsData,
  convertChildFENOResultsData: convertChildFENOResultsData,
  convertTemperatureResultsData: convertTemperatureResultsData,
  drawKeyGroup: drawKeyGroup,
  getDisplayData: getDisplayData,
  getDatesSubset: getDatesSubset,
  translate: translate
};
