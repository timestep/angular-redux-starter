import { householdPets } from '../../../utils/householdPets.jsx';
import ModalContainer from '../../MultiSelector/ModalContainer.jsx';
import MultiSelector from '../../MultiSelector/MultiSelector.jsx';
import Header2 from '../../Headers/Header2.jsx';

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

class ProfileHouseHoldPets extends React.Component {

  render() {
    const {
      pets,
      fields: {
        HOUSE_PETS
      }
    } = this.props;

    let filteredList = [];
    pets.forEach((key) => {
      householdPets.forEach((item) => {
        if (key.startsWith(item.label)) {
          let reduxFormMedCond = HOUSE_PETS[item.label];
          if (reduxFormMedCond && reduxFormMedCond.touched === false) {
            reduxFormMedCond.value = true;
            reduxFormMedCond.defaultChecked = true;
          }
        }
      });
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          <Header2>
            <h2>{'House Pets'}</h2>
          </Header2>
          <ModalContainer
              icon={"caret dropdownarrow"}
              label="Select"
          >
            <MultiSelector
                list={filteredList}
                reduxForm={HOUSE_PETS}
            />
          </ModalContainer>
        </div>
      </div>
    );
  }

}

ProfileHouseHoldPets = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.HOUSE_PETS,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileHouseHoldPets);

export default ProfileHouseHoldPets;
