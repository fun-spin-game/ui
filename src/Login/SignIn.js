import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import { compose, withHandlers } from 'recompose'
import FormContainer from './FormContainer'
import Social from './Social';
import withUser from '../redux/user/withUser';

const FormItem = Form.Item;

const SignIn = ({
  classes,
  toggleSignInMode,
  handleSubmit,
  form: { getFieldDecorator },
}) => {
  return (
    <FormContainer>
      <Form>
        <FormItem>
          {getFieldDecorator('login', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <Social />
        <Button type="primary" onClick={handleSubmit}>
          Log in
        </Button>
        <div className={classes.linksBlock}>
          Or <a onClick={toggleSignInMode}>register now!</a>
        </div>
      </Form>
    </FormContainer>
  );
}

const styles = {
  forgetPassword: {
    float: 'right',
  },
  socialWrapper: {
    'padding-bottom': '20px',
    display: 'flex',
    'justify-content': 'space-around',
    'font-size': '25px',
  },
  linksBlock: {
    marginTop: 20,
    lineHeight: '30px',
  }
};

export default compose(
  Form.create(),
  injectSheet(styles),
  withUser(),
  withHandlers({
    handleSubmit: ({ signIn, form: { validateFields } }) => () => validateFields((err, values) => {
      if (!err) {
        signIn(values);
      }
    })
  })
)(SignIn);

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  toggleSignInMode: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
