import _ from 'lodash';
import d3Util from '../utils/d3.js';

export default class YAxis extends React.Component {
  render() {

    var x = this.props.xOffset - 10;
    var startY = this.props.yOffset;
    var interval = this.props.graphHeight / 4;
    var labels = {
      'VERY HIGH': d3Util.translate(x, startY + interval / 8),
      HIGH: d3Util.translate(x, startY + 11 / 8 * interval),
      MODERATE: d3Util.translate(x, startY + 17 / 8 * interval),
      LOW: d3Util.translate(x, startY + 27 / 8 * interval)
    };

    var renderedLabels = _.map(labels, function(translation, title) {
      return (
        <g key={'axisLabel' + title}
            transform={translation}
        >
          <text textAnchor="end"
              transform={"rotate(270)"}
          >
            {title}
          </text>
        </g>
      );
    });

    var x1 = this.props.xOffset;
    var x2 = this.props.xOffset + this.props.graphWidth;

    // Make top tick line
    var graphTopBorder = (
      <line className="graphTickLine graphTopBorder"
          key="graphTopBorder"
          x1={x1}
          x2={x2}
          y1={startY}
          y2={startY}
      />
    );

    // Make three horizontal ticks inside the graph
    interval = Math.round(interval);
    var lineOffsets = [interval, interval * 2, interval * 3];
    var linePositions = _.map(lineOffsets, function (offset) {
      return startY + offset;
    });
    // XAxis will server as bottom border

    // Generate the lines
    var tickLines = _.map(linePositions, function (position) {

      return (
        <line className="graphTickLine"
            key={'tickLine' + position}
            x1={x1}
            x2={x2}
            y1={position}
            y2={position}
        />
      );
    });

    return (
      <g>
        {graphTopBorder}
        {renderedLabels}
        {tickLines}
      </g>
    );
  }
}
