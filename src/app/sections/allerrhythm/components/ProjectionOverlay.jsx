export default class ProjectionOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.offset = 20;
    this.slack = 20; // Draw lines outside clip space
  }

  render() {
    // Don't show this projection overlay if we're >= 3 months
    if (this.props.activeRange &&
      (this.props.activeRange === '3 Months') ||
      this.props.activeRange === '6 Months' ||
      this.props.activeRange === '1 Year') {
      return false;
    }

    var lines = [];

    var startX = this.props.startX - this.slack;
    var startY = this.props.startY - this.slack;

    var x1 = startX;
    var x2 = startX + this.offset;
    var y1 = startY + this.offset;
    var y2 = startY;

    while ((y1 < this.props.height) ||
    (x1 < this.props.width) ||
    (y2 < this.props.height)) {
      lines.push(
        <line
            key={'overlayLine' + x1 + ',' + y1}
            strokeWidth='6px'
            x1={x1}
            x2={x2}
            y1={y1}
            y2={y2}
        />
      );

      if (y1 < (this.props.height + startY + this.slack)) {
        y1 += this.offset;
        x2 += this.offset;

      } else if (x1 < (this.props.width + startX + this.slack)) {
        x1 += this.offset;
        x2 += this.offset;

      } else {
        x1 += this.offset;
        y2 += this.offset;
      }
    }

    return (<g className='ProjectionElements'>
      <defs>
        <clipPath id='projected'>
          <rect
              height={this.props.height}
              width={this.props.width}
              x={this.props.startX}
              y={this.props.startY}
          />
        </clipPath>
      </defs>

      <g
          className='projectionOverlay'
          clipPath='url(#projected)'
      >
        {lines}
      </g>
    </g>);
  }
}
