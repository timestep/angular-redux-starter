import { reduxForm } from 'redux-form';
import {
  MEMBER_PAGE,
  USER_PROFILE,
  GENDER_LIST
} from '../../../utils/constants.jsx';

import DatePickerCalendar from '../../DatePickerCalendar/DatePickerCalendar.jsx';
import ListDropDown from '../../ListDropDown/ListDropDown.jsx';

import HeightCell from './Height.jsx';
import WeightCell from './Weight.jsx';
import Age from './Age.jsx';
import ProfileName from './ProfileName.jsx';

class BasicInfo extends React.Component {

  render() {
    const {
      fields: {
        BASIC_INFO
      },
      photo,
      profile
    } = this.props;

    // empty map (not loaded yet)
    if (!profile.size) {
      return null;
    }

    const profilePic = {
      backgroundImage: photo !== '' ? 'url(' + photo + ')' : 'url(' + USER_PROFILE.PROFILE_PHOTO_PLACE_HOLDER_URL + ')'
    };

    const birthDay = profile.get('birthdayDay');
    const birthMonth = profile.get('birthdayMonth');
    const birthYear = profile.get('birthdayYear');
    const dateOfBirth =
      birthMonth &&
      birthDay &&
      birthYear ? moment(birthYear + '-' + birthMonth + '-' + birthDay) : null;
    const birthDate = dateOfBirth ? dateOfBirth.format('YYYY/MM/DD') : '';
    const initialBirthAge = dateOfBirth ? moment().diff(dateOfBirth, 'years') : '';
    const age = moment().diff(BASIC_INFO.DOB.value, 'years') || initialBirthAge;
    const gender = profile.get('gender') ? profile.get('gender').toUpperCase() : 'Unknown';

    const heightInches = profile.get('height');
    const weightPounds = profile.get('weight');

    return (
      <div className="container-fluid">
        <div className="row basicInfo__body">
          <div className="col-sm-10">
            <div className="basicInfo__body--list">
              <ProfileName
                  firstName={profile.get('firstName')}
                  lastName={profile.get('lastName')}
              />
              <div className="basicInfo__body--list-item">
                {'DOB: '}
                <DatePickerCalendar
                    className={'memberView__input'}
                    dateFormat={'YYYY/MM/DD'}
                    defaultValue={birthDate}
                    reduxForm={BASIC_INFO.DOB}
                />
              </div>
              <Age value={age}/>
              <div className="basicInfo__body--list-item">
                {'GENDER: '}
                <ListDropDown
                    defaultValue={gender}
                    list={GENDER_LIST}
                    onChange={BASIC_INFO.GENDER.onChange}
                />
              </div>
              <HeightCell
                  defaultValue={heightInches}
                  reduxForm={BASIC_INFO.HEIGHT}
              />
              <WeightCell
                  defaultValue={weightPounds}
                  reduxForm={BASIC_INFO.WEIGHT}
              />
            </div>
          </div>
          <div className="col-sm-2">
            <div
                className={'profilePic'}
                style={profilePic}
            />
          </div>
        </div>
      </div>
    );
  }
}

BasicInfo = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.BASIC_INFO,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(BasicInfo);

export default BasicInfo;
