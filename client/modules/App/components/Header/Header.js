import React from 'react';
import PropTypes from 'prop-types';

// Import Style
import styles from './Header.css';
import { Link } from 'react-router-dom';

export function Header(props, context) {
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to="/">Phonebook</Link>
        </h1>
      </div>
    </div>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {};

export default Header;
