import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { compose, withStateHandlers, branch, renderComponent, pure } from 'recompose';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Translate, withLocalize } from 'react-localize-redux';
import withUser from '../containers/withUser';

const Form = branch(
  ({ signInMode }) => signInMode,
  renderComponent(SignIn),
  renderComponent(SignUp),
)();

const Login = ({ classes, toggleSignInMode, signInMode }) => {
  return (
    <div className={classes.content}>
      <h3 className={classes.title}><Translate id="TRY_YOUR_LUCK" />!</h3>
      <div className={classes.formWrapper}>
        <Form signInMode={signInMode} toggleSignInMode={toggleSignInMode} />
      </div>
    </div>
  )
}

const styles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    'justify-content': 'center',
    textAlign: 'center'
  },
  title: {
    fontFamily: 'Lobster',
    fontSize: 60,
    color: '#001529',
    '@media(max-width: 400px)': {
      fontSize: 40,
    }
  },
  formWrapper: {
    display: 'flex',
    justifyContent: 'center',
  }
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
  ),
  withLocalize,
  pure
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
