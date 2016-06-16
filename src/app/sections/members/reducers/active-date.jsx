import { fromJS } from 'immutable';
import { requestMembers } from './active-members.jsx';

/* Constants */

const SELECTED_DATE_CHANGE = 'SELECTED_DATE_CHANGE';

/* Reducer */

const initialState = fromJS({
  dates: [
    'Day', '3 Day', 'Week', 'Month', '3 Month', '6 Month', '1 Year'
  ],
  selected: 'Week'
});

function dateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECTED_DATE_CHANGE:
      return state.set('selected', action.payload);

    default:
      return state;
  }
}

export default dateReducer;

/* Actions */

export function selectedDateChange(date) {

  // THIS MUST BE DONE BEFORE requestMembers - as the date needs to be set first
  return (dispatch) => {
    dispatch({
      type: SELECTED_DATE_CHANGE,
      payload: date
    });

    dispatch(requestMembers(date));
  };
}
