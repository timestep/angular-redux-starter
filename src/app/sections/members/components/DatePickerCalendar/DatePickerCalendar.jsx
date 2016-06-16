import R from 'ramda';
import DatePicker from 'react-date-picker';

class DatePickerCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus() {
    this.setState({isVisible: !this.state.isVisible});
  }

  renderCalendar(dateFormat, displayDate, onChangeFn, maxDate) {
    return (
      <DatePicker
          dateFormat={dateFormat}
          defaultViewDate={displayDate}
          maxDate={maxDate}
          onChange={onChangeFn}
      />
    );
  }

  render() {
    const {
      className,
      dateFormat,
      defaultValue,
      readOnly,
      reduxForm
    } = this.props;

    const readOnlyProp = R.isNil(readOnly) ? true : readOnly;
    const displayDate = reduxForm.value || defaultValue;
    const calendar = this.state.isVisible ?
      this.renderCalendar(dateFormat, displayDate, reduxForm.onChange, moment()) : null;

    const divStyle = {
      display: 'inline-block'
    };

    return (
      <div style={divStyle}>
        <input
            className={className}
            onClick={this.handleFocus}
            readOnly={readOnlyProp}
            value={displayDate}
        />
        {calendar}
      </div>
    );
  }
}

export default DatePickerCalendar;
