import {Cell} from 'fixed-data-table';
import 'immutable';

const center = {
  margin: '0 auto'
};

export default class CheckboxHeaderCell extends React.Component {

  render() {
    const {
      onNotificationCheckboxHeaderChange,
      members,
      isChecked
    } = this.props;

    return (
      <Cell style={center}>
          <input
              checked={isChecked}
              onChange={() => onNotificationCheckboxHeaderChange(members)}
              type="checkbox"
          />
      </Cell>
    );
  }

}
