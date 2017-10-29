/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

// Import Routes
import routes from './routes';

const history = createHistory();

// Base stylesheet
require('./main.css');

const AppWithRouter = props => {
  return (
    <Provider store={props.store}>
      <Router history={history}>{routes}</Router>
    </Provider>
  );
};

AppWithRouter.propTypes = {
  store: PropTypes.object.isRequired,
};

export default AppWithRouter;
