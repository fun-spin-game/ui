import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router'
import withUser from '../containers/withUser'

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

PrivateRoute.defaultProps = {
  userInfo: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
}

export default withUser()(PrivateRoute);
