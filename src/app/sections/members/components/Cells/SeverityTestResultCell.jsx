import {Cell} from 'fixed-data-table';

const TITLE_CASE_STYLE = {
  textTransform: 'capitalize'
};

export default class SeverityResultCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <Cell>
        <div style={TITLE_CASE_STYLE}>
          {members.get(rowIndex).get('range')}
        </div>
      </Cell>
    );
  }
}
