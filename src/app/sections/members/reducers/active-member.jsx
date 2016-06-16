import { fromJS } from 'immutable';

import {
  ACTIVE_MEMBER,
  LOCAL_STORAGE_KEY
} from '../utils/constants.jsx';

import {
  getMember,
  postMember
} from '../api/member.jsx';

import { mergeAndFormatProfile } from '../utils/mergeAndFormatProfile.jsx';

/* Constants */

const INITIAL_STATE = fromJS({
  activeTabView: 'PROFILE',
  authorization: '',
  clinic: {},
  dates: {
    start: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  },
  hasError: false,
  notifications: [],
  photo: '',
  profile: {},
  tabViewOptions: ['PROFILE', 'ALLER-RHYTHM'],
  username: null
});

/* Reducer */

const memberReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {

    case ACTIVE_MEMBER.STATE.CHANGE_VIEW_TAB:
      return state.merge(fromJS({
        activeTabView: action.payload
      }));

    case ACTIVE_MEMBER.STATE.REQUEST_MEMBERS:
      return state.merge(fromJS(INITIAL_STATE));

    case ACTIVE_MEMBER.STATE.RESOLVE_REQUEST_MEMBER:
      return state.merge(fromJS({
        authorization: window.localStorage[LOCAL_STORAGE_KEY.USER_AUTHORIZATION_TOKEN],
        clinic: action.payload.clinic,
        hasError: false,
        notifications: action.payload.notifications,
        photo: action.payload.photo,
        profile: action.payload.profile,
        username: action.payload.username
      }));

    case ACTIVE_MEMBER.STATE.REJECT_REQUEST_MEMBER:
      return state.merge(fromJS({
        clinic: {},
        photo: '',
        profile: {},
        notifications: [],
        hasError: true
      }));

    case ACTIVE_MEMBER.STATE.RESET_MEMBER:
      return state.merge(fromJS(INITIAL_STATE));

    case ACTIVE_MEMBER.STATE.VIEW_SELECTED_MEMBER:
      return state.merge(fromJS({
        username: action.payload
      }));

    case ACTIVE_MEMBER.STATE.REQUEST_SAVE_MEMBER_PROFILE:
      return state;

    case ACTIVE_MEMBER.STATE.REJECT_SAVE_MEMBER_PROFILE:
      toastr.error('Error saving profile.');
      return state;

    case ACTIVE_MEMBER.STATE.RESOLVE_SAVE_MEMBER_PROFILE:
      toastr.success('Successfully saved profile.');
      return state;

    default:
      return state;
  }
};

export default memberReducer;

/* Actions */

export function selectMemberUsernameHandler(username) {
  return { type: ACTIVE_MEMBER.STATE.VIEW_SELECTED_MEMBER, payload: username};
}

export function changeMemberPageTab(tab) {
  return { type: ACTIVE_MEMBER.STATE.CHANGE_VIEW_TAB, payload: tab};
}

export function getMemberProfile() {
  return (dispatch, getState) => {
    const username = getState().activeMember.get('username');

    dispatch({
      types: [
        ACTIVE_MEMBER.STATE.REQUEST_MEMBER,
        ACTIVE_MEMBER.STATE.RESOLVE_REQUEST_MEMBER,
        ACTIVE_MEMBER.STATE.REJECT_REQUEST_MEMBER
      ],
      payload: {
        promise: getMember(username)
          .then(res => {
            return {
              username: username,
              profile: res.profile,
              photo: res.photo,
              clinic: res.clinic,
              notifications: res.notifications
            };
          })
      }
    });
  };
}

export function saveMemberToApi() {
  return (dispatch, getState) => {
    const updatedProfile = getState().form.get('memberPage').toJS();
    const profile = getState().activeMember.get('profile').toJS();
    const mergeProfile = mergeAndFormatProfile(profile, updatedProfile);

    const username = getState().activeMember.get('username');

    return dispatch({
      types: [
        ACTIVE_MEMBER.STATE.REQUEST_SAVE_MEMBER_PROFILE,
        ACTIVE_MEMBER.STATE.RESOLVE_SAVE_MEMBER_PROFILE,
        ACTIVE_MEMBER.STATE.REJECT_SAVE_MEMBER_PROFILE
      ],
      payload: {
        promise: postMember(username, mergeProfile)
          .then((res) => res.data)
      }
    });
  };
}
