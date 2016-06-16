import { householdPets } from '../../../utils/householdPets.jsx';
import ProfileHouseHoldPets from './ProfileHouseHoldPets.jsx';
import ProfileSmokingHistory from './ProfileSmokingHistory.jsx';

export default class ProfilePersonalInfo extends React.Component {

  render() {
    const {
      profile
    } = this.props;

    let filteredList = [];

    Object.keys(profile.toJS()).forEach((key) => {
      householdPets.forEach((item) => {
        if (key === item.label) {
          filteredList.push(key);
        }
      });
    });

    return (
      <div>
        <ProfileHouseHoldPets
            pets={filteredList}
        />
        <ProfileSmokingHistory />
      </div>
    );
  }
}
