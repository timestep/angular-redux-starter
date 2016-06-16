import R from 'ramda';

export default class ProfileName extends React.Component {
  render() {
    const {
      firstName,
      lastName
    } = this.props;

    if (R.isNil(firstName) || R.isNil(lastName)) {
      return null;
    }

    const renderName = firstName + ', ' + lastName;

    return (
      <div className="basicInfo__body--list-item basic_info_name">
        {renderName}
      </div>
    );
  }
}
