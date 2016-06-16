import ToggleColumn from './ToggleColumn.jsx';
import _ from 'lodash';

export default class ToggleGroups extends React.Component {

  shouldComponentUpdate(nextProps) {
    // they've switched from asthma to allergy, for example
    if (this.props.activeSymptom !== nextProps.activeSymptom) {
      return true;
    }

    var shouldRender = false;

    // Render if a switch has been flipped
    // (if any switch is now true, re-render)
    _.map(nextProps.factors, (factorType, key) => {
      _.map(factorType, (factorData, type) => {
        // a switch has been flipped, let's render.
        if (factorData.enabled !== this.props.factors[key][type].enabled) {
          shouldRender = shouldRender || true;
        }
      });
    });

    _.map(nextProps.influences, (influenceType, key) => {
      _.map(influenceType, (influenceData, type) => {
        if (influenceData.enabled !== this.props.influences[key][type].enabled) {
          shouldRender = shouldRender || true;
        }
      });
    });

    return shouldRender;
  }

  render() {
    // First 3 columns (weather / allergens / pollution)
    var factorColumns = _.map(this.props.factors, (factors, categoryName) => {
      return (
        <div className="toggleColumn"
            key={categoryName}
        >
          <ToggleColumn
              categoryName={categoryName}
              categoryPropOnState={categoryName}
              factorData={factors}
              glyphNames={this.props.glyphNames}
              key={categoryName}
              onSwitchChange={this.props.handleFactorChange}
          />
        </div>
      );
    });

    // the fourth and last column is a real pain in the ass
    // its two <ToggleColumn /> components
    // wrapped in a div with a class of 'toggleColumn'
    // for proper spacing
    // Alex 2015
    var asthmaAndResultsColumns = null;
    var asthmaColumn = null;
    var resultsColumn = null;

    // Only render the asthma column if we have to.
    if (this.props.activeSymptom === 'asthma') {
      var influences = _.reduce(this.props.influences.asthma_control, function (result, value, key) {
        if (key === 'out_of_control_days' || key === 'asthma_control_days') {
          return result;
        }
        result[key] = value;
        return result;
      }, {});

      asthmaColumn = (
        <ToggleColumn
            categoryName={'Asthma Control'}
            categoryPropOnState={'asthma_control'}
            factorData={influences}
            glyphNames={this.props.glyphNames}
            key={'asthma'}
            onSwitchChange={this.props.handleInfluenceChange}
        />
      );

      resultsColumn = (
        <ToggleColumn
            categoryName={'Results'}
            categoryPropOnState={'results'}
            factorData={this.props.influences.results}
            glyphNames={this.props.glyphNames}
            key={'results'}
            onSwitchChange={this.props.handleInfluenceChange}
        />
      );

      asthmaAndResultsColumns = (
        <div className="toggleColumn"
            key={'asthma_results'}
        >
            {asthmaColumn}
            {resultsColumn}
        </div>
      );
    }

    return (
      <div className='togglePanel'>
        {factorColumns}
        {asthmaAndResultsColumns}
      </div>
    );
  }
}
