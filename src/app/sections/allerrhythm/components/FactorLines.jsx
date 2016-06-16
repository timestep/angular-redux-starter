import FactorLine from './FactorLine.jsx';

var _ = require('lodash');

export default class FactorLines extends React.Component {
  render() {

    // don't draw lines for fev / feno
    var factorsWithLinesOnGraph = _.filter(this.props.data, function (activeFactor) {
      return activeFactor.name !== 'fev1' && activeFactor.name !== 'feno';
    });

    var lines = _.map(factorsWithLinesOnGraph, function (d) {
      return (
        <FactorLine
            displayRange={this.props.displayRange}
            factor={d}
            getDatesSubset={this.props.getDatesSubset}
            key={'factorline' + d.name}
            xOffset={this.props.xOffset}
            xScale={this.props.xScale}
            yOffset={this.props.yOffset}
        />
      );
    }, this);

    return (
            <g className='FactorLines'
                key='FactorLines'
                style={{clipPath: 'url(#graph)'}}
            >
              {lines}
            </g>
    );
  }
}
