import _ from 'lodash';

export default class XAxis extends React.Component {
  constructor(props) {
    super(props);

    this.day = 24 * 60 * 60 * 1000;
    this.today = new Date();
  }

  generateTicks(x, width, y, interval) {
    let ticks = [];
    for (let z = x; z <= x + width; z += interval) {
      ticks.push(
        <line className='graphTickLine'
            key={'XTick' + z}
            x1={z}
            x2={z}
            y1={y}
            y2={y + 10}
        />
      );
    }

    return ticks;
  }

  xAxisLabelTextGenerator(dateRange) {
    if (dateRange < 30) {
      return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
    return ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

  xAxisLabelElementsGenerator(coordToLabel, xOffset, yOffset) {
    let renderedLabels = _.map(coordToLabel, function(title, coordinates) {
      let x = Number(coordinates) + xOffset;
      let y = yOffset + 25;
      return (
        <g key={'XAxisLabel' + coordinates}
            transform={'translate(' + x + ',' + y + ')'}
        >
          <text>
            {title}
          </text>
        </g>
      );
    });

    return renderedLabels;
  }

  generateLabels(daysApart, displayRange, xOffset, yOffset, scale) {

    let dNoon;
    let offset;
    let coord;
    let labelMonth;
    let label;
    let d;

    // Map x-coordinates of labels to the label text
    let coordToLabel = {};

    // Show less labels as the data size increases
    let mod = Math.round(daysApart / 30);
    let modCounter = 0;
    let ms = this.today.getMilliseconds();
    let s = ms + this.today.getSeconds() * 1000;
    let m = s + this.today.getHours() * 60000;
    let msPastMidnight = m + this.today.getHours() * 3600000;
    let tomorrowMidnight = new Date(this.today.getTime() - msPastMidnight + this.day);
    let xAxisLabels = this.xAxisLabelTextGenerator(daysApart);

    if (daysApart < 30) {

      // Past and Present Week labels
      for (d = displayRange[0]; d < this.today; d = new Date(d.getTime() + this.day)) {
        if (modCounter++ % mod) {
          continue;
        }
        label = xAxisLabels[d.getDay()];
        dNoon = new Date(d.getTime() + (this.day / 2));
        offset = label.length * 4 + 2;
        coord = Math.round(scale(dNoon)) - offset;
        coordToLabel[coord] = label;
      }

    } else {

      // Past and Present Month labels
      for (d = displayRange[0]; d < this.today; d = new Date(d.getTime() + this.day)) {
        if (modCounter++ % mod) {
          continue;
        }
        label = xAxisLabels[d.getMonth()];
        if (labelMonth === label) {
          label = '';
        } else {
          labelMonth = label;
        }
        dNoon = new Date(d.getTime() + (this.day / 2));
        offset = label.length * 4 + 2;
        coord = Math.round(scale(dNoon)) - offset;
        coordToLabel[coord] = label;
      }

    }

    // Projected Date Labels (ie. '+1', '+2', '+3'...)
    let i = 0;
    for (d = tomorrowMidnight;
         d < new Date(displayRange[1].getTime() - this.day);
         d = new Date(d.getTime() + this.day)) {
      i++;
      if (modCounter++ % mod) {
        continue;
      }
      label = '+' + i;
      offset = label.length * 4;
      dNoon = new Date(d.getTime() + (this.day / 2));
      coord = Math.round(scale(dNoon)) - offset;
      coordToLabel[coord] = label;
    }

    return this.xAxisLabelElementsGenerator(coordToLabel, xOffset, yOffset);

  }

  generateGrid(width, height, xOffset, yOffset, xInterval, yInterval) {
    let verticalLines = [];
    for (let x = xOffset; x <= (width + xOffset); x += xInterval) {
      verticalLines.push(
        <line key={'asthmaControlGridVertical' + x}
            x1={x}
            x2={x}
            y1={yOffset}
            y2={yOffset + height}
        />
      );
    }

    let horizontalLines = [];
    for (let y = yOffset; y <= (height + yOffset); y += yInterval) {
      horizontalLines.push(
        <line key={'asthmaControlGridHorizontal' + y}
            x1={xOffset}
            x2={xOffset + width}
            y1={y}
            y2={y}
        />
      );
    }
    return (
      <g className='gridBackground'
          key={'gridBg'}
      >
       {verticalLines}
       {horizontalLines}
      </g>
    );
  }

  generateBoxes(displayRange, symptomData, xOffset, yOffset, interval) {
    let boxes = [];
    let dayCount = 0;
    for (let d = displayRange[0];
         d < displayRange[1];
         d = new Date(d.getTime() + this.day)) {

      let nearbyData = this.props.getDatesSubset(symptomData,
                                                 d, new Date(d.getTime() + this.day));

      let totalValue = 0;
      _.map(nearbyData, function(symptom) {
        totalValue += symptom.value;
      });

      let average = 0;
      if (nearbyData.length) {
        average = totalValue / nearbyData.length;
      }

      let className = '';
      if (average < 1) {
        className = 'low';
      } else if (average < 2) {
        className = 'moderate';
      } else if (average < 3) {
        className = 'high';
      } else {
        className = 'veryhigh';
      }

      let r = (
        <rect className={className}
            height='10px'
            key={'XAverage' + dayCount}
            width={interval}
            x={xOffset + (interval * dayCount)}
            y={yOffset}
        />
      );
      boxes.push(r);

      dayCount++;
    }

    return boxes;
  }


  generateAsthmaControlGridBoxes(height, displayRange, factor, xOffset, yOffset, interval) {
    let dataIndex;
    let boxes = [];
    let labels = [];
    let dayCount = 0;
    let isInt = function(n) {
      return parseInt(n, 10) === n;
    };

    // Start looping through the data once we're in this display range
    for (dataIndex = 0; factor.data[dataIndex].date < displayRange[0]; dataIndex++) {
      if (!factor.data[dataIndex + 1]) {
        break;
      }
    }

    for (let day = new Date(displayRange[0]);
         day < displayRange[1];
         day.setDate(day.getDate() + 1)) {
      let datum = factor.data[dataIndex];
      // default for invalid data points
      if (typeof datum === 'undefined') {
        datum = {
          date: new Date(),
          value: '',
          units: 0
        };
      }
      let daysApart = Math.round((this.props.displayRange[1].getTime() -
                                 this.props.displayRange[0].getTime()) / this.day);
      // fill the Asthma Control Grid with the correct color and data
      // '#DDDDD9' is the default color when value is 0 or undefined else
      //  box will be colored with the factor's color property
      let bgColor = '#DDDDD9';
      if (datum.date >= displayRange[0] && datum.date <= displayRange[1]) {
        bgColor = factor.color;
        if (isInt(datum.value)) {
          if (datum.value === 0) {
            bgColor = '#DDDDD9';
          } else {
            let fontSize = Math.floor(height * 0.75);
            let x = xOffset + (interval * dayCount) + interval / 2 - fontSize / 3;
            let y = yOffset + fontSize;
            // Include value inside the box if condition is not met
            if (daysApart > 90 && fontSize >= 6) {
              labels.push(
                <g className={'AllergyGridLabel'}
                    key={'AllergyGridLabel' + dayCount}
                    transform={'translate(' + x + ',' + y + ')'}
                >
                </g>
              );
            } else {
              labels.push(
                <g className={'AllergyGridLabel'}
                    key={'AllergyGridLabel' + dayCount}
                    transform={'translate(' + x + ',' + y + ')'}
                >
                  <text fontSize={fontSize}>
                    {datum.value}
                  </text>
                </g>
              );
            }
          }
        }
        dataIndex++;
      }
      boxes.push(
        <rect className='gridBox'
            height={height}
            key={factor.name + dayCount}
            style={{fill: bgColor}}
            width={interval}
            x={xOffset + (interval * dayCount)}
            y={yOffset}
        />
      );
      boxes.push(
        <rect className='hoverBox'
            height={height}
            key={'hover' + factor.name + dayCount}
            width={interval}
            x={xOffset + (interval * dayCount)}
            y={yOffset}
        />
      );
      dayCount++;
    }
    return (
      <g className='gridRow'
          key={'gridRow' + factor.name}
      >
        {boxes}
        {labels}
      </g>
    );

  }

  render() {
    let daysApart = Math.round((this.props.displayRange[1].getTime() -
                                  this.props.displayRange[0].getTime()) / this.day);

    // Day intervals
    let interval = this.props.width / daysApart;


    let graphBottomBorder = (
      <line className='graphTickLine'
          key='graphBottomBorder'
          x1={this.props.xOffset}
          x2={this.props.xOffset + this.props.width}
          y1={this.props.yOffset}
          y2={this.props.yOffset}
      />
    );

    let ticks = this.generateTicks(this.props.xOffset, this.props.width,
                                   this.props.yOffset, interval);

    let labels = this.generateLabels(daysApart, this.props.displayRange,
                                     this.props.xOffset, this.props.yOffset, this.props.scale);

    let asthmaControlActiveToggles = this.props.asthmaControlGridToggles;

    let summaryBoxOffset = 30;
    let summaryBoxes = this.generateBoxes(this.props.displayRange, this.props.symptomData,
                                            this.props.xOffset,
                                            this.props.yOffset + summaryBoxOffset, interval);

    // Show Asthma Control Grid only if the appropriate toggles are active
    if (asthmaControlActiveToggles && asthmaControlActiveToggles.length) {
      let gridOffset = 45;
      let gridBoxHeight = 20;
      let i = 0;

      let gridBoxes = asthmaControlActiveToggles.map(function (factor) {
        let box = this.generateAsthmaControlGridBoxes(gridBoxHeight, this.props.displayRange, factor,
                                                      this.props.xOffset,
                                                      this.props.yOffset + gridOffset + (i * gridBoxHeight), interval);
        i++;
        return box;
      }, this);


      let gridHeight = 4 * gridBoxHeight; // Assuming only 4 allowed
      let gridYOffset = this.props.yOffset + gridOffset;
      let grid = this.generateGrid(this.props.width, gridHeight, this.props.xOffset, gridYOffset, interval, 20);

      return (<g className='stockchartXAxis'>
             {labels}
             {graphBottomBorder}
             {summaryBoxes}
             {ticks}
             {gridBoxes}
             {grid}
           </g>);
    }

    return (<g className='stockchartXAxis'>
             {labels}
             {graphBottomBorder}
             {summaryBoxes}
             {ticks}
           </g>);
  }
}
