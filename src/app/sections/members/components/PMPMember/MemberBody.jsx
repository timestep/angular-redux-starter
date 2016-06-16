import { Map } from 'immutable';
import React, { PropTypes } from 'react';

import AllerRhythmTab from './AllerRhythmTab/AllerRhythmTab.jsx';
import ProfileTab from './ProfileTab/ProfileTab.jsx';

import { PROFILE_TAB_OPTION, AR_TAB_OPTION } from '../../utils/constants.jsx';

export default class MemberBody extends React.Component {
  render() {
    const {
      activeTabView,
      authorization,
      clinic,
      dates,
      notifications,
      photo,
      profile,
      saveButton,
      username
    } = this.props;

    if (activeTabView === PROFILE_TAB_OPTION) {
      return (
        <ProfileTab
            clinic={clinic}
            notifications={notifications}
            profile={profile}
            saveButton={saveButton}
        />
      );
    }

    if (activeTabView === AR_TAB_OPTION) {
      return (
        <AllerRhythmTab
            authorization={authorization}
            clinic={clinic}
            dates={dates}
            photo={photo}
            profile={profile}
            username={username}
        />
      );
    }

    return null;
  }
}

MemberBody.propTypes = {
  activeTabView: PropTypes.string.isRequired,
  clinic: PropTypes.instanceOf(Map).isRequired,
  profile: PropTypes.instanceOf(Map).isRequired
};
