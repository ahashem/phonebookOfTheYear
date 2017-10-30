import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MuiThemeProvider } from 'material-ui/styles';
import { withRouter } from 'react-router-dom';
// Import Style
// import styles from './App.css';
// Import Components
import Helmet from 'react-helmet';
import compose from 'recompose/compose';
import autoprefixer from 'material-ui/utils/autoprefixer';
import CircularProgress from 'material-ui/CircularProgress';
import withWidth from 'material-ui/utils/withWidth';
import DevTools from './components/DevTools';
import AppBar from '../../components/muiTheme/layout/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// Import Actions
import { setSidebarVisibility } from '../../components/muiTheme/actions';
import { isLoading } from './AppReducer';

// TODO: move
const styles = {
  wrapper: {
    // Avoid IE bug with Flexbox (and maybe iphone as well)
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  body: {
    backgroundColor: '#edecec',
    display: 'flex',
    flex: 1,
    overflowY: 'hidden',
    overflowX: 'scroll',
  },
  bodySmall: {
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: '2em',
  },
  contentSmall: {
    flex: 1,
    paddingTop: '3em',
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
    zIndex: 1200,
  },
};

const prefixedStyles = {};

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    const { authClient, customRoutes, isLoading, width, children } = this.props;
    const muiTheme = getMuiTheme();
    if (!prefixedStyles.main) {
      // do this once because user agent never changes
      const prefix = autoprefixer(muiTheme);
      prefixedStyles.wrapper = prefix(styles.wrapper);
      prefixedStyles.main = prefix(styles.main);
      prefixedStyles.body = prefix(styles.body);
      prefixedStyles.bodySmall = prefix(styles.bodySmall);
      prefixedStyles.content = prefix(styles.content);
      prefixedStyles.contentSmall = prefix(styles.contentSmall);
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {this.state.isMounted &&
            !window.devToolsExtension &&
            process.env.NODE_ENV === 'development' && <DevTools />}
          <div>
            <Helmet
              title="Phonebook"
              titleTemplate="%s - Phonebook"
              meta={[
                { charset: 'utf-8' },
                {
                  'http-equiv': 'X-UA-Compatible',
                  content: 'IE=edge',
                },
                {
                  name: 'viewport',
                  content: 'width=device-width, initial-scale=1',
                },
              ]}
            />
            <div style={prefixedStyles.wrapper}>
              <div style={prefixedStyles.main}>
                {width !== 1 && <AppBar title="Phonebook" />}
                <div
                  className="body"
                  style={
                    width === 1 ? prefixedStyles.bodySmall : prefixedStyles.body
                  }
                >
                  <div
                    style={
                      width === 1
                        ? prefixedStyles.contentSmall
                        : prefixedStyles.content
                    }
                  >
                    {children}
                  </div>
                </div>
                {isLoading && (
                  <CircularProgress
                    className="app-loader"
                    color="#fff"
                    size={width === 1 ? 20 : 30}
                    thickness={2}
                    style={styles.loader}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

// Retrieve data from store as props
const mapStateToProps = state => {
  return {
    isLoading: isLoading(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSidebarVisibility: () => dispatch(setSidebarVisibility()),
  };
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withWidth()
);

export default withRouter(enhance(App));
