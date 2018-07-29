import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import { Switch } from 'react-router';
import { compose, branch, renderComponent, lifecycle, withState } from 'recompose';
import { withRouter } from 'react-router'
import AuthenticatedRoute from './common/AuthenticatedRoute';
import NotAuthenticatedRoute from './common/NotAuthenticatedRoute';
import SideMenu from './SideMenu';
import withUser from './containers/withUser';
import withGames from './containers/withGames';
import Main from './Main';
import Header from './Header';
import Content from './Content';
import Login from './Login';
import Statistic from './Statistic';

const Routes = ({
  classes,
  collapsedSideMenu,
  setCollapsedSideMenu,
  location: { pathname },
}) => {
  return (
    <Layout className="layout">
      <SideMenu
        className={classes.sideMenu}
        collapsed={collapsedSideMenu}
        onCollapse={() => { setCollapsedSideMenu(!collapsedSideMenu) }}
      />
      <Layout>
        <Header />
        <Content className={classNames(classes.content, { 'collapsed-mode': collapsedSideMenu, withoutSideBar: pathname === '/login' })}>
          <Switch>
            <AuthenticatedRoute exact path="/" component={Main} />
            <AuthenticatedRoute exact path="/statistic" component={Statistic} />
            <NotAuthenticatedRoute path="/login" component={Login} />
          </Switch>
        </Content>
      </Layout>
    </Layout>

  );
};

const styles = {
  content: {
    'margin-top': 64,
    marginLeft: 200,
    transition: 'all .2s',
    '&.collapsed-mode': {
      'margin-left': 80,
    },
    '&.withoutSideBar': {
      marginLeft: '0 !important',
    }
  },
  sideMenu: {
    overflow: 'auto',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 64,
  },
};

export default compose(
  withRouter,
  injectSheet(styles),
  withUser(),
  withGames(),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo();
      window.onblur = () => this.props.setAppInFocus(false);
      window.onfocus = () => this.props.setAppInFocus(true);
    }
  }),
  withState('collapsedSideMenu', 'setCollapsedSideMenu', true),
  branch(
    ({ userInfoRequestDone }) => !userInfoRequestDone,
    renderComponent(() => null),
  ),
)(Routes);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  collapsedSideMenu: PropTypes.bool.isRequired,
  setCollapsedSideMenu: PropTypes.func.isRequired,
}
