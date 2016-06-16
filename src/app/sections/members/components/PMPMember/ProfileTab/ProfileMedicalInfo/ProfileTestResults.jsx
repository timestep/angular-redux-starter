import Header2 from '../../../Headers/Header2.jsx';

import DatePickerCalendar from '../../../DatePickerCalendar/DatePickerCalendar.jsx';
import ListDropDown from '../../../ListDropDown/ListDropDown.jsx';
import R from 'ramda';
import { parseFEV1Digits } from '../../../../utils/toolbox.jsx';

const dateFormat = 'YYYY-MM-DD';

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../../utils/constants.jsx';

export default class ProfileTestResults extends React.Component {

  render() {
    const {
      fields: {
        TEST_RESULTS
      },
      profile
    } = this.props;

    const feno = profile.get('feno') || 'N/A';
    const fev1 = profile.get('fev1') || 'N/A';
    const fenoValue = feno.get('value') || 0;
    const fev1Value = fev1.get('value') || 0.00;
    const fev1ValueString = parseFEV1Digits(fev1Value);

    const fenoDate = fenoValue === 'N/A' ? 'N/A' : moment(feno.get('date')).format(dateFormat);
    const fev1Date = fev1Value === 'N/A' ? 'N/A' : moment(fev1.get('date')).format(dateFormat);

    if (!TEST_RESULTS.FEV1_VALUE.value) {
      TEST_RESULTS.FEV1_VALUE.value = fev1Value;
    }

    const fev1DecimalRange = TEST_RESULTS.FEV1_VALUE.value >= 10 ? R.range(0, 1) : R.range(0, 10);
    const handleOnChangeFEV1Value = R.curry((index, val) => {
      let newFEV1 = parseFEV1Digits(TEST_RESULTS.FEV1_VALUE.value);
      newFEV1[index] = val;
      if (index === 0 && val >= 10) {
        newFEV1[1] = 0;
        newFEV1[2] = 0;
        ReactDOM.findDOMNode(this.refs.fev1Decimal1).childNodes[0].firstChild.data = 0;
        ReactDOM.findDOMNode(this.refs.fev1Decimal2).childNodes[0].firstChild.data = 0;
      }
      newFEV1 = newFEV1[0] + '.' + newFEV1[1] + newFEV1[2];
      TEST_RESULTS.FEV1_VALUE.onChange(parseFloat(newFEV1));
    });

    return (
      <div className="col-md-6 col-xs-12">
        <div className="memberBody__section">
          <Header2>
            <h2>{'Important Test Results'}</h2>
          </Header2>
        </div>
        <div className="row">
          <span className="col-xs-2 col-sm-2">
            {'FeNO:'}
          </span>
          <span className="col-xs-5 col-sm-5">
            <ListDropDown
                defaultValue={fenoValue || 0}
                list={R.range(0, 251)}
                onChange={TEST_RESULTS.FENO_VALUE.onChange}
            />
            <span>{' ppb'}</span>
          </span>
          <span className="col-xs-5 col-sm-5">
            <DatePickerCalendar
                className={'memberView__input'}
                dateFormat={dateFormat}
                defaultValue={fenoDate}
                reduxForm={TEST_RESULTS.FENO_DATE}
            />
          </span>
        </div>
        <div className="row">
          <span className="col-xs-2 col-sm-2">
            {'FEV1:'}
          </span>
          <span className="col-xs-5 col-sm-5">
            <ListDropDown
                defaultValue={fev1ValueString[0]}
                list={R.range(0, 11)}
                onChange={handleOnChangeFEV1Value(0)}
                title={'chuckles'}
            />
            <span>{' . '}</span>
            <ListDropDown
                defaultValue={fev1ValueString[1]}
                list={fev1DecimalRange}
                onChange={handleOnChangeFEV1Value(1)}
                ref={'fev1Decimal1'}
                title={'chuckles'}
            />
            <ListDropDown
                defaultValue={fev1ValueString[2]}
                list={fev1DecimalRange}
                onChange={handleOnChangeFEV1Value(2)}
                ref={'fev1Decimal2'}
                title={'chuckles'}
            />
            <span>{' L'}</span>
          </span>
          <span className="col-xs-5 col-sm-5">
            <DatePickerCalendar
                className={'memberView__input'}
                dateFormat={dateFormat}
                defaultValue={fev1Date}
                reduxForm={TEST_RESULTS.FEV1_DATE}
            />
          </span>
        </div>
      </div>
    );
  }

}

ProfileTestResults = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.TEST_RESULTS,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileTestResults);

export default ProfileTestResults;
