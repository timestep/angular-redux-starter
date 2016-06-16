import ListDropDown from '../../ListDropDown/ListDropDown.jsx';
import { inchesToFeet } from '../../../utils/toolbox.jsx';

import R from 'ramda';

import {
  FEET,
  INCHES
} from '../../../utils/constants.jsx';

export default class HeightCell extends React.Component {
  render() {
    const {
      defaultValue,
      reduxForm
    } = this.props;

    const leftPad = {
      paddingLeft: '0.5rem',
      paddingRight: '1rem'
    };

    let feet = 0;
    let inches = 0;

    if (!R.isNil(defaultValue) && defaultValue !== 0) {
      let feetInches = inchesToFeet(defaultValue);
      feet = feetInches.feet;
      inches = feetInches.inches;
    }


    if (R.isNil(reduxForm.value)) {
      reduxForm.value = defaultValue;
    }

    const handleOnChangeHeight = R.curry((key, val) => {
      let newHeight = 0;
      let oldHeight = reduxForm.value;
      let feetInches = inchesToFeet(oldHeight);
      let oldFeet = feetInches.feet;
      let oldInches = feetInches.inches;

      if (key === FEET) {
        newHeight = parseInt(val, 10) * 12 + oldInches;
      } else if (key === INCHES) {
        newHeight = oldFeet * 12 + parseInt(val, 10);
      } else {
        return;
      }

      reduxForm.onChange(parseInt(newHeight, 10));
    });

    return (
      <div className="basicInfo__body--list-item">
        <span>{'HEIGHT: '}</span>
        <ListDropDown
            defaultValue={feet}
            list={R.range(0, 9)}
            onChange={handleOnChangeHeight(FEET)}
        />
        <span style={leftPad}>{'feet'}</span>
        <ListDropDown
            defaultValue={inches}
            list={R.range(0, 12)}
            onChange={handleOnChangeHeight(INCHES)}
        />
        <span style={leftPad}>{'inches'}</span>
      </div>
    );
  }
}
