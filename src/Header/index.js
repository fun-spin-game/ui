import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Icon } from 'antd';
import Coins from '../common/Coins';

const { Header: HeaderAnt } = Layout;

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <HeaderAnt className={classes.header}>
        <div className={classes.logo} />
        <div className={classes.rightBlock}>
          <span className={classes.balance}>
            Balance:
            <span className={classes.balanceAmount}>
              <Coins /> 250 <a>
              <Icon type="plus-circle-o" />
              </a>
            </span>
          </span>
          <span className={classes.userName}>Vadym Bondarenko</span>
          <Icon type="logout" className={classes.logOut} />
        </div>
      </HeaderAnt>
    );
  }
}

const styles = {
  header: {
    overflow: 'auto',
    width: '100%',
    position: 'fixed',
    'z-index': 10,
    color: 'white',
  },
  logo: {
    float: 'left',
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
    'margin-left': '-25px',
  },
  logOut: {
    'font-size': '25px',
    'cursor': 'pointer',
    'vertical-align': 'sub',
    'padding-left': '10px'
  },
  rightBlock: {
    float: 'right'
  },
  userName: {
    'padding-left': '50px',
  },
  balanceAmount: {
    'font-size': '20px',
    'margin-left': '10px'
  }
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Header);
