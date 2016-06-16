import { reduxForm } from 'redux-form';
import { NOTIFICATIONS } from '../../utils/constants.jsx';

import NotificationLinks from './NotificationLinks.jsx';
import NotificationTypes from './NotificationTypes.jsx';
import NotificationTitle from './NotificationTitle.jsx';
import NotificationViewTemplate from './NotificationViewTemplate.jsx';
import NotificationMessage from './NotificationMessage.jsx';
import NotificationImage from './NotificationImage.jsx';

const BS = ReactBootstrap;

const validate = values => {

  const notification = values.NOTIFICATION;
  const errors = {
    NOTIFICATION: {}
  };

  // empty string is OK
  if (typeof notification.LINK === 'undefined') {
    errors.NOTIFICATION.LINK = 'Required';
  }

  if (!notification.TITLE) {
    errors.NOTIFICATION.TITLE = 'Required';
  }

  // If Edit Profile is selected, we don't need a message
  // or if template => image is selected, we don't need a message
  if (notification.LINK !== 'Edit Profile' && notification.VIEW_TEMPLATE !== 'Image' && !notification.MESSAGE) {
    errors.NOTIFICATION.MESSAGE = 'Required';
  }

  // if viewTemplate === 'Image' or 'Text+Image' then an image is required
  if (typeof notification.VIEW_TEMPLATE !== 'undefined' && notification.VIEW_TEMPLATE !== 'Text' &&
    (!notification.IMAGE || notification.IMAGE.length === 0)) {
    errors.NOTIFICATION.IMAGE = 'Required';
  }

  return errors;
};

class NotificationOverlay extends React.Component {

  render() {
    const {
      fields: { NOTIFICATION },
      handleSubmit,
      onCloseHandler,
      onSubmitHandler,
      recipients
    } = this.props;

    const modalTitle = recipients.size > 1 ?
      'Send Notification to ' + recipients.size + ' recipient(s).' :
      'Send Notification';

    return (
      <BS.Modal show={true}>
        <BS.Modal.Header>
          <BS.Modal.Title>
            {modalTitle}
          </BS.Modal.Title>
        </BS.Modal.Header>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <BS.Modal.Body>
            <div className="form-horizontal">
              <NotificationTypes
                  reduxFormTypes={NOTIFICATION.TYPE}
              />

              <NotificationLinks
                  reduxFormLinks={NOTIFICATION.LINK}
              />

              <NotificationTitle
                  reduxFormTitle={NOTIFICATION.TITLE}
              />

              <NotificationViewTemplate
                  reduxFormLinks={NOTIFICATION.LINK}
                  reduxFormViewTemplate={NOTIFICATION.VIEW_TEMPLATE}
              />

              <NotificationMessage
                  reduxFormLinks={NOTIFICATION.LINK}
                  reduxFormMessage={NOTIFICATION.MESSAGE}
                  reduxFormViewTemplate={NOTIFICATION.VIEW_TEMPLATE}
              />

              <NotificationImage
                  reduxFormImage={NOTIFICATION.IMAGE}
                  reduxFormLinks={NOTIFICATION.LINK}
                  reduxFormViewTemplate={NOTIFICATION.VIEW_TEMPLATE}
              />
            </div>
          </BS.Modal.Body>

          <BS.Modal.Footer>
            <BS.Button
                className="btn btn-success"
                type="submit"
            >
              {'Send'}
            </BS.Button>
            <BS.Button
                className="btn btn-danger"
                onClick={() => onCloseHandler()}
            >
              {'Cancel'}
            </BS.Button>
          </BS.Modal.Footer>
        </form>
      </BS.Modal>
    );
  }
}

NotificationOverlay = reduxForm(
  {
    form: NOTIFICATIONS.FORM_NAME,
    fields: NOTIFICATIONS.FORM_FIELDS.NOTIFICATION,
    getFormState: (state, reduxMountPoint) => state[reduxMountPoint].toJS(),
    validate
  },
  (state) => {
    return {
      initialValues: {
        NOTIFICATION: {
          LINK: '',
          TYPE: state.notification.get('selectedType')
        }
      }
    };
  }
)(NotificationOverlay);

export default NotificationOverlay;
