import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import FormContainer from './FormContainer'
import Social from './Social';

const FormItem = Form.Item;

class SignUp extends Component {
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
          </FormItem>
          <FormItem>
            {getFieldDecorator('repeatPassword', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder="Repeat password" />
            )}
            <Social/>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
            Or <a href="">Log In</a> with existed user
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

export default Form.create()(injectSheet(styles)(SignUp));

SignUp.propTypes = {
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
