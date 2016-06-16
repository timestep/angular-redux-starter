import PhoneNumberCell from './PhoneNumberCell.jsx';

export default class MobilePhoneNumberCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <PhoneNumberCell
          phoneNumber={members.get(rowIndex).get('cell')}
      />
    );
  }
}
