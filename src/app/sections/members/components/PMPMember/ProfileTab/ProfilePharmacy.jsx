import { Map } from 'immutable';
import React, { PropTypes } from 'react';
import Header2 from '../../Headers/Header2.jsx';
const BS = ReactBootstrap;

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

class ProfilePharmacy extends React.Component {

  render() {
    const {
      profile,
      fields: {
        PHARMACY
      }
    } = this.props;

    if (profile.size === 0) {
      return null;
    }

    const pharmacist = profile.get('pharmacist');
    const pharmacyInfo = {
      name: pharmacist && pharmacist.get('name') || 'N/A',
      address: pharmacist && pharmacist.get('vicinity') || 'N/A',
      phone: pharmacist && pharmacist.get('phone') || 'N/A',
      email: pharmacist && pharmacist.get('email') || 'N/A'
    };

    return (
      <div>
        <div className="memberBody__section">
          <Header2>
            <h2>{'Preferred Pharmacy'}</h2>
          </Header2>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Name:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={pharmacyInfo.name}
                    {...PHARMACY.NAME}
                />
              </span>
            </div>
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Address:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={pharmacyInfo.address}
                    {...PHARMACY.ADDRESS}
                />
              </span>
            </div>
            <div className="row">
              <span className="col-xs-3 col-sm-12 col-md-3">
                {'Phone:'}
              </span>
              <span className="col-xs-9 col-sm-12 col-md-9">
                <BS.Input
                    type="text"
                    value={pharmacyInfo.phone}
                    {...PHARMACY.PHONE}
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
                    value={pharmacyInfo.email}
                    {...PHARMACY.EMAIL}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfilePharmacy.propTypes = {
  profile: PropTypes.instanceOf(Map).isRequired
};

ProfilePharmacy = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.PHARMACY,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfilePharmacy);

export default ProfilePharmacy;
