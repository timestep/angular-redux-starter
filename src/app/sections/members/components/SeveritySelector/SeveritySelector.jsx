import { ACTIVE_SEVERITY } from '../../utils/constants.jsx';

const BS = ReactBootstrap;
const defaultTab = {
  borderRadius: '0',
  color: '#5A9EEE',
  border: 'none',
  outline: 'none',
  position: 'relative',
  textTransform: 'uppercase'
};

const activeTab = {
  backgroundColor: '#5A9EEE',
  color: '#fff',
  borderRadius: '0',
  border: 'none',
  outline: 'none',
  position: 'relative',
  textTransform: 'uppercase'
};

export default class SeveritySelector extends React.Component {

  render() {
    const {
      activeSeverity,
      categories,
      numHigh,
      numLow,
      numModerate,
      numOoc,
      numVeryHigh,
      onSeverityButtonClick
    } = this.props;

    const severityLabels = categories.map((severity => {
      let numRows = 0;

      if (severity === ACTIVE_SEVERITY.CATEGORIES.OUT_OF_CONTROL) {
        numRows = numOoc;
      } else if (severity === ACTIVE_SEVERITY.CATEGORIES.VERY_HIGH) {
        numRows = numVeryHigh;
      } else if (severity === ACTIVE_SEVERITY.CATEGORIES.HIGH) {
        numRows = numHigh;
      } else if (severity === ACTIVE_SEVERITY.CATEGORIES.MODERATE) {
        numRows = numModerate;
      } else if (severity === ACTIVE_SEVERITY.CATEGORIES.LOW) {
        numRows = numLow;
      } else { // all
        numRows = numVeryHigh + numHigh + numModerate + numLow;
      }

      return severity + ' (' + numRows + ')';
    }));


    const severityOptions = severityLabels.map((label) => {

      const severityType = label.replace(/( \([0-9]+\))$/g, '');
      const selected = activeSeverity === severityType ? 'active' : '';

      return (
        <li
            className="nav nav-tabs"
            key={label}
        >
          <a onClick={() => onSeverityButtonClick(severityType)}
              style={selected ? activeTab : defaultTab}
          >
            {label}
          </a>
        </li>
      );
    });

    const selectorOptions = severityLabels.map((label) => {

      const severityType = label.replace(/( \([0-9]+\))$/g, '');
      const selected = activeSeverity === severityType ? 'active' : '';
      const spanStyle = {
        textTransform: 'uppercase'
      };

      return (
        <BS.MenuItem
            className={selected ? 'active' : ''}
            key={label}
            onClick={() => onSeverityButtonClick(severityType)}
        >
          <span
              style = {spanStyle}
          >
            {label}
          </span>
        </BS.MenuItem>
      );
    });

    const activeLabel = severityLabels.filter((label) => activeSeverity === label.replace(/( \([0-9]+\))$/g, ''));

    return (
      <div>
        <span className="viewSelector__nav--dropdown">
          <BS.DropdownButton
              id={'severitySelector'}
              title={activeLabel}
          >
            {selectorOptions}
          </BS.DropdownButton>
        </span>

        <ul className="nav nav-tabs viewSelector__nav--tabs">
          {severityOptions}
        </ul>
      </div>
    );
  }
}
