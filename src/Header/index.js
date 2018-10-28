import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Menu, Icon } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose, pure } from 'recompose';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import withUser from '../containers/withUser';
import RightBlock from './RightBlock';

export const TOP_MENU_ITEMS = [
  {
    route: '/home',
    translateId: 'ABOUT_THE_GAME',
    iconType: 'home',
  },
  {
    route: '/login',
    translateId: 'REGISTRATION',
    iconType: 'solution',
  },
  {
    route: '/how-to-play',
    translateId: 'HOW_TO_PLAY',
    iconType: 'question',
  },
  {
    route: '/statistic',
    translateId: 'STATISTIC',
    iconType: 'area-chart',
  },
  {
    route: '/withdraws',
    translateId: 'WITHDRAWS',
    iconType: 'wallet',
  },
  {
    route: '/contacts',
    translateId: 'CONTACTS',
    iconType: 'book',
  },
];

const { Header: HeaderAnt } = Layout;

const Header = ({
  classes,
  translate,
  location: { pathname },
  userInfo,
  setCollapsedSideMenu,
  collapsedSideMenu,
}) => {
  return (
    <HeaderAnt className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">FunSpin</Link>
      </div>
      <div className={classes.headerContent}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}
          className={classes.topMenu}
          selectedKeys={[pathname]}
        >
          {
            TOP_MENU_ITEMS
              .filter(o => o.route !== '/login' || !userInfo).map(o => (
              <Menu.Item className="ant-menu-item" key={o.route}>
                <Link to={o.route}>
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
        <RightBlock />
        <Icon
          className={classes.trigger}
          type={collapsedSideMenu ? 'menu-unfold' : 'menu-fold'}
          onClick={setCollapsedSideMenu}
        />
     </div>
    </HeaderAnt>
  );
}

const styles = {
  header: {
    overflow: 'auto',
    width: '100%',
    position: 'fixed',
    'z-index': 10,
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    '@media(max-width: 666px)': {
      width: '100%',
      paddingRight: 20,
      paddingLeft: 0,
    }
  },
  topMenu: {
    '& .ant-menu-item': {
      color: 'white !important',
    },
    '@media(max-width: 1100px)': {
      display: 'none'
    },
  },
  logo: {
    fontFamily: 'Satisfy',
    fontSize: 32,
    alignSelf: 'center',
    // background: 'rgba(255,255,255,.2)',
    marginRight: '16px',
    '@media(min-width: 667px)': {
      'margin-left': '-25px',
    },
    '& > a': {
      textDecoration: 'none',
      color: 'white',
    },
    '@media(max-width: 600px)': {
      fontSize: 20,
      marginLeft: 10
    }
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  trigger: {
    fontSize: '18px',
    lineHeight: '64px',
    cursor: 'pointer',
    padding: '0 20px',
    marginRight: -20,
    transition: 'color .3s',
    '@media(min-width: 667px)': {
      display: 'none',
    },
  }
};

Header.defaultProps = {
  userData: null,
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
  collapsedSideMenu: PropTypes.bool.isRequired,
  translate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
};

export default compose(
  withRouter,
  withUser(),
  withLocalize,
  injectSheet(styles),
  pure,
)(Header);
