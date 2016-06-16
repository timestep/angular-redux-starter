import React from 'react';
import FilterHeader from './FilterHeader.jsx';
import FilterItems from './FilterItems.jsx';

export default class MembersFilter extends React.Component {
  render() {
    const {
      filterIsActive,
      filters,
      onFilterToggleChange,
      onFilterCheckboxClick
    } = this.props;

    const hide = { display: 'none' };
    const filterStyle = filterIsActive ? {} : hide;

    return (
      <div className="container-fluid">
        <div className="row membersFilter__body">
          <div className="container-fluid">
            <FilterHeader
                filterIsActive={filterIsActive}
                onFilterToggleChange={onFilterToggleChange}
            />
            <div style={filterStyle}>
              <FilterItems
                  filters={filters}
                  onFilterCheckboxClick={onFilterCheckboxClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
