import R from 'ramda';

export default class Age extends React.Component {
  render() {
    const { value } = this.props;

    if (R.isNil(value)) {
      return null;
    }

    return (
      <div className="basicInfo__body--list-item">
        {'AGE: '}
        <input
            className={'memberView__input'}
            readOnly
            value={value}
        />
      </div>
    );
  }
}
