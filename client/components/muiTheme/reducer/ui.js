import { TOGGLE_SIDEBAR, SET_SIDEBAR_VISIBILITY } from '../actions';

const initialState = {
  sidebarOpen: false,
  loading: false,
};

const ACTION_HANDLERS = {
  [TOGGLE_SIDEBAR]: (state, action) => {
    return { ...state, sidebarOpen: !state.sidebarOpen };
  },
  [SET_SIDEBAR_VISIBILITY]: (state, action) => {
    return { ...state, sidebarOpen: action.payload };
  },
};

const UIReducer = (state = initialState, { type, payload }) => {
  const handler = ACTION_HANDLERS[type];

  return handler ? handler(state, { type, payload }) : state;
};

// Get sidebar is open status
export const getSidebarOpen = state => state.sidebarOpen;

export default UIReducer;
