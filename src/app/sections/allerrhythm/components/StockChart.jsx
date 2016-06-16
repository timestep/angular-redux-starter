import _ from 'lodash';
import d3Util from '../utils/d3.js';
import FactorLines from './FactorLines.jsx';
import FactorDots from './FactorDots.jsx';
import Focus from './Focus.jsx';
import ProjectionOverlay from './ProjectionOverlay.jsx';
import SymptomLine from './SymptomLine.jsx';
import XAxis from './XAxis.jsx';
import YAxis from './YAxis.jsx';

export default class StockChart extends React.Component {
  constructor(props) {
    super(props);

    this.margin = {
      top: 5,
      right: 20,
      bottom: 40,
      left: 30
    };

    this.today = new Date();

    this.state = {
      width: 500,
      height: 500,
      focus: {
        visible: false,
        stickied: 0
      },
      mouseX: 0,
      mouseY: 0
    };

    this.activeDate = this.today;
  }

  componentDidMount() {
    this.checkResize();
    window.addEventListener('resize', this.checkResize.bind(this));
  }

  componentWillReceiveProps() {
    this.checkResize();
  }

  checkResize() {
    var newState;
    var svg = ReactDOM.findDOMNode(this);
    var uglyWidth = window.getComputedStyle(svg).width;
    var totalWidth = Number(uglyWidth.slice(0, -2));
    // Handle mouse events
    function mouseMove(self) {

      var mouseEvent = d3.mouse(this);
      var xPos = mouseEvent[0];
      var yPos = mouseEvent[1];

      newState = React.addons.update(self.state,
        {
          mouseX: {
            $set: xPos
          },
          mouseY: {
            $set: yPos
          }
        });

      var focusX = (self.state.focus.stickied || xPos) - self.margin.left;
      var activeDate = self.xScale.invert(focusX);

      // Silly, but it does the job.
      if (activeDate.getDay() !== self.activeDate.getDay()) {
        self.props.changeActiveDate(activeDate);
        self.activeDate = activeDate;
      }

      self.setState(newState);
    }

    function mouseOver(visible) {
      newState = React.addons.update(this.state,
        {
          focus: {
            visible: {
              $set: visible
            }
          }
        });

      this.setState(newState);
    }

    function mouseClick(self) {
      var stickied = false;

      if (self.state.focus.stickied === false) {
        stickied = d3.mouse(this)[0];
        self.props.getTriggersForDate(self.activeDate);
      }

      newState = React.addons.update(self.state,
        {
          mouseClick: {
            $set: true
          },

          focus: {
            stickied: {
              $set: stickied
            }
          }
        });

      self.setState(newState);
    }

    if (totalWidth !== this.state.width) {

      newState = React.addons.update(this.state,
        {
          width: {
            $set: totalWidth
          }
        });

      this.setState(newState);

      // Calculate component dimensions
      var width = totalWidth - this.margin.left - this.margin.right;
      var height = this.state.height - this.margin.top - this.margin.bottom;

      this.xScale.range([0, width]).nice(d3.time.year);

      d3.select(svg)
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('x', this.margin.left)
        .attr('y', this.margin.top)
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mouseover', mouseOver.bind(this, true))
        .on('mouseout', mouseOver.bind(this, false))
        .on('click', _.partial(mouseClick, this))
        .on('mousemove', _.partial(mouseMove, this));
    }
  }

  render() {
    var asthmaControlData = this.props.data.influences.asthma_control;

    var allergyControlGridHeight = 0;

    if (this.props.active_symptom === 'asthma' && this.props.asthmaControlGridToggles.length) {
      allergyControlGridHeight = 85;
      this.state.height = 500 + allergyControlGridHeight;

    } else {
      this.state.height = 500;
    }


    var graphWidth = this.state.width - this.margin.left - this.margin.right;
    var graphHeight = this.state.height - this.margin.top - this.margin.bottom - allergyControlGridHeight;

    if (this.display_range !== this.props.display_range) {
      // Time
      this.xScale = d3.time.scale()
        .range([0, graphWidth])
        .domain(this.props.display_range);
    }

    // Get the x-coordinate of today's date on the graph
    //  This is the date after which data is rendered as a prediction
    var todayXCoord = this.xScale(this.today);

    // Use this for drawing the Symptom lines
    var symptomsYScale = d3.scale.linear()
      .range([graphHeight, 0])
      .domain([0, 4]);
    // Calculate the position of the focus
    var focusX = (this.state.focus.stickied || this.state.mouseX) - this.margin.left;

    // Get symptom display data
    var symptomDisplayData = _(this.props.data.symptoms)
      .map(function (factor, factorName) {
        return d3Util.getDisplayData(factor, factorName, focusX,
          this.xScale, symptomsYScale);
      }, this).value();

    // Flatten Factor data and add display attributes
    var factorDisplayData = _(this.props.data.factors)
      .map(function (categories) {
        return _.filter(categories, function (val) {
          return val.enabled;
        })
        .map(function (factor, factorName) {
          var yScale = d3.scale.linear()
            .range([graphHeight, 0])
            .domain(factor.domain);

          return d3Util.getDisplayData(factor, factorName, focusX, this.xScale, yScale);
        }, this);

      }, this)
      .reduce(function (aggregateArray, subArray) {
        return _.union(aggregateArray, subArray);
      });


    /**
     * TODO: Use this to get display data too, performance gains
     */
    var activeSymptom = this.props.data.symptoms[this.props.active_symptom];
    var activeSymptomData = d3Util.getDatesSubset(activeSymptom.data,
      this.props.display_range[0],
      this.props.display_range[1]);

    activeSymptom = _.find(symptomDisplayData, function (symptom) {
      return symptom.name === activeSymptom.name;
    });

    var medScoreData = _.filter(asthmaControlData,
      function (asthmaControl) {
        return asthmaControl.enabled && asthmaControl.name === 'medication_score';
      })
      .map(function (result, resultName) {
        var yScale = d3.scale.linear()
          .range([graphHeight, 0])
          .domain(result.domain);

        return d3Util.getDisplayData(result, resultName, focusX,
          this.xScale, yScale);
      }, this);

    var resultsData = _.filter(this.props.data.influences.results,
      function (result) {
        return result.enabled;
      })
      .map(function (result, resultName) {
        var yScale = d3.scale.linear()
          .range([graphHeight, 0])
          .domain(result.domain);

        return d3Util.getDisplayData(result, resultName, focusX,
          this.xScale, yScale);
      }, this);

    factorDisplayData = factorDisplayData.concat(resultsData).concat(medScoreData);

    var symptomLine;
    if (activeSymptomData) {
      symptomLine = (
        <SymptomLine
            data={activeSymptom.data}
            displayRange={this.props.display_range}
            graphHeight={graphHeight}
            xOffset={this.margin.left}
            xScale={this.xScale}
            yScale={activeSymptom.yScale}
        />
      );
    }

    var projectedClipWidth = graphWidth - todayXCoord;

    if (projectedClipWidth < 0) {
      projectedClipWidth = 0;
    }

    return (
      <svg
          className='StockChart'
          height={graphHeight + this.margin.top + this.margin.bottom + allergyControlGridHeight}
          width='100%'
      >

        <defs>
          <clipPath
              id='graph'
          >
            <rect
                height={this.state.height}
                width={graphWidth}
                x={this.margin.left}
                y={0}
            />

          </clipPath>
        </defs>

        <g
            style={{clipPath: 'url(#graph)'}}
        >
          {symptomLine}
        </g>

        <YAxis
            graphHeight={graphHeight}
            graphWidth={graphWidth}
            xOffset={this.margin.left}
            yOffset={this.margin.top}
        />

        <XAxis
            asthmaControlGridToggles={this.props.asthmaControlGridToggles}
            displayRange={this.props.display_range}
            getDatesSubset={d3Util.getDatesSubset}
            scale={this.xScale}
            symptomData={activeSymptomData}
            width={graphWidth}
            xOffset={this.margin.left}
            yOffset={this.margin.top + graphHeight}
        />

        <FactorLines
            data={factorDisplayData}
            displayRange={this.props.display_range}
            getDatesSubset={d3Util.getDatesSubset}
            xOffset={this.margin.left}
            xScale={this.xScale}
            yOffset={this.margin.top}
        />

        <FactorDots
            activeSymptom={this.props.active_symptom}
            data={factorDisplayData}
            displayRange={this.props.display_range}
            getDatesSubset={d3Util.getDatesSubset}
            mouseX={this.state.mouseX}
            stickied={this.state.focus.stickied}
            xOffset={this.margin.left}
            xScale={this.xScale}
            yOffset={this.margin.top}
        />

        <ProjectionOverlay
            activeRange={this.props.active_range}
            height={graphHeight}
            startX={todayXCoord + this.margin.left}
            startY={this.margin.top}
            width={projectedClipWidth}
        />

        <Focus
            factorData={factorDisplayData}
            height={graphHeight}
            mouseX={this.state.mouseX}
            stickied={this.state.focus.stickied}
            symptomData={symptomDisplayData}
            visible={this.state.focus.visible}
            xPos={this.margin.left}
            xScale={this.xScale}
            yPos={this.margin.top}
        />
      </svg>);
  }

}
