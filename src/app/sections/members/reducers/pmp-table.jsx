import { fromJS } from 'immutable';

/* Constants */

const INITIAL_STATE = fromJS({
  tableDimensions: {
    width: 0,
    height: 0
  }
});

const TABLE_RESIZE = 'TABLE_RESIZE';

/* Reducer */

const pmpTableReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case TABLE_RESIZE:
      return state.merge(fromJS({
        tableDimensions: {
          width: action.payload.width,
          height: action.payload.height
        }
      }));

    default:
      return state;
  }
};

/* Actions */

const tableResize = (width, height) => {
  return {
    type: TABLE_RESIZE,
    payload: {
      width: width,
      height: height
    }
  };
};

export {
  pmpTableReducer as default,
  tableResize
};
