import d3Util from '../utils/d3.js';

export default class Focus extends React.Component {
  componentDidMount() {
    var svg = d3.select(ReactDOM.findDOMNode(this));

    svg.append('line')
      .attr('class', 'focus');

    svg.append('g')
      .attr('class', 'focuspoints')
      .style('clip-path', 'url(#graph)');

    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {

    let factorData = _.filter(this.props.factorData, (activeFactor) => {
      return activeFactor.name !== 'fev1' && activeFactor.name !== 'feno';
    });

    var svg = d3.select(ReactDOM.findDOMNode(this));

    var x = this.props.mouseX;
    if (this.props.stickied) {
      x = this.props.stickied;
    }

    svg.select('g.focuspoints')
      .selectAll('*')
      .remove();

    var xPos = this.props.xPos;
    var yPos = this.props.yPos;
    var focusPoints = svg.select('g.focuspoints')
      .selectAll('g')
      .data(factorData)
      .enter();

    var valueCacheY = [];
    var valueCacheDY = [];

    /**
     * TODO: Group these
     */
    focusPoints.append('circle')
      .attr('cx', function (d) {
        return (d.xScale(d.activePoint.date) + xPos);
      })
      .attr('cy', function (d) {
        return (d.yScale(d.activePoint.value) + yPos);
      })
      .style('fill', function (d) {
        return d.color;
      })
      .attr('r', 5);

    focusPoints.append('rect')
      .attr('x', function (d) {
        return (d.xScale(d.activePoint.date) + xPos + 5);
      })
      .attr('y', function (d) {
        var value = (d.yScale(d.activePoint.value) + yPos - 10);
        value = d3Util.collisionFilter(valueCacheY, value, 25);
        return value;
      })
      .attr('width', 50)
      .attr('height', 20)
      .style('fill', function (d) {
        return d.color;
      });


    focusPoints.append('text')
      .attr('dx', function (d) {
        return (d.xScale(d.activePoint.date) + xPos + 7);
      })
      .attr('dy', function (d) {
        var value = (d.yScale(d.activePoint.value) + yPos + 4);
        value = d3Util.collisionFilter(valueCacheDY, value, 25);
        return value;
      })
      .text(function (d) {
        var out = '';
        if (d.activePoint) {

          var value;
          if (d.name &&
            (d.name === 'fev1' || d.name === 'precipitation')) {
            value = d.activePoint.value.toFixed(2);
          }
          else {
            // TODO - we need to massage the FENO Data to if the 'low-moderate-high-veryHigh' data range - _value is a temporary value
            value = Math.round(d.activePoint._value || d.activePoint.value);
          }

          out += value + ' ' + d.units;
        }
        return out;
      })
      .each(function (d) {
        d.width = this.getBBox().width;
      })
      .style('fill', 'white');

    svg.select('g.focuspoints')
      .selectAll('rect')
      .attr('width', function (d) {
        return (d.width + 5);
      });

    var focusLine = svg.select('line.focus')
      .style('fill', 'none')
      .attr('x1', x)
      .attr('x2', x)
      .attr('y1', this.props.yPos)
      .attr('y2', this.props.yPos + this.props.height);

    if (!this.props.stickied) {
      focusLine.style('stroke-dasharray', '5px, 5px');
    } else {
      focusLine.style('stroke-dasharray', null);
    }

    if (this.props.visible || this.props.stickied) {
      svg.style('visibility', 'visible');
    } else {
      svg.style('visibility', 'hidden');
    }
  }

  render() {
    return (<g></g>);
  }

}
