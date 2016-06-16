import { knownAllergiesList } from '../../../../utils/knownAllergiesList.jsx';
import ModalContainer from '../../../MultiSelector/ModalContainer.jsx';
import MultiSelector from '../../../MultiSelector/MultiSelector.jsx';
import Header2 from '../../../Headers/Header2.jsx';

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../../utils/constants.jsx';

class ProfileKnownAllergies extends React.Component {

  render() {
    const {
      profile,
      fields: {
        KNOWN_ALLERGIES
      }
    } = this.props;

    Object.keys(profile.toJS()).forEach((key) => {
      return [].concat(...knownAllergiesList.map(kas=> kas.list)).forEach((item) => {
        if (key.startsWith(item.id)) {
          let reduxFormMedCond = KNOWN_ALLERGIES[item.label];
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
          <h2>{'Known Allergies'}</h2>
        </Header2>
        <ModalContainer
            icon={"caret dropdownarrow"}
            label="Select"
        >
          <MultiSelector
              reduxForm={KNOWN_ALLERGIES}
          />
        </ModalContainer>
      </div>
    );
  }

}

ProfileKnownAllergies = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.KNOWN_ALLERGIES,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileKnownAllergies);

export default ProfileKnownAllergies;
