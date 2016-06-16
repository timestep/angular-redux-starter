/* globals React */
import FactorDot from './FactorDot.jsx';

var _ = require('lodash');

export default class FactorDots extends React.Component {
  render() {
    if (this.props.activeSymptom === 'allergy') {
      return null;
    }

    // pluck fev1 and feno from our list of factors
    let factorsWithDotsOnGraph = _.filter(this.props.data, (activeFactor) => {
      return activeFactor.name === 'fev1' || activeFactor.name === 'feno';
    });
    // convert them into dots
    let circles = _.map(factorsWithDotsOnGraph, (d) => {
      return (
        <FactorDot
            displayRange={this.props.displayRange}
            factor={d}
            getDatesSubset={this.props.getDatesSubset}
            key={'factorline' + d.name}
            mouseX={this.props.mouseX}
            stickied={this.props.stickied}
            xOffset={this.props.xOffset}
            xScale={this.props.xScale}
            yOffset={this.props.yOffset}
        />
      );
    }, this);

    return (
            <g className='FactorLines'
                key='FactorDots'
                style={{clipPath: 'url(#graph)'}}
            >
              {circles}
            </g>
    );
  }
}
