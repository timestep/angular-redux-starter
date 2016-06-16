export default class SymptomLine extends React.Component {

  componentDidUpdate() {
    var svg = d3.select(ReactDOM.findDOMNode(this));
    var path = svg.select('path');

    var xScale = this.props.xScale;
    var yScale = this.props.yScale;
    var xOffset = this.props.xOffset;
    var area = d3.svg.area()
      .x(function (d) {
        return (xScale(d.date) + xOffset);
      })
      .y0(this.props.graphHeight)
      .y1(function (d) {
        return yScale(d.value);
      })
      .interpolate('basis');

    path.transition().duration(1000).ease('elastic').attr('d', area(this.props.data));

  }

  render() {
    var path = d3.svg.line()
      .x(function (d) {
        return this.props.xScale(d.date);
      })
      .y(function (d) {
        return this.props.yScale(d.value);
      })
      .interpolate('basis');

    return (
      <g
          className='SymptomElements'
          key='SymptomLine'
      >
        <defs>
          <linearGradient
              id='symptomGradient'
              spreadMethod='pad'
              x1='0%'
              x2='0%'
              y1='0%'
              y2='100%'
          >
            <stop
                offset='0%'
                stopColor='#959393'
                stopOpacity='1'
            />
            <stop
                offset='100%'
                stopColor='#C2C3C1'
                stopOpacity='1'
            />

          </linearGradient>
        </defs>

        <path
            className='symptomLine'
            fill='url(#symptomGradient)'
            id='symptomLine'
            key={'symptomLine'}
        />
      </g>
    );
  }
}
