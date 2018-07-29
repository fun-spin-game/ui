import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, withStateHandlers, branch, renderComponent } from 'recompose';
import SignIn from './SignIn';
import SignUp from './SignUp';
import withUser from '../containers/withUser';

const Form = branch(
  ({ signInMode }) => signInMode,
  renderComponent(SignIn),
  renderComponent(SignUp),
)();

const Login = ({ classes, toggleSignInMode, signInMode }) => {
  return (
    <div className={classes.content}>
      <Form signInMode={signInMode} toggleSignInMode={toggleSignInMode} />
    </div>
  )
}

const styles = {
  content: {
    display: 'flex',
    'justify-content': 'center',
    paddingTop: 165,
  },
};

export default compose(
  injectSheet(styles),
  withUser(),
  withStateHandlers(
    () => ({
      signInMode: false,
    }),
    {
      toggleSignInMode: ({ signInMode }) => () => ({
        signInMode: !signInMode,
      })
    }
  )
)(Login);

Login.defaultProps = {
  userInfo: null,
};

Login.propTypes = {
  userInfo: PropTypes.object,
  signInMode: PropTypes.bool.isRequired,
  toggleSignInMode: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
