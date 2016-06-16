import { _ } from 'lodash';
import React, { PropTypes } from 'react';
import { Map } from 'immutable';
import { MEMBERS_TABLE } from '../../utils/constants.jsx';
import { onMobileDevice } from '../../utils/onMobileDevice.jsx';
import MembersTableMobile from './MembersTableMobile.jsx';
import MembersTableNonMobile from './MembersTableNonMobile.jsx';

export default class MembersTable extends React.Component {

  componentDidMount() {
    this.onTableResizeHandler();
    window.addEventListener('resize', () => this.onTableResizeHandler());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.members.count() !== this.props.members.count()) {
      this.onTableResizeHandler();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.onTableResizeHandler());
  }

  onTableResizeHandler() {
    _.debounce(
      (() => {

        const {
          members,
          onTableResize
        } = this.props;

        const divElement = document.getElementById(MEMBERS_TABLE.TABLE_PARENT_DIV);
        if (!divElement) {
          return;
        }

        onTableResize(
          divElement.clientWidth,
          (members.count() * MEMBERS_TABLE.TABLE_ROW_HEIGHT) + MEMBERS_TABLE.TABLE_HEADER_ROW_HEIGHT + 20
        );
      }),
      100)();
  }

  render() {

    const {
      goToProfilePage,
      isSelectedAllChecked,
      members,
      onNotificationCheckboxChange,
      onNotificationCheckboxHeaderChange,
      onSelectMemberUsername,
      onSortLastTestTaken,
      selectedMembers,
      sortLastTestOrder,
      tableDimensions
    } = this.props;

    const userIsOnMobile = onMobileDevice();

    if (userIsOnMobile) {
      return (
        <MembersTableMobile
            goToProfilePage={goToProfilePage}
            isSelectedAllChecked={isSelectedAllChecked}
            members={members}
            onNotificationCheckboxChange={onNotificationCheckboxChange}
            onNotificationCheckboxHeaderChange={onNotificationCheckboxHeaderChange}
            onSelectMemberUsername={onSelectMemberUsername}
            onSortLastTestTaken={onSortLastTestTaken}
            selectedMembers={selectedMembers}
            sortLastTestOrder={sortLastTestOrder}
            tableDimensions={tableDimensions}
        />
      );
    }

    return (
      <MembersTableNonMobile
          goToProfilePage={goToProfilePage}
          isSelectedAllChecked={isSelectedAllChecked}
          members={members}
          onNotificationCheckboxChange={onNotificationCheckboxChange}
          onNotificationCheckboxHeaderChange={onNotificationCheckboxHeaderChange}
          onSelectMemberUsername={onSelectMemberUsername}
          onSortLastTestTaken={onSortLastTestTaken}
          selectedMembers={selectedMembers}
          sortLastTestOrder={sortLastTestOrder}
          tableDimensions={tableDimensions}
      />
    );
  }
}

MembersTable.propTypes = {
  onTableResize: PropTypes.func.isRequired,
  tableDimensions: PropTypes.instanceOf(Map).isRequired
};
