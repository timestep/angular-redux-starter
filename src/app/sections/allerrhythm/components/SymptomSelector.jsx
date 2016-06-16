/* jshint camelcase:false */

import SymptomSelectorBtn from './SymptomSelectorBtn.jsx';
import _ from 'lodash';

const BS = ReactBootstrap;

export default class SymptomSelector extends React.Component {
  render() {
    var { profileSymptoms, symptoms } = this.props;

    var options = _.map(symptoms, function (symptom, key) {

      if (!profileSymptoms[symptom.name]) {
        return true;
      }

      var className = '';

      if (symptom.name === 'migraine' || symptom.name === 'arthritis') {
        className = 'coming-soon';
      } else if (symptom.name === this.props.active_symptom) {
        className = 'selected';
      }

      return (
        <SymptomSelectorBtn
            className={className}
            key={key}
            onClick={_.partial(this.props.handleSymptomChange, symptom.name)}
            proper_name={symptom.proper_name}
        />
      );
    }, this);

    return (
      <BS.ButtonGroup>
        {options}
      </BS.ButtonGroup>
    );
  }
}
