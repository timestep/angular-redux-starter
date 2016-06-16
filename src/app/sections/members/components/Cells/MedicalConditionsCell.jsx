import LongListCell from './LongListCell.jsx';

export default class MedicalConditionsCell extends React.Component {

  render() {
    const {
      members,
      rowIndex
    } = this.props;

    return (
      <LongListCell
          id={rowIndex}
          list={members.get(rowIndex).get('medicalConditions')}
      />
    );
  }
}
