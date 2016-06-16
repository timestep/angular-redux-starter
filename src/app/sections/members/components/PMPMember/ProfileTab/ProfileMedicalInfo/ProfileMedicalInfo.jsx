import ProfileMedicalConditions from './ProfileMedicalConditions.jsx';
import ProfileKnownAllergies from './ProfileKnownAllergies.jsx';
import ProfileCurrentMedications from './ProfileCurrentMedications.jsx';
import ProfileTestResultsList from './ProfileTestResults.jsx';

export default class ProfileMedicalInfo extends React.Component {

  render() {
    const {
      profile
    } = this.props;

    return (
        <div className="row">
          <ProfileMedicalConditions profile={profile}/>
          <ProfileKnownAllergies profile={profile}/>
          <ProfileCurrentMedications profile={profile}/>
          <ProfileTestResultsList profile={profile}/>
        </div>
    );
  }

}
