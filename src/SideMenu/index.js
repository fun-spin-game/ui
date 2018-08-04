import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { branch, compose, renderComponent } from 'recompose'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'
import { withLocalize } from 'react-localize-redux';
import { TOP_MENU_ITEMS } from '../Header';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
  render() {
    const {
      classes,
      className,
      collapsed,
      onCollapse,
      location: { pathname },
      translate,
    } = this.props;
    return (
      <Sider
        className={`${classes.sider} ${className}`}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Menu theme="dark" selectedKeys={[pathname]} mode="inline">
          <Menu.Item key="/" className={classes.menuFirstItem}>
            <Link to="/">
              <Icon type="smile-o" />
              <span>{translate('LOTS')}</span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>{translate('OTHERS')}...</span></span>}>
          {
            TOP_MENU_ITEMS.map(o => (
              <Menu.Item className="ant-menu-item" key={o.route}>
                <Link to={o.route}>
                  <Icon type={o.iconType} />
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}

const styles = {
  sider: {
    height: '100vh',
    zIndex: 20,
  },
  menuFirstItem: {
    'margin-top': '0 !important',
  },
  logo: {
    width: '150px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
  },
};

export default compose(
  withRouter,
  withLocalize,
  injectSheet(styles),
  branch(
    ({ location: { pathname } }) => pathname === '/login',
    renderComponent(() => null),
  )
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
