import { fromJS } from 'immutable';
import { ACTIVE_SYMPTOM } from '../utils/constants.jsx';
import { requestMembers } from './active-members.jsx';
import { searchMembers } from './search.jsx';

/* Reducer */

const initialState = fromJS({
  options: [
    ACTIVE_SYMPTOM.CATEGORIES.ALLERGY,
    ACTIVE_SYMPTOM.CATEGORIES.ASTHMA,
    ACTIVE_SYMPTOM.CATEGORIES.ARTHRITIS,
    ACTIVE_SYMPTOM.CATEGORIES.MIGRAINE
  ],
  selected: ACTIVE_SYMPTOM.CATEGORIES.ALLERGY
});

function symptomReducer(state = initialState, action = {}) {
  switch (action.type) {
    case ACTIVE_SYMPTOM.STATE.SELECTED_SYMPTOM_CHANGE:
      return state.set('selected', action.payload);

    default:
      return state;
  }
}

export default symptomReducer;

/* Actions */

export function selectedSymptomChange(symptom) {
  return (dispatch, getState) => {

    const isSearchSelected = getState().search.get('isSearchSelected');

    dispatch({
      type: ACTIVE_SYMPTOM.STATE.SELECTED_SYMPTOM_CHANGE,
      payload: symptom
    });

    if (isSearchSelected) {
      dispatch(searchMembers());
    } else {
      dispatch(requestMembers());
    }
  };
}
