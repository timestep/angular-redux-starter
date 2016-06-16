import {Cell} from 'fixed-data-table';

const userNameStyle = {
  textDecoration: 'underline',
  cursor: 'pointer'
};

export default class NameCell extends React.Component {

  render() {
    const {
      members,
      rowIndex,
      onSelectMemberUsername,
      goToProfilePage
    } = this.props;

    let fullName = 'N/A';

    // They have set their name in their profile (at least a first name or a last name)
    // (because of our backend, these can either be null or empty string)
    if ((members.get(rowIndex).get('lastName') !== null && members.get(rowIndex).get('lastName') !== '')
      || (members.get(rowIndex).get('firstName') !== null && members.get(rowIndex).get('firstName') !== '')) {
      fullName = [members.get(rowIndex).get('lastName'), ', ', members.get(rowIndex).get('firstName')].join('');
    }

    return (
      <Cell
          onClick={
            () => {
              onSelectMemberUsername(members.get(rowIndex).get('username'));
              goToProfilePage();
            }
          }
      >
        <span style={userNameStyle}>{fullName}</span>
      </Cell>
    );
  }

}
