import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';

const { Header: HeaderAnt } = Layout;

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <HeaderAnt className={classes.header}>
        <div className={classes.logo} />
      </HeaderAnt>
    );
  }
}

const styles = {
  header: {
    padding: '0 25px'
  },
  logo: {
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px 28px 16px 0',
    float: 'left'
  },
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Header);
