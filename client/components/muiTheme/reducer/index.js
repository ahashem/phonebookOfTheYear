import { combineReducers } from 'redux';
import ui from './ui';

export default () => {
  return combineReducers({
    // nested reducers under 'muiTheme' reducer
    ui,
  });
};
