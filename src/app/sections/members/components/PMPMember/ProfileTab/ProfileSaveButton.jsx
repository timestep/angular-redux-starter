import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

const BS = ReactBootstrap;

class ProfileSaveButton extends React.Component {
  render() {
    const {
      handleSubmit,
      onSaveClick,
      pristine,
      submitting
    } = this.props;
    return (
        <BS.Button
            className="btn btn-success"
            disabled={submitting || pristine}
            onClick={handleSubmit(onSaveClick)}
            type="submit"
        >
          {'Save Changes'}
        </BS.Button>
    );
  }
}

ProfileSaveButton = reduxForm({
  form: 'memberPage',
  fields: [
    ...MEMBER_PAGE.FORM_FIELDS.BASIC_INFO,
    ...MEMBER_PAGE.FORM_FIELDS.HOUSE_PETS,
    ...MEMBER_PAGE.FORM_FIELDS.KNOWN_ALLERGIES,
    ...MEMBER_PAGE.FORM_FIELDS.MEDICAL_CONDITIONS,
    ...MEMBER_PAGE.FORM_FIELDS.MEDICATION_TYPES,
    ...MEMBER_PAGE.FORM_FIELDS.PHARMACY,
    ...MEMBER_PAGE.FORM_FIELDS.TEST_RESULTS
  ],
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileSaveButton);

export default ProfileSaveButton;
