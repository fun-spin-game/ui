import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Layout } from 'antd';
import { compose, withStateHandlers, branch, renderComponent } from 'recompose';
import Header from '../Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Content from '../Content';
import withUser from '../redux/user/withUser';

const Form = branch(
  ({ signInMode }) => signInMode,
  renderComponent(SignIn),
  renderComponent(SignUp),
)();

const Login = ({ classes, toggleSignInMode, signInMode }) => {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <div className={classes.content}>
          <Form signInMode={signInMode} toggleSignInMode={toggleSignInMode} />
        </div>
      </Content>
    </Layout>
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
