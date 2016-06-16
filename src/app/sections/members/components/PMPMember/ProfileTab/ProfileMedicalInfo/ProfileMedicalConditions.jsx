import { medicalConditionsList } from '../../../../utils/medicalConditionsList.jsx';
import ModalContainer from '../../../MultiSelector/ModalContainer.jsx';
import MultiSelector from '../../../MultiSelector/MultiSelector.jsx';
import Header2 from '../../../Headers/Header2.jsx';

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../../utils/constants.jsx';

class ProfileMedicalConditions extends React.Component {

  render() {
    const {
      profile,
      fields: {
        MEDICAL_CONDITIONS
      }
    } = this.props;

    let filteredList = [];
    Object.keys(profile.toJS()).forEach((key) => {
      medicalConditionsList.forEach((item) => {
        if (key.startsWith(item.id)) {
          let reduxFormMedCond = MEDICAL_CONDITIONS[item.label];
          if (reduxFormMedCond && reduxFormMedCond.touched === false) {
            reduxFormMedCond.value = true;
            reduxFormMedCond.defaultChecked = true;
          }
        }
      });
    });

    if (!filteredList.length) {
      filteredList.push('N/A');
    }

    return (
      <div className="col-xs-4 col-md-2">
        <Header2>
          <h2>{'Medical Conditions'}</h2>
        </Header2>
        <ModalContainer
            icon={"caret dropdownarrow"}
            label="Select"
        >
          <MultiSelector
              list={filteredList}
              reduxForm={MEDICAL_CONDITIONS}
          />
        </ModalContainer>
      </div>
    );
  }

}

ProfileMedicalConditions = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.MEDICAL_CONDITIONS,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileMedicalConditions);

export default ProfileMedicalConditions;
