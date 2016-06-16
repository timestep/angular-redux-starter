import { Map } from 'immutable';
import React, { PropTypes } from 'react';
const BS = ReactBootstrap;

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';
import Header1 from '../../Headers/Header1.jsx';

class ProfileContactInfo extends React.Component {

  render() {
    const {
      profile,
      fields: {
        BASIC_INFO
      }
    } = this.props;

    if (profile.size === 0) {
      return null;
    }

    const cellPhoneNumber = profile.get('cell') || 'N/A';
    const homePhoneNumber = profile.get('phone') || 'N/A';
    const email = profile.get('email');
    const street1 = profile.get('street1') || 'N/A';
    const street2 = profile.get('street2') || 'N/A';
    const city = profile.get('city') || 'N/A';
    const state = profile.get('state') && profile.get('state').get('name') || 'N/A';
    const zipCode = profile.get('zipCode') || 'N/A';
    const addressLine1 = street1 + ' ' + street2;
    const addressLine2 = `${city}, ${state} ${zipCode}`;

    return (
      <div>
        <Header1>
          <h1>{'Contact Information'}</h1>
        </Header1>
        <form className="row">
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Address:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={addressLine1}
                    {...BASIC_INFO.ADDRESS_LINE_1}
                />
                <BS.Input
                    type="text"
                    value={addressLine2}
                    {...BASIC_INFO.ADDRESS_LINE_2}
                />
              </span>
            </div>

            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Mobile Phone:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={cellPhoneNumber}
                    {...BASIC_INFO.CELL_PHONE}
                />
              </span>
            </div>

            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Home Phone:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={homePhoneNumber}
                    {...BASIC_INFO.HOME_PHONE}
                />
              </span>
            </div>

            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Email:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={email}
                    {...BASIC_INFO.EMAIL}
                />
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ProfileContactInfo.propTypes = {
  profile: PropTypes.instanceOf(Map).isRequired
};

ProfileContactInfo = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.BASIC_INFO,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileContactInfo);

export default ProfileContactInfo;
