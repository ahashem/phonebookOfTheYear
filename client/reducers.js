/**
 * Root Reducer
 */
import {combineReducers} from 'redux';
// Import Reducers
import app from './modules/App/AppReducer';
import Phonebook from './modules/Phonebook/PhonebookReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  Phonebook,
});
