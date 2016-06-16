import { medicationTypesList } from '../../../../utils/medicationTypesList.jsx';
import ModalContainer from '../../../MultiSelector/ModalContainer.jsx';
import MultiSelector from '../../../MultiSelector/MultiSelector.jsx';
import Header2 from '../../../Headers/Header2.jsx';

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../../utils/constants.jsx';

class ProfileCurrentMedications extends React.Component {

  render() {
    const {
      profile,
      fields: {
        MEDICATION_TYPES
      }
    } = this.props;

    Object.keys(profile.toJS()).forEach((key) => {
      return [].concat(...medicationTypesList.map(meds=> meds.list)).forEach((item) => {
        if (key.startsWith(item.id)) {
          let reduxFormMedCond = MEDICATION_TYPES[item.label];
          if (reduxFormMedCond && reduxFormMedCond.touched === false) {
            reduxFormMedCond.value = true;
            reduxFormMedCond.defaultChecked = true;
          }
        }
      });
    });

    return (
      <div className="col-xs-4 col-md-2">
        <Header2>
          <h2>{'Current Medications'}</h2>
        </Header2>
        <ModalContainer
            icon={"caret dropdownarrow"}
            label="Select"
        >
          <MultiSelector
              reduxForm={MEDICATION_TYPES}
          />
        </ModalContainer>
      </div>
    );
  }

}

ProfileCurrentMedications = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.MEDICATION_TYPES,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileCurrentMedications);

export default ProfileCurrentMedications;
