import React from 'react';
import PhoneNumberCell from './PhoneNumberCell.jsx';

export default class HomePhoneNumberCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <PhoneNumberCell
          phoneNumber={members.get(rowIndex).get('phone')}
      />
    );
  }
}
