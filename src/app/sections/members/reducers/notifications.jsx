import { sendNotifications } from '../api/notifications.jsx';
import { reset } from 'redux-form';
import { fromJS } from 'immutable';
import { NOTIFICATIONS } from '../utils/constants.jsx';

/* Constants */

/* Reducer */

const initialState = fromJS({
  showNotificationOverlay: false,
  selectedType: ''
});

function notificationReducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFICATIONS.STATE.HIDE_NOTIFICATION_DIALOG:
      return state.merge({
        showNotificationOverlay: false,
        selectedType: ''
      });

    case NOTIFICATIONS.STATE.SELECT_NOTIFICATION:
      return state.merge({
        showNotificationOverlay: true,
        selectedType: action.payload
      });

    case NOTIFICATIONS.STATE.REQUEST_SEND_NOTIFICATION:
      return state.merge({
        showNotificationOverlay: false,
        selectedType: ''
      });

    case NOTIFICATIONS.STATE.REJECT_SEND_NOTIFICATION:
      toastr.error('Error sending notifications at this time. Please try again later.');
      return state;

    case NOTIFICATIONS.STATE.RESOLVE_SEND_NOTIFICATION:
      // reset notification form
      toastr.success('Successfully sent all notifications.');
      return state;

    case NOTIFICATIONS.STATE.WARNING_SELECT_RECIPIENT:
      toastr.warning('Please select at least one member to send a notification to.');
      return state;

    default:
      return state;
  }
}

export default notificationReducer;

/* Actions */

export function hideNotificationHandler() {
  return {type: NOTIFICATIONS.STATE.HIDE_NOTIFICATION_DIALOG};
}

export function sendNotificationHandler() {
  return (dispatch, getState) => {
    const formData = getState().form.get('notification').toJS().NOTIFICATION;
    const selectedMembers = getState().activeMembers.get('selectedMembers');
    const viewingMemberUserName = getState().activeMember.get('username');
    let recipients = null;

    if (viewingMemberUserName) {
      recipients = [viewingMemberUserName];
    } else {
      recipients = selectedMembers;
    }

    // reset the form - validation has passed if we've gotten here
    dispatch(reset('notification'));

    return dispatch({
      types: [
        NOTIFICATIONS.STATE.REQUEST_SEND_NOTIFICATION,
        NOTIFICATIONS.STATE.RESOLVE_SEND_NOTIFICATION,
        NOTIFICATIONS.STATE.REJECT_SEND_NOTIFICATION
      ],
      payload: {
        promise: sendNotifications(recipients, formData)
          .then((res) => res.data)
      }
    });
  };
}

export function showNotificationHandler(type) {
  return (dispatch, getState) => {
    const selectedMembers = getState().activeMembers.get('selectedMembers');
    const viewingMemberUserName = getState().activeMember.get('username');

    if (selectedMembers.size || viewingMemberUserName) {
      dispatch({
        type: NOTIFICATIONS.STATE.SELECT_NOTIFICATION,
        payload: type
      });
    } else {
      dispatch({ type: NOTIFICATIONS.STATE.WARNING_SELECT_RECIPIENT });
    }
  };
}
