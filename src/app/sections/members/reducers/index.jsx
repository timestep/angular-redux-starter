import activeDate from './active-date.jsx';
import activeFilter from './active-filter.jsx';
import activeMembers from './active-members.jsx';
import activeMember from './active-member.jsx';
import activeSymptom from './active-symptom.jsx';
import activeSeverity from './active-severity.jsx';
import loading from './loading.jsx';
import notification from './notifications.jsx';
import pmpTable from './pmp-table.jsx';
import router from './router.jsx';
import search from './search.jsx';

import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';
import Immutable from 'immutable';

const rootReducer = combineReducers({
  activeDate,
  activeFilter,
  activeMembers,
  activeMember,
  activeSymptom,
  activeSeverity,
  form: (state = Immutable.fromJS({}), action) => {
    return Immutable.fromJS(formReducer(state.toJS(), action));
  },
  loading,
  notification,
  pmpTable,
  router,
  search
});

export default rootReducer;
