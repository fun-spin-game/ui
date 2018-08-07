import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose } from 'recompose'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'
import { withLocalize } from 'react-localize-redux';
import { TOP_MENU_ITEMS } from '../Header';
import withUser from '../containers/withUser';
import classNames from "classnames";

const { Sider } = Layout;

class SideMenu extends Component {
  render() {
    const {
      classes,
      className,
      collapsed,
      onCollapse,
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
              loginPage: pathname === '/login'
            }
          )
        }
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Menu
          theme="dark"
          selectedKeys={[pathname]}
          mode="inline"
          className={classNames(classes.menu)}
        >
          {
            userInfo && (
              <Menu.Item
                className={classNames(
                  classes.menuFirstItem
                )}
                key={'/'}
              >
                <Link to={'/'}>
                  <Icon type={'smile-o'} />
                  <span>{translate('LOTS')}</span>
                </Link>
              </Menu.Item>
            )
          }
          {
            userInfo && (
              <Menu.Item
                className={classNames(
                  classes.menuFirstItem
                )}
                key={'/withdraw'}
              >
                <Link to={'/withdraw'}>
                  <Icon type={'credit-card'} />
                  <span>{translate('WITHDRAW')}</span>
                </Link>
              </Menu.Item>
            )
          }
          {
            TOP_MENU_ITEMS.filter(o => o.route !== '/login' || !userInfo).map(o => (
              <Menu.Item className={classes.topMenuDuplicateItem} key={o.route}>
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
    height: '100vh',
    zIndex: 20,
    '&.loginPage': {
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
)(SideMenu);

SideMenu.defaultProps = {
  className: '',
};

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  className: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
};
