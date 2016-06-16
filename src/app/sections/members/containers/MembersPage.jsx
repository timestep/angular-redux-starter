import { connect } from 'react-redux';
import {
  List,
  Set
} from 'immutable';

import React, {
  Component,
  PropTypes
} from 'react';

import {
  ACTIVE_SEVERITY,
  ACTIVE_SYMPTOM
} from '../utils/constants.jsx';

import { selectedDateChange } from '../reducers/active-date.jsx';

import {
  filterCheckboxHandler,
  filterToggle
} from '../reducers/active-filter.jsx';

import * as activeMembers from '../reducers/active-members.jsx';
import * as search from '../reducers/search.jsx';

import { selectSeverity } from '../reducers/active-severity.jsx';
import { selectedSymptomChange } from '../reducers/active-symptom.jsx';
import { selectMemberUsernameHandler } from '../reducers/active-member.jsx';

import { tableResize } from '../reducers/pmp-table.jsx';

import {
  PROFILE_ROUTE,
  changeRoute
} from '../reducers/router.jsx';

import { checkArrayObjInArray } from '../utils/toolbox.jsx';
import { getFilteredMembers } from '../selectors/members.jsx';
import { showNotificationHandler } from '../reducers/notifications.jsx';

import DateSelector from '../components/DateSelector/DateSelector.jsx';
import MembersFilter from '../components/MembersFilter/MembersFilter.jsx';
import MembersNavigation from '../components/MembersNavigation/MembersNavigation.jsx';
import MembersSearch from '../components/MembersSearch/MembersSearch.jsx';
import MembersTable from '../components/MembersTable/MembersTable.jsx';
import SymptomSelector from '../components/SymptomSelector/SymptomSelector.jsx';
import ViewSelector from '../components/ViewSelector/ViewSelector.jsx';

function mapStateToProps(state) {
  return {
    activeDate: state.activeDate.get('selected'),
    activeMembersSortLastTestOrder: state.activeMembers.get('sortLastTestOrder'),
    activeSeverity: state.activeSeverity.get('selected'),
    activeSymptom: state.activeSymptom.get('selected'),
    categories: state.activeSeverity.get('categories'),
    dates: state.activeDate.get('dates'),
    filteredMembers: getFilteredMembers(state),
    filterIsActive: state.activeFilter.get('filterIsActive'),
    filters: state.activeFilter.get('filters'),
    membersSearchBirthMonthSelector: state.search.get('birthMonthSelector'),
    membersSearchBirthYearSelector: state.search.get('birthYearSelector'),
    membersSearchStateSelector: state.search.get('stateSelector'),
    membersTableDimensions: state.pmpTable.get('tableDimensions'),
    numHigh: state.activeMembers.get('numHigh'),
    numLow: state.activeMembers.get('numLow'),
    numModerate: state.activeMembers.get('numModerate'),
    numOoc: state.activeMembers.get('numOoc'),
    numVeryHigh: state.activeMembers.get('numVeryHigh'),
    options: state.activeSymptom.get('options'),
    isSearchSelected: state.search.get('isSearchSelected'),
    searchedMembersSortLastTestOrder: state.search.get('sortLastTestOrder'),
    searchedMembers: state.search.get('members'),
    selectedMember: state.activeMember.get('username'),
    selectedMembers: state.activeMembers.get('selectedMembers')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiRequestMembers: () => dispatch(activeMembers.requestMembers()),
    goToProfilePage: () => dispatch(changeRoute(PROFILE_ROUTE)),
    onFilterCheckboxClick: (filter) => dispatch(filterCheckboxHandler(filter)),
    onDateChange: (dates) => dispatch(selectedDateChange(dates)),
    onFilterToggleChange: (bool) => dispatch(filterToggle(bool)),
    onMembersSearchDropdownChange: (selector, value) => dispatch(search.onDropDownChange(selector, value)),
    onMembersSearchFormReset: (form) => dispatch(search.searchReset(form)),
    onMembersSearchFormSubmit: () => dispatch(search.searchMembers()),
    onNotificationButtonClick: (type) => dispatch(showNotificationHandler(type)),
    onNotificationCheckboxChange: (username) => dispatch(activeMembers.toggleSelectedMember(username)),
    onNotificationCheckboxHeaderChange: (membersInView) => dispatch(activeMembers.toggleSelectAll(membersInView)),
    onSearchButtonClick: () => dispatch(search.selectSearch()),
    onSeverityButtonClick: (severity) => dispatch(selectSeverity(severity)),
    onSortLastTestTakenActiveMembers: () => dispatch(activeMembers.sortLastTestTaken()),
    onSortLastTestTakenSearch: () => dispatch(search.sortLastTestTaken()),
    onSymptomChange: (symptom) => dispatch(selectedSymptomChange(symptom)),
    onSelectMemberUsername: (username) => dispatch(selectMemberUsernameHandler(username)),
    onMembersTableResize: (width, height) => dispatch(tableResize(width, height))
  };
}

class MembersPage extends Component {

  componentDidMount() {
    const { apiRequestMembers } = this.props;
    apiRequestMembers();
  }

  getMembersResults() {
    const {
      filteredMembers,
      isSearchSelected,
      searchedMembers
    } = this.props;
    return isSearchSelected ? searchedMembers : filteredMembers;
  }

  onSortLastTestTaken() {
    const {
      isSearchSelected,
      onSortLastTestTakenActiveMembers,
      onSortLastTestTakenSearch
    } = this.props;

    return isSearchSelected ? onSortLastTestTakenSearch : onSortLastTestTakenActiveMembers;
  }

  sortLastTestOrder() {
    const {
      activeMembersSortLastTestOrder,
      isSearchSelected,
      searchedMembersSortLastTestOrder
    } = this.props;

    return isSearchSelected ? searchedMembersSortLastTestOrder : activeMembersSortLastTestOrder;
  }

  renderDateSelector() {
    const {
      activeDate,
      dates,
      onDateChange,
      isSearchSelected
    } = this.props;

    if (isSearchSelected) {
      return null;
    }

    return (
      <div className="row dateSelector">
        <DateSelector
            activeDate={activeDate}
            dates={dates}
            onDateChange={onDateChange}
        />
      </div>
    );
  }

  renderMembersFilter() {

    const {
      activeSeverity,
      activeSymptom,
      filterIsActive,
      filters,
      onFilterCheckboxClick,
      onFilterToggleChange
    } = this.props;

    if (!(activeSeverity === ACTIVE_SEVERITY.CATEGORIES.OUT_OF_CONTROL &&
      activeSymptom === ACTIVE_SYMPTOM.CATEGORIES.ASTHMA)) {
      return null;
    }

    return (
      <div className="row membersFilter">
        <MembersFilter
            filterIsActive={filterIsActive}
            filters={filters}
            onFilterCheckboxClick={onFilterCheckboxClick}
            onFilterToggleChange={onFilterToggleChange}
        />
      </div>
    );
  }

  renderMembersNavigation() {
    const {
      selectedMembers,
      onNotificationButtonClick
    } = this.props;

    return (
      <div className="row membersNavigation">
        <MembersNavigation
            numMembersSelected={selectedMembers.size}
            onNotificationButtonClick={onNotificationButtonClick}
        />
      </div>
    );
  }

  renderMembersSearch() {
    const {
      activeSymptom,
      isSearchSelected,
      membersSearchBirthMonthSelector,
      membersSearchBirthYearSelector,
      membersSearchStateSelector,
      onMembersSearchDropdownChange,
      onMembersSearchFormReset,
      onMembersSearchFormSubmit
    } = this.props;

    if (!isSearchSelected) {
      return null;
    }

    return (
      <div className="row membersSearch">
        <MembersSearch
            activeSymptom={activeSymptom}
            birthMonthSelector={membersSearchBirthMonthSelector}
            birthYearSelector={membersSearchBirthYearSelector}
            onDropdownChange={onMembersSearchDropdownChange}
            onFormReset={onMembersSearchFormReset}
            onFormSubmit={onMembersSearchFormSubmit}
            stateSelector={membersSearchStateSelector}
        />
      </div>
    );
  }

  renderMembersTable() {

    const {
      filteredMembers,
      goToProfilePage,
      membersTableDimensions,
      onFilterCheckboxClick,
      onFilterToggleChange,
      onMembersTableResize,
      onNotificationButtonClick,
      onNotificationCheckboxChange,
      onNotificationCheckboxHeaderChange,
      onSelectMemberUsername,
      selectedMembers
    } = this.props;

    const members = this.getMembersResults();
    const sortLastTestOrder = this.sortLastTestOrder();
    const onSortLastTestTaken = this.onSortLastTestTaken();

    // want to check the box if all the members on the page are selected
    // check all the members and see if they exist in selected members
    const isSelectedAllChecked = checkArrayObjInArray(filteredMembers, selectedMembers, 'username');

    return (
      <div className="row membersTable">
        <MembersTable
            goToProfilePage={goToProfilePage}
            isSelectedAllChecked={isSelectedAllChecked}
            members={members}
            numMembersSelected={selectedMembers.size}
            onFilterCheckboxClick={onFilterCheckboxClick}
            onFilterToggleChange={onFilterToggleChange}
            onNotificationButtonClick={onNotificationButtonClick}
            onNotificationCheckboxChange={onNotificationCheckboxChange}
            onNotificationCheckboxHeaderChange={onNotificationCheckboxHeaderChange}
            onSelectMemberUsername={onSelectMemberUsername}
            onSortLastTestTaken={onSortLastTestTaken}
            onTableResize={onMembersTableResize}
            selectedMembers={selectedMembers}
            sortLastTestOrder={sortLastTestOrder}
            tableDimensions={membersTableDimensions}
        />
      </div>
    );
  }

  renderSymptomSelector() {
    const {
      activeSymptom,
      onSymptomChange,
      options,
      isSearchSelected
    } = this.props;

    return (
      <div className="row symptomSelector">
        <SymptomSelector
            activeSymptom={activeSymptom}
            isSearchSelected={isSearchSelected}
            onSymptomChange={onSymptomChange}
            options={options}
        />
      </div>
    );
  }

  renderViewSelector() {
    const {
      activeSeverity,
      categories,
      isSearchSelected,
      numHigh,
      numLow,
      numModerate,
      numOoc,
      numVeryHigh,
      onSearchButtonClick,
      onSeverityButtonClick
    } = this.props;

    return (
      <div className="row viewSelector">
        <ViewSelector
            activeSeverity={activeSeverity}
            categories={categories}
            isSearchSelected={isSearchSelected}
            numHigh={numHigh}
            numLow={numLow}
            numModerate={numModerate}
            numOoc={numOoc}
            numVeryHigh={numVeryHigh}
            onSearchButtonClick={onSearchButtonClick}
            onSeverityButtonClick={onSeverityButtonClick}
        />
      </div>
    );
  }

  render() {

    return (
      <div className="container-fluid">

        {this.renderSymptomSelector()}

        {this.renderViewSelector()}

        {this.renderDateSelector()}

        {this.renderMembersSearch()}

        {this.renderMembersNavigation()}

        {this.renderMembersFilter()}

        {this.renderMembersTable()}

      </div>
    );
  }

}

MembersPage.propTypes = {
  activeDate: PropTypes.string.isRequired,
  activeMembersSortLastTestOrder: PropTypes.number.isRequired,
  activeSeverity: PropTypes.string.isRequired,
  activeSymptom: PropTypes.string.isRequired,
  categories: PropTypes.instanceOf(List).isRequired,
  dates: PropTypes.instanceOf(List).isRequired,
  filterIsActive: PropTypes.bool.isRequired,
  filteredMembers: PropTypes.instanceOf(List).isRequired,
  filters: PropTypes.instanceOf(List).isRequired,
  isSearchSelected: PropTypes.bool.isRequired,
  numHigh: PropTypes.number.isRequired,
  numLow: PropTypes.number.isRequired,
  numModerate: PropTypes.number.isRequired,
  numOoc: PropTypes.number.isRequired,
  numVeryHigh: PropTypes.number.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onFilterCheckboxClick: PropTypes.func.isRequired,
  onFilterToggleChange: PropTypes.func.isRequired,
  onMembersTableResize: PropTypes.func.isRequired,
  onNotificationCheckboxChange: PropTypes.func.isRequired,
  onNotificationCheckboxHeaderChange: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
  onSelectMemberUsername: PropTypes.func.isRequired,
  onSeverityButtonClick: PropTypes.func.isRequired,
  onSortLastTestTakenActiveMembers: PropTypes.func.isRequired,
  onSortLastTestTakenSearch: PropTypes.func.isRequired,
  onSymptomChange: PropTypes.func.isRequired,
  options: PropTypes.instanceOf(List).isRequired,
  searchedMembersSortLastTestOrder: PropTypes.number.isRequired,
  selectedMembers: PropTypes.instanceOf(Set).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersPage);
