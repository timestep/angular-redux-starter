import React from 'react';
import BirthDayCell from './BirthDayCell.jsx';
import CheckboxCell from './CheckboxCell.jsx';
import CheckboxHeaderCell from './CheckboxHeaderCell.jsx';
import LastTestTakenHeader from './LastTestTakenHeaderCell.jsx';
import NameCell from './NameCell.jsx';
import {expect} from 'chai';
import {mount} from 'enzyme';
import {fromJS, Set} from 'immutable';
import sinon from 'sinon';

const rowIndex = 0;

describe('Table Cells', () => {

  describe('BirthDay Cell', () => {

    /**
     * TODO this need to be updated once we have tests
     */
    // it('renders the birth date if it exists', () => {
    //   const members = fromJS([{
    //     birthDate: '1999-12-31'
    //   }]);
    //
    //   const wrapper = mount(
    //     <BirthDayCell
    //         members={members}
    //         rowIndex={rowIndex}
    //     />
    //   );
    //
    //   const contentDiv = wrapper.find('div.public_fixedDataTableCell_cellContent');
    //   expect(contentDiv.text()).to.equal(members.get(rowIndex).get('birthDate'));
    // });

    it('renders blank if the birth date does not exist', () => {
      const members = fromJS([{}]);

      const wrapper = mount(
        <BirthDayCell
            members={members}
            rowIndex={rowIndex}
        />
      );

      const contentDiv = wrapper.find('div.public_fixedDataTableCell_cellContent');
      expect(contentDiv.text()).to.equal('');
    });

  });

  describe('Checkbox Cell', () => {

    it('renders an unclicked checkbox if the user is not selected', () => {
      const members = fromJS([{
        username: 'test@test.com'
      }]);

      const selectedMembers = fromJS(Set([]));

      const wrapper = mount(
        <CheckboxCell
            members={members}
            rowIndex={rowIndex}
            selectedMembers={selectedMembers}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('input[checked="true"]')).to.have.length(0);
    });

    it('renders a clicked checkbox if the user is selected', () => {
      const members = fromJS([{
        username: 'test@test.com'
      }]);
      const selectedMembers = fromJS(Set(['test@test.com']));

      const wrapper = mount(
        <CheckboxCell
            members={members}
            rowIndex={rowIndex}
            selectedMembers={selectedMembers}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('input[checked=""]')).to.have.length(1);
    });

    it('responds to click events', () => {
      const members = fromJS([{
        username: 'test@test.com'
      }]);
      const onNotificationCheckboxChange = sinon.spy();
      const selectedMembers = fromJS(Set([]));

      const wrapper = mount(
        <CheckboxCell
            members={members}
            onNotificationCheckboxChange={onNotificationCheckboxChange}
            rowIndex={rowIndex}
            selectedMembers={selectedMembers}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('input[checked="true"]')).to.have.length(0);
      wrapper.find('input').simulate('change', { target: { checked: true } });
      expect(onNotificationCheckboxChange.calledOnce).to.equal(true);
    });

  });

  describe('Checkbox Header Cell', () => {
    const members = fromJS([{
      username: 'test@test.com'
    }]);

    it('renders an empty checkbox if not all members are checked', () => {
      const wrapper = mount(
        <CheckboxHeaderCell
            members={members}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('input[checked="true"]')).to.have.length(0);
    });

    it('renders a checked checkbox if set to be checked', () => {
      const isChecked = true;

      const wrapper = mount(
        <CheckboxHeaderCell
            isChecked={isChecked}
            members={members}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      expect(wrapper.find('input[checked=""]')).to.have.length(1);
    });

    it('responds to click events', () => {
      const onNotificationCheckboxHeaderChange = sinon.spy();

      const wrapper = mount(
        <CheckboxHeaderCell
            members={members}
            onNotificationCheckboxHeaderChange={onNotificationCheckboxHeaderChange}
        />
      );

      expect(wrapper.find('input')).to.have.length(1);
      wrapper.find('input').simulate('change', { target: { checked: true } });
      expect(onNotificationCheckboxHeaderChange.calledOnce).to.equal(true);
    });

  });

  describe('LastTestTaken Header Cell', () => {

    const decStyle = 'glyphicon glyphicon-chevron-up';
    const ascStyle = 'glyphicon glyphicon-chevron-down';

    it('sets the sort order to descending when given the -1 prop', () => {
      const sortLastTestOrder = -1;
      const wrapper = mount(
        <LastTestTakenHeader
            sortLastTestOrder={sortLastTestOrder}
        />
      );

      expect(wrapper.find('i').hasClass(decStyle)).to.equal(true);
    });

    it('sets the sort order to ascending when given the 1 prop', () => {
      const sortLastTestOrder = 1;
      const wrapper = mount(
        <LastTestTakenHeader
            sortLastTestOrder={sortLastTestOrder}
        />
      );

      expect(wrapper.find('i').hasClass(ascStyle)).to.equal(true);
    });

    it('responds to click events', () => {
      const sortLastTestOrder = 'asc';
      const onSortLastTestTaken = sinon.spy();
      const targetDivClass = 'fixedDataTableCellLayout_wrap1'; // the <Cell /> component

      const wrapper = mount(
        <LastTestTakenHeader
            onSortLastTestTaken={onSortLastTestTaken}
            sortLastTestOrder={sortLastTestOrder}
        />
      );

      wrapper.find('div.' + targetDivClass).simulate('click');
      expect(onSortLastTestTaken.calledOnce).to.equal(true);
    });

  });

  describe('Name Cell', () => {

    it('renders the correct name when provided', () => {
      const members = fromJS([{
        firstName: 'bob',
        lastName: 'jane'
      }]);

      const wrapper = mount(
        <NameCell
            members={members}
            rowIndex={rowIndex}
        />
      );

      const expectedName = members.get(rowIndex).get('lastName') + ', ' + members.get(rowIndex).get('firstName');
      expect(wrapper.find('span').text()).to.equal(expectedName);
    });

    it('renders a N\/A when not given a name', () => {
      const members = fromJS([{
        firstName: null,
        lastName: ''
      }]);

      const wrapper = mount(
        <NameCell
            members={members}
            rowIndex={rowIndex}
        />
      );

      const expectedName = 'N/A';
      expect(wrapper.find('span').text()).to.equal(expectedName);
    });

    it('responds to click events', () => {
      const members = fromJS([{}]);
      const onSelectMemberUsername = sinon.spy();
      const goToProfilePage = sinon.spy();
      const targetDivClass = 'fixedDataTableCellLayout_wrap1'; // the <Cell /> component

      const wrapper = mount(
        <NameCell
            goToProfilePage={goToProfilePage}
            members={members}
            onSelectMemberUsername={onSelectMemberUsername}
            rowIndex={rowIndex}
        />
      );

      wrapper.find('div.' + targetDivClass).simulate('click');
      expect(onSelectMemberUsername.calledOnce).to.equal(true);
      expect(goToProfilePage.calledOnce).to.equal(true);
    });

  });

  /**
   * TODO this need to be updated once we have tests
   */
  // describe('TimeStamp Cell', () => {
  //   // Date/Time stamp format is done via server side
  //   it('renders the timestamp in YYYY-MM-DD format', () => {
  //     const members = fromJS([{
  //       createdTimestamp: '1999-12-30'
  //     }]);
  //
  //     const wrapper = mount(
  //       <TimeStampCell
  //           members={members}
  //           rowIndex={rowIndex}
  //       />
  //     );
  //
  //     const contentDiv = wrapper.find('div.public_fixedDataTableCell_cellContent').text();
  //     expect(contentDiv).to.equal('1999-12-30');
  //   });
  //
  // });
});
