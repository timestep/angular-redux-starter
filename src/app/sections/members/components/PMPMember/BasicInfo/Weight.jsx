export default class WeightCell extends React.Component {
  render() {
    const {
      defaultValue,
      reduxForm
    } = this.props;

    const leftPad = {
      paddingLeft: '0.5rem',
      paddingRight: '1rem'
    };

    return (
      <div className="basicInfo__body--list-item">
        <span>{'WEIGHT: '}</span>
        <input
            className={'memberView__input'}
            placeholder={'WEIGHT'}
            value={defaultValue}
            {...reduxForm}
        />
        <span style={leftPad}>{'lbs'}</span>
      </div>
    );
  }
}
