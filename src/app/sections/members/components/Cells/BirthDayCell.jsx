import {Cell} from 'fixed-data-table';

export default class BirthDayCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;


    const birthDate = members.get(rowIndex).get('birthDate');
    const content = birthDate ? (moment().diff(birthDate, 'years') + ', ' + birthDate) : '';
    return (
      <Cell>
        {content}
      </Cell>
    );
  }

}
