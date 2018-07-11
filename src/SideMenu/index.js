import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Icon, Menu } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class SideMenu extends Component {
  render() {
    const { classes, className, collapsed, onCollapse } = this.props;

    return (
      <Sider
        className={`${classes.sider} ${className}`}
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" className={classes.menuFirstItem}>
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={<span><Icon type="user" /><span>User</span></span>}
          >
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={<span><Icon type="team" /><span>Team</span></span>}
          >
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9">
            <Icon type="file" />
            <span>File</span>
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

export default injectSheet(styles)(SideMenu);

SideMenu.defaultProps = {
  className: '',
};

SideMenu.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired,
};
