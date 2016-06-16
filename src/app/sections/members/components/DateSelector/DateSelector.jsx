const BS = ReactBootstrap;

export default class DateSelector extends React.Component {

  render() {
    const {activeDate, onDateChange, dates} = this.props;

    const dateOptions = dates.map((opt) => {
      const selected = activeDate === opt ? 'active' : '';

      return (
        <BS.MenuItem
            className={selected}
            key={opt}
            onClick={() => onDateChange(opt)}
        >
          {opt}
        </BS.MenuItem>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 dateSelector__nav">
            <BS.DropdownButton
                className="glyphicon glyphicon-calendar"
                id={'dateSelector'}
                title={' ' + activeDate}
            >
              {dateOptions}
            </BS.DropdownButton>
          </div>
        </div>
      </div>
    );
  }
}
