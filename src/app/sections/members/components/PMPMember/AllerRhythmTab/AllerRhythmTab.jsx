import Dash from '../../../../allerrhythm/components/Dash.jsx';
import {
  STATES,
  DEFAULT_LOCATION
} from '../../../utils/constants.jsx';
import R from 'ramda';

export default class AllerRhythmTab extends React.Component {

  selectUserLocation = (profileProps) => {
    if (R.isNil(profileProps.locations)) {
      return {};
    }
    return R.pipe(
      R.filter(location => location.selected === true),
      R.head
    )(profileProps.locations);
  };

  stateAbbreviation = (locationData) => {
    if (R.isNil(locationData) || locationData === '') {
      return '';
    }

    const profileStateName = locationData.name.split(', ')[1].toUpperCase();

    const stateAbbreviation = R.pipe(
      R.filter((state) => state.abbreviation === profileStateName || state.name === profileStateName),
      R.path('0.abbreviation')
    )(STATES);

    if (R.isNil(stateAbbreviation)) {
      return '';
    }

    return stateAbbreviation;
  };

  cityName = (locationData) => {
    if (R.isNil(locationData) || locationData === '') {
      return '';
    }
    return locationData.name.split(', ')[0];
  }

  determineLocation = (profileProps) => {
    const location = this.selectUserLocation(profileProps);

    if (
      R.isNil(location) ||
      R.isNil(profileProps.locations) ||
      profileProps.locations.length === 0
    ) {
      toastr.error('Location is outside the US.');
      return DEFAULT_LOCATION;
    }

    const state = this.stateAbbreviation(location);
    const city = this.cityName(location);

    if (state === '' || city === '') {
      toastr.error('Location is outside the US.');
      return DEFAULT_LOCATION;
    }

    return {
      city: city,
      position: location,
      state: state
    };
  }

  render() {
    const {
      authorization,
      clinic,
      dates,
      photo,
      profile,
      username
    } = this.props;

    if (!profile.size) {
      return null;
    }

    const locationData = this.determineLocation(profile.toJS());
    const city = locationData.city;
    const state = locationData.state;
    const position = locationData.position;

    return (
      <Dash
          authToken={authorization}
          city={city}
          clinic={clinic.toJS()}
          dates={dates.toJS()}
          email={username}
          hideHeader={true}
          photo={photo}
          position={position}
          profile={profile.toJS()}
          showLocation={true}
          state={state}
      />
    );
  }
}
