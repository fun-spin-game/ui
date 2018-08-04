import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout, Menu } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose } from 'recompose';
import RightBlock from './RightBlock';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

export const TOP_MENU_ITEMS = [
  {
    route: '/statistic',
    translateId: 'STATISTIC',
    iconType: 'area-chart',
  },
  {
    route: '/payments',
    translateId: 'PAYMENTS',
    iconType: 'credit-card',
  },
  {
    route: '/about',
    translateId: 'ABOUT_US',
    iconType: 'book',
  }
];

const { Header: HeaderAnt } = Layout;

const Header = ({
  classes,
  translate,
  location: { pathname },
}) => {
  return (
    <HeaderAnt className={classes.header}>
      <div className={classes.logo} />
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
            TOP_MENU_ITEMS.map(o => (
              <Menu.Item className="ant-menu-item" key={o.route}>
                <Link to={o.route}>
                  <span>{translate(o.translateId)}</span>
                </Link>
              </Menu.Item>
            ))
          }
        </Menu>
        <RightBlock />
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
    '@media(max-width: 400px)': {
      width: '100%',
      paddingRight: 20,
      paddingLeft: 0,
    }
  },
  topMenu: {
    '& .ant-menu-item': {
      color: 'white !important',
    },
    '@media(max-width: 400px)': {
      display: 'none'
    },
  },
  logo: {
    width: '100px',
    height: '31px',
    background: 'rgba(255,255,255,.2)',
    margin: '16px',
    '@media(min-width: 400px)': {
      'margin-left': '-25px',
    }
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'flex-end',
  }
};

Header.defaultProps = {
  userData: null,
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withRouter,
  withLocalize,
  injectSheet(styles),
)(Header);
