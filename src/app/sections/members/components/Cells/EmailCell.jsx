import {Cell} from 'fixed-data-table';

const LOWER_CASE_STYLE = {
  textTransform: 'lowercase'
};

export default class AddressCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <Cell>
        <div style={LOWER_CASE_STYLE}>
          {members.get(rowIndex).get('email')}
        </div>
      </Cell>
    );
  }

}
