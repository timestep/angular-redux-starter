import { fromJS } from 'immutable';
import { ACTIVE_FILTER } from '../utils/constants.jsx';

/* Reducer */

const initialState = fromJS({
  currentlySelectedFilters: [],
  filterIsActive: false,
  filters: [
    ACTIVE_FILTER.TYPE.ALBUTEROL_USE,
    ACTIVE_FILTER.TYPE.COUGH_WHEEZE,
    ACTIVE_FILTER.TYPE.ER_VISIT,
    ACTIVE_FILTER.TYPE.LIMITED_ACTIVITES,
    ACTIVE_FILTER.TYPE.NOCTURNAL_ASTHMA,
    ACTIVE_FILTER.TYPE.STEROID_USE
  ]
});

function filterReducer(state = initialState, action = {}) {
  switch (action.type) {

    case ACTIVE_FILTER.STATE.ADD_FILTER_TO_SELECTED_LIST:
      return state.updateIn(['currentlySelectedFilters'], list => list.push(action.payload));

    case ACTIVE_FILTER.STATE.REMOVE_FILTER_TO_SELECTED_LIST:
      return state.updateIn(['currentlySelectedFilters'], list => {
        return list.filter((selectedFilter) => selectedFilter !== action.payload);
      });

    case ACTIVE_FILTER.STATE.FILTER_TOGGLE_CHANGE:
      return state.set('filterIsActive', !action.payload);

    default:
      return state;
  }
}

export default filterReducer;

/* Actions */

export function filterCheckboxHandler(selection) {
  return (dispatch, getState) => {
    const currentlySelectedFilters = getState().activeFilter.get('currentlySelectedFilters');
    const type = currentlySelectedFilters.find((val) => val === selection) ?
      ACTIVE_FILTER.STATE.REMOVE_FILTER_TO_SELECTED_LIST :
      ACTIVE_FILTER.STATE.ADD_FILTER_TO_SELECTED_LIST;

    return dispatch({
      type: type,
      payload: selection
    });
  };
}

export function filterToggle(bool) {
  return {
    type: ACTIVE_FILTER.STATE.FILTER_TOGGLE_CHANGE,
    payload: bool
  };
}
