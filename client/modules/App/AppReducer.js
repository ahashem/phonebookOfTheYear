// Import Actions

// Initial State
import { LOADING, LOADING_COMPLETED } from './AppActions';

const initialState = {
  isLoading: false,
};

const ACTION_HANDLERS = {
  [LOADING]: (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  },
  [LOADING_COMPLETED]: (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  },
};

const AppReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};

/* Selectors */
export const isLoading = state => state.app.isLoading;

// Export Reducer
export default AppReducer;
