import {Cell} from 'fixed-data-table';

export default class TimeStampCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <Cell>
        {members.get(rowIndex).get('createdTimestamp')}
      </Cell>
    );
  }

}
