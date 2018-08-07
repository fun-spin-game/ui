import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from 'react-jss'
import { renderToStaticMarkup } from 'react-dom/server';
import { Layout } from 'antd';
import { Switch } from 'react-router';
import { withLocalize } from 'react-localize-redux';
import { compose, branch, renderComponent, lifecycle, withState } from 'recompose';
import { withRouter, Route } from 'react-router'
import Cookie from 'js-cookie';
import AuthenticatedRoute from './common/AuthenticatedRoute';
import NotAuthenticatedRoute from './common/NotAuthenticatedRoute';
import Footer from './Footer';
import SideMenu from './SideMenu';
import withUser from './containers/withUser';
import withGames from './containers/withGames';
import localization from './localization';
import Main from './Main';
import Header from './Header';
import Content from './Content';
import Login from './Login';
import Statistic from './Statistic';
import Withdraws from './Withdraws';
import Contacts from './Contacts';
import HowToPlay from './HowToPlay';
import Withdraw from './Withdraw';


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
        <div
          className={classNames(
            classes.content, {
            'collapsed-mode': collapsedSideMenu,
            loginPage: pathname === '/login'
          })}
        >
          <Content>
            <Switch>
              <AuthenticatedRoute exact path="/" component={Main} />
              <AuthenticatedRoute exact path="/withdraw" component={Withdraw} />
              <Route exact path="/statistic" component={Statistic} />
              <Route exact path="/withdraws" component={Withdraws} />
              <Route exact path="/contacts" component={Contacts} />
              <Route exact path="/how-to-play" component={HowToPlay} />
              <NotAuthenticatedRoute path="/login" component={Login} />
            </Switch>
          </Content>
          <Footer />
        </div>
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
    '&.loginPage': {
      '@media(min-width: 1101px)': {
        marginLeft: '0 !important',
      },
    },
    '@media(max-width: 600px)': {
      marginLeft: 80,
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
  withLocalize,
  injectSheet(styles),
  withUser(),
  withGames(),
  lifecycle({
    componentDidMount() {
      let browserLanguage = (navigator.language || navigator.userLanguage).split('-')[0];
      if (browserLanguage !== 'ru') browserLanguage = 'gb';
      this.props.getUserInfo();
      window.onblur = () => this.props.setAppInFocus(false);
      window.onfocus = () => this.props.setAppInFocus(true);
      this.props.initialize({
        languages: [
          { label: 'EN', code: 'gb' },
          { label: 'RU', code: 'ru' }
        ],
        translation: localization,
        options: { renderToStaticMarkup, renderInnerHtml: true },
      });
      this.props.setActiveLanguage(Cookie.get('language') || browserLanguage);
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
  initialize: PropTypes.func.isRequired,
}
