import { Map } from 'immutable';
import React, { PropTypes } from 'react';
import Header2 from '../../Headers/Header2.jsx';
const BS = ReactBootstrap;

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

class ProfilePhysician extends React.Component {

  render() {
    const {
      profile,
      fields: {
        PHYSICIAN
      }
    } = this.props;

    if (profile.size === 0) {
      return null;
    }

    const physician = profile.get('physician');

    const physicianInfo = {
      city: physician && physician.get('city') || 'N/A',
      firstName: physician && physician.get('firstName') || 'N/A',
      lastName: physician && physician.get('lastName') || 'N/A',
      phone: physician && physician.get('phone') || 'N/A',
      state: physician && physician.get('state') || 'N/A',
      street1: physician && physician.get('street1') || 'N/A',
      street2: physician && physician.get('street2') || 'N/A',
      email: physician && physician.get('email') || 'N/A'
    };

    return (
      <div>
        <Header2>
          <h2>{'Physician'}</h2>
        </Header2>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Name:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={`${physicianInfo.lastName}, ${physicianInfo.firstName}`}
                    {...PHYSICIAN.NAME}
                />
              </span>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Address:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <div>
                  <BS.Input
                      type="text"
                      value={physicianInfo.street1 + ' ' + physicianInfo.street2}
                      {...PHYSICIAN.ADDRESS_LINE_1}
                  />
                </div>
                <div>
                  <BS.Input
                      type="text"
                      value={`${physicianInfo.city}, ${physicianInfo.state}`}
                      {...PHYSICIAN.ADDRESS_LINE_2}
                  />
                </div>
              </span>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Phone:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={physicianInfo.phone}
                    {...PHYSICIAN.PHONE}
                />
              </span>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Email:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="email"
                    value={physicianInfo.email}
                    {...PHYSICIAN.EMAIL}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePhysician.propTypes = {
  profile: PropTypes.instanceOf(Map).isRequired
};

ProfilePhysician = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.PHYSICIAN,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfilePhysician);

export default ProfilePhysician;
