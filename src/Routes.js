import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router';
import { compose, branch, renderComponent, lifecycle } from 'recompose';
import AuthenticatedRoute from './common/AuthenticatedRoute';
import NotAuthenticatedRoute from './common/NotAuthenticatedRoute';
import withUser from './redux/user/withUser';
import Main from './Main';
import Login from './Login';
import { ConnectedRouter } from 'connected-react-router'

const Routes = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <AuthenticatedRoute exact path="/" component={Main} />
        <NotAuthenticatedRoute path="/login" component={Login} />
      </Switch>
    </ConnectedRouter>
  );
};

export default compose(
  withUser(),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo();
    }
  }),
  branch(
    ({ userInfoRequestDone }) => !userInfoRequestDone,
    renderComponent(() => null),
  ),
)(Routes);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
}
