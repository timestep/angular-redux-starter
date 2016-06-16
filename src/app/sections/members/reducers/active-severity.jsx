import { fromJS } from 'immutable';
import { ACTIVE_SEVERITY } from '../utils/constants.jsx';
import { unSelectSearch } from './search.jsx';

/* Reducer */

const initialState = fromJS({
  categories: [
    ACTIVE_SEVERITY.CATEGORIES.ALL_SEVERITIES,
    ACTIVE_SEVERITY.CATEGORIES.OUT_OF_CONTROL,
    ACTIVE_SEVERITY.CATEGORIES.VERY_HIGH,
    ACTIVE_SEVERITY.CATEGORIES.HIGH,
    ACTIVE_SEVERITY.CATEGORIES.MODERATE,
    ACTIVE_SEVERITY.CATEGORIES.LOW
  ],
  selected: ACTIVE_SEVERITY.CATEGORIES.ALL_SEVERITIES
});

function severityReducer(state = initialState, action = {}) {
  switch (action.type) {

    case ACTIVE_SEVERITY.STATE.SELECT_SEVERITY:
    case ACTIVE_SEVERITY.STATE.UNSELECT_SEVERITY:
      return state.set('selected', action.payload);

    default:
      return state;
  }
}

export default severityReducer;

/* Actions */

export function selectSeverity(severity) {
  return (dispatch) => {
    dispatch(unSelectSearch());
    dispatch({
      type: ACTIVE_SEVERITY.STATE.SELECT_SEVERITY,
      payload: severity
    });
  };
}

export function unSelectSeverity() {
  return {
    type: ACTIVE_SEVERITY.STATE.UNSELECT_SEVERITY,
    payload: ''
  };
}
