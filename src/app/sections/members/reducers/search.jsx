import R from 'ramda';
import { fromJS } from 'immutable';
import { destroy } from 'redux-form';
import { unSelectSeverity } from './active-severity.jsx';
import { searchMembersApi } from '../api/members.jsx';
import {
  ACTIVE_SEARCH,
  CALENDAR,
  LOCAL_STORAGE_KEY,
  MEMBERS_SEARCH,
  SORT_ORDER
} from '../utils/constants.jsx';

import compareByCreatedTimeStamp from '../utils/compareByCreatedTimeStamp.jsx';
import { transformFormFieldsToDBFields } from '../utils/transformList.jsx';

/* Reducer */

const initialState = fromJS({
  birthMonthSelector: '',
  birthYearSelector: '',
  isSearchSelected: false,
  members: [],
  stateSelector: '',
  sortLastTestOrder: SORT_ORDER.DESCENDING,
  sortLastTestOrderIsActive: false
});

function searchReducer(state = initialState, action = {}) {
  switch (action.type) {

    case ACTIVE_SEARCH.STATE.RESET_FORM_FIELDS:
      return state;

    case ACTIVE_SEARCH.STATE.SELECT_DROPDOWN:
      return state.set(action.payload.selector, action.payload.value);

    case ACTIVE_SEARCH.STATE.SELECT_SEARCH:
      return state.set('isSearchSelected', action.payload);

    case ACTIVE_SEARCH.STATE.UNSELECT_SEARCH:
      return state.set('isSearchSelected', action.payload);


    case ACTIVE_SEARCH.STATE.REQUEST_SEARCH_MEMBERS:
      return state.merge(fromJS({
        hasError: false,
        members: []
      }));

    case ACTIVE_SEARCH.STATE.RESOLVE_SEARCH_MEMBERS:
      return state.merge(fromJS({
        members: action.payload,
        hasError: false
      }));

    case ACTIVE_SEARCH.STATE.REJECT_SEARCH_MEMBERS:
      return state.merge(fromJS({
        members: [],
        hasError: true
      }));

    case ACTIVE_SEARCH.STATE.SORT_BY_LAST_TEST_TAKEN:
      const sortDescending = state.get('sortLastTestOrder') === SORT_ORDER.DESCENDING;
      return state.merge({
        members: state.get('members').sort(compareByCreatedTimeStamp(sortDescending)),
        sortLastTestIsActive: true,
        sortLastTestOrder: sortDescending ? SORT_ORDER.ASCENDING : SORT_ORDER.DESCENDING
      });

    default:
      return state;
  }
}

export default searchReducer;

/* Actions */

export function selectSearch() {
  return (dispatch) => {
    dispatch(unSelectSeverity());
    dispatch({
      type: ACTIVE_SEARCH.STATE.SELECT_SEARCH,
      payload: true
    });
  };
}

export function unSelectSearch() {
  return {
    type: ACTIVE_SEARCH.STATE.UNSELECT_SEARCH,
    payload: false
  };

}

export function searchReset(form) {
  return (dispatch) => {
    dispatch(destroy(form));
    dispatch({
      type: ACTIVE_SEARCH.STATE.RESET_FORM_FIELDS
    });
  };
}

const transformSearchValue = (str) => str.replace(/\s/g, ' ')
  .replace(/\s*;\s*/g, ';')
  .replace(/(\s*;\s*)*$/g, '')
  .replace(/;/g, '|');

export function searchMembers() {

  return (dispatch, getState) => {
    const formFields = getState().form.get('membersSearch') && getState().form.get('membersSearch').toJS();
    const ffBirthMonth = R.path('PERSONAL_INFO.BIRTH_MONTH', formFields);
    const ffPhysician = R.path('PERSONAL_INFO.PHYSICIAN', formFields);
    const ffPharmacist = R.path('PERSONAL_INFO.PHARMACIST', formFields);
    const symptom = 'none';
    const limit = ACTIVE_SEARCH.QUERY.LIMIT;
    const offset = 0;
    const organization = window.localStorage[LOCAL_STORAGE_KEY.USER_ORGANIZATION_ID];

    if (ffBirthMonth) {
      ffBirthMonth.value = CALENDAR.MONTH_LABELS.indexOf(ffBirthMonth.value) + 1 || null;
    }

    if (ffPhysician &&
      ffPhysician.value) {
      ffPhysician.value = transformSearchValue(ffPhysician.value);
    }

    if (ffPharmacist &&
      ffPharmacist.value) {
      ffPharmacist.value = transformSearchValue(ffPharmacist.value);
    }

    const filter = R.pipe(
        transformFormFieldsToDBFields(formFields),
        R.mixin({
          sort: 'createdTimestamp',
          symptom: symptom ? symptom.toLowerCase() : null
        })
      )(MEMBERS_SEARCH.FORM_FIELDS);

    return dispatch({
      types: [
        ACTIVE_SEARCH.STATE.REQUEST_SEARCH_MEMBERS,
        ACTIVE_SEARCH.STATE.RESOLVE_SEARCH_MEMBERS,
        ACTIVE_SEARCH.STATE.REJECT_SEARCH_MEMBERS
      ],
      payload: {
        promise: searchMembersApi(organization, filter, offset, limit)
          .then((res) => res.rows)
      }
    });
  };
}

export function onDropDownChange(selector, value) {
  return {
    type: ACTIVE_SEARCH.STATE.SELECT_DROPDOWN,
    payload: {
      selector: selector,
      value: value
    }
  };
}

export function sortLastTestTaken() {
  return {
    type: ACTIVE_SEARCH.STATE.SORT_BY_LAST_TEST_TAKEN
  };
}

