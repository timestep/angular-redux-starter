import { Map } from 'immutable';
import React, { PropTypes } from 'react';

import ProfileContactInfo from './ProfileContactInfo.jsx';
import ProfileClinic from './ProfileClinic.jsx';
import ProfileMedicalInfo from './ProfileMedicalInfo/ProfileMedicalInfo.jsx';
import ProfilePersonalInfo from './ProfilePersonalInfo.jsx';
import ProfilePharmacy from './ProfilePharmacy.jsx';
import ProfilePhysician from './ProfilePhysician.jsx';
import ProfileInsurer from './ProfileInsurer.jsx';
import ProfileSaveButton from './ProfileSaveButton.jsx';
import Header1 from '../../Headers/Header1.jsx';
import CallToAction from '../../CallToAction/CallToAction.jsx';
import NotificationHistory from './NotificationHistory/NotificationHistory.jsx';

export default class ProfileTab extends React.Component {

  render() {
    const {
      clinic,
      profile,
      notifications,
      saveButton
    } = this.props;

    if (profile.size === 0) {
      return null;
    }

    return (
      <div className="container-fluid">
        <CallToAction>
          <ProfileSaveButton
              onSaveClick={saveButton}
          />
        </CallToAction>
        <div className="row memberBody__body">
          <div className="col-sm-3">
            <ProfileContactInfo profile={profile}/>
          </div>
          <div className="col-sm-9">
            <Header1>
              <h1>{'Medical Information'}</h1>
            </Header1>
            <div className="row">
              <div className="col-sm-12">
                <ProfileMedicalInfo profile={profile} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <Header1>
              <h1>{'Notification History'}</h1>
            </Header1>
            <NotificationHistory
                notifications={notifications.get('rows').toJS()}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Header1>
              <h1>{'Providers'}</h1>
            </Header1>
            <div className="row">
              <div className="col-sm-6">
                <ProfileClinic
                    clinic={clinic}
                />
              </div>
              <div className="col-sm-6">
                <ProfilePhysician
                    profile={profile}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <ProfilePharmacy
                    profile={profile}
                />
              </div>
              <div className="col-sm-6">
                <ProfileInsurer
                    profile={profile}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-3">
            <Header1>
              <h1>{'Personal Information'}</h1>
            </Header1>
            <ProfilePersonalInfo profile={profile}/>
          </div>
        </div>
      </div>
    );
  }
}

ProfileTab.propTypes = {
  clinic: PropTypes.instanceOf(Map).isRequired,
  profile: PropTypes.instanceOf(Map).isRequired
};
