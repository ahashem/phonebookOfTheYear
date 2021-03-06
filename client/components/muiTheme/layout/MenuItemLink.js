import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MenuItem from 'material-ui/MenuItem';
import { withRouter } from 'react-router-dom';

export class MenuItemLinkComponent extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    onTouchTap: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
  };

  handleMenuTap = () => {
    this.props.history.push(this.props.to);
    this.props.onTouchTap(); // handle tab events in case of mobile device access - Not Important now
  };
  render() {
    const { history, match, location, staticContext, ...props } = this.props; // eslint-disable-line

    return <MenuItem {...props} onTouchTap={this.handleMenuTap} />;
  }
}

export default withRouter(MenuItemLinkComponent);
