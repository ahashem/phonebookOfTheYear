/**
 * Client entry point
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from './store';
import 'font-awesome/css/font-awesome.min.css';

// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
const mountApp = document.getElementById('root');

let render = () => {
  require('react-hot-loader/patch');
  const AppContainer = require('react-hot-loader').AppContainer;
  const AppWithRouter = require('./AppRouter').default;

  ReactDOM.render(
    <AppContainer>
      <AppWithRouter store={store} />
    </AppContainer>,
    mountApp
  );
};
// For hot reloading of react components
// Development Tools
// ------------------------------------
if (__DEV__) {
  if (module.hot) {
    const renderApp = render;
    const renderError = error => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, mountApp);
    };

    render = () => {
      try {
        renderApp();
      } catch (e) {
        console.error(e);
        renderError(e);
      }
    };

    // Setup hot module replacement
    module.hot.accept(['react-hot-loader'.AppContainer, './AppRouter'], () =>
      setImmediate(() => {
        ReactDOM.unmountComponentAtNode(mountApp);
        render();
      })
    );
  }
}

// NOW .. render :)
// ------------------------------------
if (!__TEST__) render();
