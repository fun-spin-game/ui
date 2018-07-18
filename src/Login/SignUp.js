import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import { compose, withHandlers, withProps } from 'recompose'
import FormContainer from './FormContainer'
import Social from './Social';
import withUser from '../redux/user/withUser';

const FormItem = Form.Item;

class SignUp extends Component {
  render() {
    const { classes, handleSubmit, toggleSignInMode, compareToFirstPassword, form: { getFieldDecorator } } = this.props;
    return (
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('repeatPassword', {
              rules: [
                {
                  required: true, message: 'Please repeat your password!'
                },
                {
                  validator: compareToFirstPassword,
                }
              ],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Repeat password" />
            )}
          </FormItem>
          <Social/>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
          <div className={classes.linksBlock}>
            Or <a onClick={toggleSignInMode}>Log In</a> with existed user
          </div>
        </Form>
      </FormContainer>
    )
  }
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
  withProps(({ form }) => ({
    compareToFirstPassword: (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
    }
  })),
  withHandlers({
    handleSubmit: ({ signUp, form: { validateFields } }) => (e) => {
      e.preventDefault();
      validateFields((err, values) => {
        if (!err) {
          signUp(values);
        }
      });
    }
  })
)(SignUp);

SignUp.propTypes = {
  compareToFirstPassword: PropTypes.func.isRequired,
  toggleSignInMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
