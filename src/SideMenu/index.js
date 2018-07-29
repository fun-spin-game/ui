import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { branch, compose, renderComponent } from 'recompose'
import { Link } from 'react-router-dom'
import { Layout, Icon, Menu } from 'antd';
import { withRouter } from 'react-router'

const { Sider } = Layout;

class SideMenu extends Component {
  render() {
    const { classes, className, collapsed, onCollapse, location: { pathname } } = this.props;
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
              <span>Lots</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="/statistic">
            <Link to="/statistic">
              <Icon type="area-chart" />
              <span>Statistic</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }
}

const styles = {
  sider: {
    height: '100vh',
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
};
