import {Cell} from 'fixed-data-table';
import 'immutable';

const center = {
  margin: '0 auto'
};

export default class CheckboxCell extends React.Component {

  render() {
    const {
      members,
      onNotificationCheckboxChange,
      rowIndex,
      selectedMembers
    } = this.props;

    const isChecked = selectedMembers.has(members.get(rowIndex).get('username'));

    return (
      <Cell style={center}>
          <input
              checked={isChecked}
              onChange={() =>
                onNotificationCheckboxChange(members.get(rowIndex).get('username'))
              }
              type="checkbox"
          />
      </Cell>
    );
  }

}
