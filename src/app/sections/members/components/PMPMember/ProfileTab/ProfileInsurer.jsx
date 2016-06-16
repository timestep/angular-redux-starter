import { Map } from 'immutable';
import React, { PropTypes } from 'react';
import Header2 from '../../Headers/Header2.jsx';
const BS = ReactBootstrap;

import { reduxForm } from 'redux-form';
import { MEMBER_PAGE } from '../../../utils/constants.jsx';

class ProfileInsurer extends React.Component {

  render() {
    const {
      profile,
      fields: {
        INSURER
      }
    } = this.props;

    if (profile.size === 0) {
      return null;
    }

    let insurer;
    const insurerImm = profile.get('insurer');

    if (!insurerImm) {
      insurer = {
        name: 'N/A',
        address: 'N/A',
        phone: 'N/A',
        email: 'N/A'
      };
    } else {
      insurer = {
        name: insurerImm.get('name') || 'N/A',
        address: insurerImm.get('address') || 'N/A',
        phone: insurerImm.get('phone') || 'N/A',
        email: insurerImm.get('email') || 'N/A'
      };
    }

    return (
      <div>
        <div className="memberBody__section">
          <Header2>
            <h2>{'Insurer'}</h2>
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
                    value={insurer.name}
                    {...INSURER.NAME}
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
                <BS.Input
                    defaultValue={insurer.address}
                    type="text"
                    {...INSURER.ADDRESS}
                />
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
                    value={insurer.phone}
                    {...INSURER.NAME}

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
                    type="text"
                    value={insurer.email}
                    {...INSURER.EMAIL}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileInsurer.propTypes = {
  profile: PropTypes.instanceOf(Map).isRequired
};

ProfileInsurer = reduxForm({
  form: 'memberPage',
  fields: MEMBER_PAGE.FORM_FIELDS.INSURER,
  getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS()
})(ProfileInsurer);

export default ProfileInsurer;
