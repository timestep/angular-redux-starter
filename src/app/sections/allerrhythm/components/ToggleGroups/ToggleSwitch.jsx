import Switch from '../Switch.jsx';
import _ from 'lodash';

export default class ToggleSwitch extends React.Component {

  render() {
    return (
      <div className='toggleRow'
          key={this.props.factor.name}
      >
        <label style={this.props.rowStyle}>
          <span className='titleBox'>{this.props.text}</span>
          <Switch
              color={this.props.factor.color}
              key={this.props.factor.name}
              on={this.props.factor.enabled}
              onClick={_.partial(this.props.onSwitchChange, this.props.categoryPropOnState, this.props.factor.name)}
          />
        </label>
      </div>
    );
  }

}
