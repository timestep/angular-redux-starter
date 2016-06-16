import React from 'react';

const KAGEN_GRAY = '#808180';
const inactive = {
  color: KAGEN_GRAY,
  cursor: 'default',
  borderColor: KAGEN_GRAY,
  pointerEvents: 'none',
  opacity: '0.4'
};

export default class SymptomSelector extends React.Component {

  render() {
    const {
      activeSymptom,
      isSearchSelected,
      onSymptomChange,
      options
    } = this.props;

    let inactiveOptions;
    let activeOptions;

    if (isSearchSelected) {
      inactiveOptions = options;
      activeOptions = [];
    } else {
      inactiveOptions = options.filter((opt) => {
        return opt === 'Migraine' || opt === 'Arthritis';
      });
      activeOptions = options.filter((opt) => {
        return opt !== 'Migraine' && opt !== 'Arthritis';
      });
    }

    const symptomOptions = activeOptions.map((opt) => {
      const selected = activeSymptom === opt ? 'active' : '';

      return (
        <li key={opt}>
          <a className={selected}
              onClick={() => onSymptomChange(opt)}
          >
            {opt}
          </a>
        </li>
      );
    });

    const inactiveSymptomOptions = inactiveOptions.map((opt) => {
      return (
        <li key={opt}>
          <a style={inactive}>
            {opt}
          </a>
        </li>
      );
    });

    return (
      <div className="container-fluid">
        <div className="row symptomSelector__nav">
          <div className="col-sm-12">
            <ul className="display__flex display__justify--center list__bullet--none">
              {symptomOptions}
              {inactiveSymptomOptions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
