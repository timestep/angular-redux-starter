import React from 'react';
import CheckBox from '../CheckBox/CheckBox.jsx';
import MultiColumnTable from '../MultiColumnTable/MultiColumnTable.jsx';

export default class FilterItems extends React.Component {

  renderColumnItem(item) {
    const { onFilterCheckboxClick } = this.props;
    return (
      <div key={'MEMBERS_FILTERS-' + item.id}>
        <CheckBox
            id={item.id}
            label={item.label}
            onClickHandler={() => onFilterCheckboxClick(item.id)}
        />
      </div>
    );
  }

  render() {
    const { filters } = this.props;
    return (
      <div className="row">
        <MultiColumnTable
            id={'MEMBERS_FILTERS'}
            list={filters.toJS()}
            numberOfColumns={3}
            renderColumnItem={(item) => this.renderColumnItem(item)}
        />
      </div>
    );
  }
}
