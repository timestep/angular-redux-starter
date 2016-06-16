import { Cell } from 'fixed-data-table';

const TITLE_CASE_STYLE = {
  textTransform: 'capitalize'
};

export default class GenderAgeDOBCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    const birthDateLabel = members.get(rowIndex).get('birthDate');
    const gender = members.get(rowIndex).get('gender') && members.get(rowIndex).get('gender');
    const genderLabel = gender && gender === 'Male' ? 'M' : 'F';
    const content = (genderLabel ? genderLabel : '') +
      (birthDateLabel ? '/' + (moment().diff(birthDateLabel, 'years')) + '/' : '') +
      birthDateLabel;

    return (
      <Cell>
        <div style={TITLE_CASE_STYLE}>
          {content}
        </div>
      </Cell>
    );
  }

}
