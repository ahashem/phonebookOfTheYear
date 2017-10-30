import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import MenuItemLink from './MenuItemLink';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
  },
};

const Menu = ({ onMenuTap, resources, logout }) => (
  <div style={styles.main}>
    {resources
      .filter(r => r.list)
      .map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={resource.name}
          leftIcon={<resource.icon />}
          onTouchTap={onMenuTap}
        />
      ))}
    {logout}
  </div>
);

Menu.propTypes = {
  hasDashboard: PropTypes.bool,
  logout: PropTypes.element,
  onMenuTap: PropTypes.func,
  resources: PropTypes.array.isRequired,
};

Menu.defaultProps = {
  onMenuTap: () => null,
};

const enhance = compose(pure);

export default enhance(Menu);
