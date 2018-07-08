import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import FormContainer from './FormContainer'
import Social from './Social';

const FormItem = Form.Item;

class SignIn extends Component {
  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <FormContainer>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('userName', {
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
            <Social />
            <Button type="primary" htmlType="submit">
              Log in
            </Button>
            <a href="">Forgot password</a>
            <br/>
            Or <a href="">register now!</a>
          </FormItem>
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
  }
};

export default Form.create()(injectSheet(styles)(SignIn));

SignIn.propTypes = {
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
