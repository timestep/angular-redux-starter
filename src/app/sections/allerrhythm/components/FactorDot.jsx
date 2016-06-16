/* globals d3, React */

export default class FactorDot extends React.Component {

  componentDidMount() {
    this.drawCircles();
  }

  componentDidUpdate() {
    var dot = d3.select(ReactDOM.findDOMNode(this));
    dot.selectAll('g').remove();
    this.drawCircles();
  }

  drawCircles() {
    var dot = d3.select(ReactDOM.findDOMNode(this));
    var stickied = this.props.stickied;
    var mouseX = this.props.mouseX;
    var factor = this.props.factor;
    var xOffset = this.props.xOffset;
    var yOffset = this.props.yOffset;
    var xScale = this.props.xScale;
    var activeData = this.props.getDatesSubset(factor.data,
                                               this.props.displayRange[0],
                                               this.props.displayRange[1]);
    var focusPoints;

    dot.append('g')
      .attr('class', 'actualFactors');

    focusPoints = dot.select('g')
      .selectAll('*')
      .data(activeData)
      .enter();

    focusPoints.append('circle')
      .attr('cx', function(d) {
        return (xScale(d.date) + xOffset);
      })
      .attr('cy', function(d) {
        return (factor.yScale(d.value) + yOffset);
      })
      .attr('r', 5)
      .attr('stroke', factor.color)
      .attr('fill', factor.color);

    focusPoints.append('rect')
      .attr('class', function (d) {
        return 'label-' + d.date.getTime();
      })
      .attr('x', function (d) {
        return (xScale(d.date) + xOffset + 5);
      })
      .attr('y', function (d) {
        return (factor.yScale(d.value) + yOffset - 10);
      })
      .attr('width', 50)
      .attr('height', 20)
      .style('fill', function () {
        return factor.color;
      })
      .style('visibility', 'hidden');

    focusPoints.append('text')
      .attr('class', function (d) {
        return 'label-' + d.date.getTime();
      })
      .attr('dx', function (d) {
        return (xScale(d.date) + xOffset + 7);
      })
      .attr('dy', function (d) {
        return (factor.yScale(d.value) + yOffset + 4);
      })
      .text(function (d) {
        var value;
        if (factor.name &&
          (factor.name === 'fev1' || factor.name === 'precipitation')) {
          value = d.value.toFixed(2);
        }
        else {
          /**
           * TODO - we need to massage the FENO Data to if the 'low-moderate-high-veryHigh'
           * data range - _value is a temporary value
           */
          value = Math.round(d._value || d.value);
        }
        return value + ' ' + d.units;
      })
      .each(function (d) {
        d.width = this.getBBox().width;
      })
      .style('fill', 'white')
      .style('visibility', 'hidden');

    dot.select('g.actualFactors')
      .selectAll('rect')
      .attr('width', function (d) {
        return (d.width + 5);
      });

    dot.selectAll('g.actualFactors circle')
      .filter(function(d) {

        var rect = this.getBoundingClientRect();
        if (rect &&
          (!stickied && mouseX >= xScale(d.date) + xOffset - (rect.width / 2) &&
            mouseX <= xScale(d.date) + xOffset + (rect.width / 2)) ||
          (stickied >= xScale(d.date) + xOffset - (rect.width / 2) &&
            stickied <= xScale(d.date) + xOffset + (rect.width) / 2)) {
          dot.selectAll('g.actualFactors .label-' + d.date.getTime())
            .style('visibility', 'visible');
        }
        else {
          dot.selectAll('g.actualFactors .label-' + d.date.getTime())
            .style('visibility', 'hidden');
        }
      });

  }

  render() {
    return (
            <g>
              <circle
                  className='actualFactors'
                  fill='none'
                  key={this.props.factor.name}
                  stroke={this.props.factor.color}
              />
            </g>
    );
  }
}
