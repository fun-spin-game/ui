import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, pure } from 'recompose'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'
import { withLocalize } from 'react-localize-redux';
import { TOP_MENU_ITEMS } from '../Header';
import withUser from '../containers/withUser';
import classNames from 'classnames';

const { Sider } = Layout;

const SIDE_MENU_ITEMS = [
  {
    route: '/',
    translateId: 'LOTS',
    iconType: 'smile-o',
  },
  {
    route: '/withdraw',
    translateId: 'WITHDRAW',
    iconType: 'credit-card',
  },
  {
    route: '/by-coins',
    translateId: 'BY_COINS',
    iconType: 'shopping-cart',
  },
];

class SideMenu extends Component {
  render() {
    const {
      classes,
      className,
      collapsed,
      setCollapsedSideMenu,
      location: { pathname },
      translate,
      userInfo,
    } = this.props;
    return (
      <Sider
        className={
          classNames(
            'sideMenu',
            classes.content,
            classes.sider,
            className,
            {
              collapsed: collapsed,
              notAuthenticated: !userInfo,
            }
          )
        }
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsedSideMenu}
      >
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          className={classNames(classes.menu)}
        >
          {
            userInfo && SIDE_MENU_ITEMS.map(o => (
              <Menu.Item key={o.route} onClick={() => setCollapsedSideMenu(true)}>
                <Link to={o.route}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
          {
            TOP_MENU_ITEMS.filter(o => o.route !== '/login' || !userInfo).map(o => (
              <Menu.Item className={classes.topMenuDuplicateItem} onClick={() => setCollapsedSideMenu(true)} key={o.route}>
                <Link to={o.route}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
      </Sider>
    )
  }
}

const styles = {
  sider: {
    height: 'calc(100vh - 66px)',
    zIndex: 20,
    overflow: 'auto',
    position: 'fixed',
    left: 0,
    top: 64,
    '&.collapsed': {
      '@media(max-width: 666px)': {
        display: 'none',
      },
    },
    '&.notAuthenticated': {
      '@media(min-width: 1101px)': {
        display: 'none',
      },
    }
  },
  menu: {
    '& .ant-menu-item:first-child': {
      marginTop: 0,
    },
    'margin-top': '0 !important',
  },
  logo: {
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
  },
  topMenuDuplicateItem: {
    '@media(min-width: 1101px)': {
      display: 'none'
    }
  }
};

export default compose(
  withRouter,
  withUser(),
  withLocalize,
  injectSheet(styles),
  pure
)(SideMenu);

SideMenu.defaultProps = {
  className: '',
  userInfo: null,
};

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  userInfo: PropTypes.object,
  className: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
