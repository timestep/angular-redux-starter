var _ = require('lodash');

export default class FactorLine extends React.Component {

  // Animate the line into the view, by drawing a line across the average
  // then animate to its normal form
  componentDidMount() {
    var line = d3.select(ReactDOM.findDOMNode(this));

    var factor = this.props.factor;
    var xOffset = this.props.xOffset;
    var yOffset = this.props.yOffset;
    var xScale = this.props.xScale;

    d3.svg.line()
        .x(function(d) {
          return (xScale(d.date) + xOffset);
        })
        .y(function(d) {
          return factor.yScale(d.value) + yOffset;
        });

    var activeData = this.props.getDatesSubset(factor.data,
                                               this.props.displayRange[0],
                                               this.props.displayRange[1]);

    var average = _(activeData).map(function(d) {
      return d.value;
    }).reduce(function (a, b) {
      return a + b;
    }) / activeData.length;

    var leftPath = d3.svg.line()
        .x(-1)
        .y(function() {
          return factor.yScale(average) + yOffset;
        });

    line.attr('d', leftPath(activeData));


    var startPath = d3.svg.line()
        .x(function(d) {
          return (xScale(d.date) + xOffset);
        })
        .y(function() {
          return factor.yScale(average) + yOffset;
        });


    line.transition().duration(500).attr('d', startPath(activeData));

    var endPath = d3.svg.line()
        .x(function(d) {
          return (xScale(d.date) + xOffset);
        })
        .y(function(d) {
          return factor.yScale(d.value) + yOffset;
        });

    line.transition().delay(500).duration(500).attr('d', endPath(activeData));
  }

  // On line updates, force a quick animation
  // to redraw all the points in the timeframe
  componentDidUpdate() {
    var line = d3.select(ReactDOM.findDOMNode(this));

    var factor = this.props.factor;

    var xOffset = this.props.xOffset;
    var yOffset = this.props.yOffset;
    var xScale = this.props.xScale;

    var myPath = d3.svg.line()
          .x(function(d) {
            return (xScale(d.date) + xOffset);
          })
          .y(function(d) {
            return factor.yScale(d.value) + yOffset;
          });

    var activeData = this.props.getDatesSubset(factor.data,
                                               this.props.displayRange[0],
                                               this.props.displayRange[1]);

    line.transition().duration(100).ease('elastic').attr('d', myPath(activeData));
  }

  render() {
    return (
      <path
          className="actualFactors"
          fill="none"
          key={this.props.factor.name}
          stroke={this.props.factor.color}
      />);
  }

}
