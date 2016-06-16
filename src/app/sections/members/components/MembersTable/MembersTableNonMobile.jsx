import React from 'react';

import {
  Table,
  Column,
  Cell
} from 'fixed-data-table';

import { MEMBERS_TABLE } from '../../utils/constants.jsx';

import AddressCell from '../Cells/AddressCell.jsx';
import CheckboxCell from '../Cells/CheckboxCell.jsx';
import CheckboxHeaderCell from '../Cells/CheckboxHeaderCell.jsx';
import EmailCell from '../Cells/EmailCell.jsx';
import GenderAgeDOBCell from '../Cells/GenderAgeDOBCell.jsx';
import HomePhoneNumberCell from '../Cells/HomePhoneNumberCell.jsx';
import KnownAllergiesCell from '../Cells/KnownAllergiesCell.jsx';
import LastTestTakenHeaderCell from '../Cells/LastTestTakenHeaderCell.jsx';
import MedicalConditionsCell from '../Cells/MedicalConditionsCell.jsx';
import MedicationTypesCell from '../Cells/MedicationTypesCell.jsx';
import MobilePhoneNumberCell from '../Cells/MobilePhoneNumberCell.jsx';
import NameCell from '../Cells/NameCell.jsx';
import PharmacistCell from '../Cells/PharmacistCell.jsx';
import PhysicianCell from '../Cells/PhysicianCell.jsx';
import SeverityTestResultCell from '../Cells/SeverityTestResultCell.jsx';
import TimeStampCell from '../Cells/TimeStampCell.jsx';

export default class MembersTableNonMobile extends React.Component {

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

    return (
      <div className="container-fluid">
        <div className={'row membersTable__body'}>
          <div
              className={'col-sm-12'}
              id={MEMBERS_TABLE.TABLE_PARENT_DIV}
              style={MEMBERS_TABLE.TABLE_PARENT_DIV_STYLE}
          >
            <Table
                headerHeight={MEMBERS_TABLE.TABLE_HEADER_ROW_HEIGHT}
                height={tableDimensions.get('height')}
                rowHeight={MEMBERS_TABLE.TABLE_ROW_HEIGHT}
                rowsCount={members.count()}
                width={tableDimensions.get('width')}
            >
              <Column
                  cell={
                    <CheckboxCell
                        members={members}
                        onNotificationCheckboxChange={onNotificationCheckboxChange}
                        selectedMembers={selectedMembers}
                    />
                  }
                  fixed={true}
                  header={
                    <CheckboxHeaderCell
                        isChecked={isSelectedAllChecked}
                        members={members}
                        onNotificationCheckboxHeaderChange={onNotificationCheckboxHeaderChange}
                    />
                  }
                  width={30}
              />
              <Column
                  cell={
                    <NameCell
                        goToProfilePage={goToProfilePage}
                        members={members}
                        onSelectMemberUsername={onSelectMemberUsername}
                    />
                  }
                  fixed={true}
                  header={<Cell>{'Name (Last, First)'}</Cell>}
                  width={200}
              />
              <Column
                  cell={
                    <GenderAgeDOBCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'G/A/DOB'}</Cell>
                  }
                  width={150}
              />
              <Column
                  cell={
                    <SeverityTestResultCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Severity Test Result'}</Cell>
                  }
                  width={175}
              />
              <Column
                  cell={
                    <TimeStampCell
                        members={members}
                    />
                  }
                  header={
                    <LastTestTakenHeaderCell
                        onSortLastTestTaken={onSortLastTestTaken}
                        sortLastTestOrder={sortLastTestOrder}
                    />
                  }
                  width={150}
              />
              <Column
                  cell={
                    <AddressCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Address'}</Cell>
                  }
                  width={300}
              />
              <Column
                  cell={
                    <HomePhoneNumberCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Phone (H)'}</Cell>
                  }
                  width={175}
              />
              <Column
                  cell={
                    <MobilePhoneNumberCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Phone (C)'}</Cell>
                  }
                  width={175}
              />
              <Column
                  cell={
                    <EmailCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Email'}</Cell>
                  }
                  width={300}
              />
              <Column
                  cell={
                    <PhysicianCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Physician'}</Cell>
                  }
                  width={200}
              />
              <Column
                  cell={
                    <PharmacistCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Pharmacy'}</Cell>
                  }
                  width={200}
              />
              <Column
                  cell={
                      <KnownAllergiesCell
                          members={members}
                      />
                  }
                  header={
                    <Cell>{'Known Allergies'}</Cell>
                  }
                  width={300}
              />
              <Column
                  cell={
                    <MedicalConditionsCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Medical Conditions'}</Cell>
                  }
                  width={300}
              />
              <Column
                  cell={
                    <MedicationTypesCell
                        members={members}
                    />
                  }
                  header={
                    <Cell>{'Medication Types'}</Cell>
                  }
                  width={300}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
