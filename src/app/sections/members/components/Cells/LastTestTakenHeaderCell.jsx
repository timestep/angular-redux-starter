import { Cell } from 'fixed-data-table';
import 'immutable';
import { SORT_ORDER } from '../../utils/constants.jsx';

const clickable = {
  cursor: 'pointer'
};

export default class LastTestTakenHeaderCell extends React.Component {

  render() {
    const { onSortLastTestTaken, sortLastTestOrder } = this.props;
    const sortOrder = sortLastTestOrder === SORT_ORDER.DESCENDING ?
    'glyphicon glyphicon-chevron-up' : 'glyphicon glyphicon-chevron-down';

    return (
      <Cell
          onClick={()=> onSortLastTestTaken()}
          style={clickable}
      >
        {'Last Test Taken '}<i className={sortOrder}></i>
      </Cell>
    );
  }

}
