/* eslint-disable global-require */
import React from 'react';
import {Route, Switch} from 'react-router-dom';
// import components
import App from './modules/App/App';
import Phonebook from "./modules/Phonebook/Phonebook";

// Route Paths
export const HomePath = '/';


if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
}

export default (
  <div>
    <App>
      <Switch>
        <Route exact path={HomePath} component={Phonebook} />
      </Switch>
    </App>
  </div>
);
