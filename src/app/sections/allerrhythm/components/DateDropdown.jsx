var _ = require('lodash');
var BS = ReactBootstrap;

export default class DateDropdown extends React.Component {
  render() {
    var options = {};
    options.Day = [1, 3];
    options.Week = [6, 3];
    options.Month = [29, 3];
    options['3 Months'] = [87, 3];
    options['6 Months'] = [174, 3];
    options['1 Year'] = [364, 3];

    var renderedOptions = _.map(options, function(range, title) {
      return (
        <BS.MenuItem
            key={('dropdowndate.' + title)}
            onSelect={_.partial(this.props.handleDateChange, title, range[0], range[1])}
        >
               {title}
        </BS.MenuItem>);
    }, this);

    return (
      <BS.DropdownButton
          className="selected"
          id='dropdown'
          title={this.props.active_range}
      >
              {renderedOptions}
      </BS.DropdownButton>);
  }
}
