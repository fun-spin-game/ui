import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'
import withUser from '../redux/user/withUser'

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
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
