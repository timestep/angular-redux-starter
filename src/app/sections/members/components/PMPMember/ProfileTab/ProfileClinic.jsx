import { Map } from 'immutable';
import React, { PropTypes } from 'react';
import Header2 from '../../Headers/Header2.jsx';
const BS = ReactBootstrap;

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

class ProfileClinic extends React.Component {

  render() {
    const {
      clinic,
      fields: {
        CLINIC
      }
    } = this.props;

    if (clinic.size === 0) {
      return null;
    }

    const clinicProp = {
      name: clinic.get('First') + ' ' + clinic.get('Last') || 'N/A',
      address: clinic.get('Address') || 'N/A',
      phone: clinic.get('Telephone') || 'N/A'
    };

    return (
      <div>
        <Header2>
          <h2>{'Clinic'}</h2>
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
                    value={clinicProp.name}
                    {...CLINIC.NAME}
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
                    value= {clinicProp.address}
                    {...CLINIC.ADDRESS}
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
                    value= {clinicProp.phone}
                    {...CLINIC.PHONE}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileClinic.propTypes = {
  clinic: PropTypes.instanceOf(Map).isRequired
};

ProfileClinic = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.CLINIC,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileClinic);

export default ProfileClinic;
