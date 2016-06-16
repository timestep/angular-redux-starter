import {
  ACTIVE_SEARCH,
  LOCAL_STORAGE_KEY,
  SORT_ORDER
} from '../utils/constants.jsx';

import {
  fromJS,
  Set
} from 'immutable';

import { checkArrayObjInArray } from '../utils/toolbox.jsx';
import generateStartDate from '../utils/generateStartDate.jsx';
import { searchMembersApi } from '../api/members.jsx';
import compareByCreatedTimeStamp from '../utils/compareByCreatedTimeStamp.jsx';

/* Constants */
const ADD_MEMBER_TO_SELECTED = 'ADD_MEMBER_TO_SELECTED';
const REMOVE_MEMBER_FROM_SELECTED = 'REMOVE_MEMBER_FOM_SELECTED';
const CHECK_ALL_MEMBERS = 'CHECK_ALL_MEMBERS';
const UNCHECK_ALL_MEMBERS = 'UNCHECK_ALL_MEMBERS';
const REQUEST_MEMBERS = 'REQUEST_MEMBERS';
const REJECT_REQUEST_MEMBERS = 'REJECT_REQUEST_MEMBERS';
const RESOLVE_REQUEST_MEMBERS = 'RESOLVE_REQUEST_MEMBERS';
const SORT_LAST_TEST_TAKEN = 'SORT_LAST_TEST_TAKEN';

/* Helper */

function getNumberWithSeverity(members, severity) {
  return members.reduce((acc, member) => {
    if (member.range === severity) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

/* Reducer */

const INITIAL_STATE = fromJS({
  hasError: false,
  members: [],
  numOoc: 0,
  numVeryHigh: 0,
  numHigh: 0,
  numModerate: 0,
  numLow: 0,
  selectedMembers: Set(), // ImmutableJS Set (not ES6)
  sortLastTestOrder: SORT_ORDER.DESCENDING,
  sortLastTestIsActive: false
});

function membersReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    case ADD_MEMBER_TO_SELECTED:
      return state.updateIn(['selectedMembers'], list => list.add(action.payload));

    case REMOVE_MEMBER_FROM_SELECTED:
      return state.updateIn(['selectedMembers'], list => list.filter((member) => member !== action.payload));

    case CHECK_ALL_MEMBERS:
      return state.merge({
        selectedMembers: Set(state.get('selectedMembers').union(action.payload))
      });

    case SORT_LAST_TEST_TAKEN:
      const sortDescending = state.get('sortLastTestOrder') === SORT_ORDER.DESCENDING;
      return state.merge({
        members: state.get('members').sort(compareByCreatedTimeStamp(sortDescending)),
        sortLastTestIsActive: true,
        sortLastTestOrder: sortDescending ? SORT_ORDER.ASCENDING : SORT_ORDER.DESCENDING
      });

    case UNCHECK_ALL_MEMBERS:
      return state.merge(fromJS({
        selectedMembers: Set(state.get('selectedMembers').subtract(action.payload))
      }));

    case REQUEST_MEMBERS:
      return state.merge(fromJS({
        hasError: false,
        members: []
      }));

    case RESOLVE_REQUEST_MEMBERS:
      return state.merge(fromJS({
        members: action.payload,
        hasError: false,
        numOoc: getNumberWithSeverity(action.payload, 'out of control'),
        numVeryHigh: getNumberWithSeverity(action.payload, 'very high'),
        numHigh: getNumberWithSeverity(action.payload, 'high'),
        numModerate: getNumberWithSeverity(action.payload, 'moderate'),
        numLow: getNumberWithSeverity(action.payload, 'low'),
        selectedMembers: Set(state.get('selectedMembers').clear())
      }));

    case REJECT_REQUEST_MEMBERS:
      return state.merge(fromJS({
        hasError: true,
        numOoc: 0,
        numVeryHigh: 0,
        numHigh: 0,
        numModerate: 0,
        numLow: 0
      }));

    default:
      return state;
  }
}

export default membersReducer;


/* Actions */

export function requestMembers(dateRange) {
  return (dispatch, getState) => {
    const activeSymptom = getState().activeSymptom.get('selected').toLowerCase();
    const activeStartDate = dateRange || getState().activeDate.get('selected');
    const startDate = generateStartDate(activeStartDate);
    const organization = window.localStorage[LOCAL_STORAGE_KEY.USER_ORGANIZATION_ID];
    const filter = {
      MEDICAL_INFO: {
        SEVERITY_TEST: {
          FIELDS: [
            {
              id: 'startDate',
              label: 'Start Date',
              path: 'MEDICAL_INFO.SEVERITY_TEST.FIELDS.START_DATE',
              value: startDate
            }
          ]
        }
      },
      sort: 'createdTimestamp',
      startdate: startDate,
      symptom: activeSymptom
    };

    const limit = ACTIVE_SEARCH.QUERY.LIMIT;
    const offset = 0;

    return dispatch({
      types: [
        REQUEST_MEMBERS,
        RESOLVE_REQUEST_MEMBERS,
        REJECT_REQUEST_MEMBERS
      ],
      payload: {
        promise: searchMembersApi(organization, filter, offset, limit)
          .then((res) => res.rows)
      }
    });
  };
}

export function toggleSelectedMember(username) {
  return (dispatch, getState) => {
    const selectedMembers = getState().activeMembers.get('selectedMembers');

    if (selectedMembers.has(username)) {
      dispatch({
        type: REMOVE_MEMBER_FROM_SELECTED,
        payload: username
      });
    } else {
      dispatch({
        type: ADD_MEMBER_TO_SELECTED,
        payload: username
      });
    }
  };
}

export function toggleSelectAll(membersInView) {
  return (dispatch, getState) => {
    const selectedMembers = getState().activeMembers.get('selectedMembers');
    const isSelectedAllChecked = checkArrayObjInArray(membersInView, selectedMembers, 'username');
    const userNamesOfMembersInView = membersInView.map(member => member.get('username'));

    if (isSelectedAllChecked) {
      dispatch({
        type: UNCHECK_ALL_MEMBERS,
        payload: userNamesOfMembersInView
      });
    } else {
      dispatch({
        type: CHECK_ALL_MEMBERS,
        payload: userNamesOfMembersInView
      });
    }
  };
}

export function sortLastTestTaken() {
  return {
    type: SORT_LAST_TEST_TAKEN
  };
}
