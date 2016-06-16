import { applyMiddleware, createStore, compose} from 'redux';
import {Component} from 'react';
import {Iterable} from 'immutable';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import Router from './containers/Router.jsx';
import promiseMiddleware from './middleware/promiseMiddleware.jsx';
import rootReducer from './reducers/index.jsx';

// This enables redux-logger during development environment
const middlewares = [thunk, promiseMiddleware];

// Use to convert Immutable object to plain JS for the redux-logger
const stateTransformer = (state) => {
  return Object.keys(state).reduce((newState, key) => {
    const val = state[key];
    newState[key] = Iterable.isIterable(val) ? val.toJS() : val;
    return newState;
  }, {});
};

// redux-logger should run only during development
if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('redux-logger');
  const logger = createLogger({
    stateTransformer,
    collapsed: true
  });
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

export default class MembersApp extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }

}
