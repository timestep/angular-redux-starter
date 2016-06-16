import ToggleSwitch from './ToggleSwitch.jsx';
import _ from 'lodash';

export default class ToggleSwitchList extends React.Component {

  render() {
    var switches = _.map(this.props.factorData, (factor) => {
      var rowStyle = {
        width: '100%'
      };

      if (factor.enabled) {
        rowStyle.color = factor.color;
      }

      var text = [];
      text.push(<span className='title'>{factor.proper_name}</span>);
      if (factor.subtext) {
        text.push(<br />);
        text.push(<span className='subtitle'>{factor.subtext}</span>);
      }

      return (
        <ToggleSwitch
            categoryPropOnState={this.props.categoryPropOnState}
            factor={factor}
            key={factor.name}
            onSwitchChange={this.props.onSwitchChange}
            rowStyle={rowStyle}
            text={text}
        />
      );
    });

    return (
      <div>
        {switches}
      </div>
    );
  }

}
