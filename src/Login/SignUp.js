import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import { compose, withHandlers, withProps } from 'recompose'
import FormContainer from './FormContainer'
import Social from './Social';
import withUser from '../containers/withUser';
import { Translate, withLocalize } from 'react-localize-redux';

const FormItem = Form.Item;

class SignUp extends Component {
  render() {
    const {
      classes,
      handleSubmit,
      toggleSignInMode,
      compareToFirstPassword,
      form: { getFieldDecorator },
      translate
    } = this.props;
    return (
      <FormContainer>
        <Form>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: <Translate id={'PLEASE_ENTER_YOU_EMAIL'} /> },
                { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
              ],
            })(
              <Input prefix={<Icon type="user" />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
            rules: [{ required: true, message: <Translate id={'PLEASE_ENTER_YOU_PASSWORD'} /> }],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PASSWORD')} />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('repeatPassword', {
              rules: [
                {
                  required: true, message: <Translate id={'PLEASE_REPEAT_PASSWORD'} />
                },
                {
                  validator: compareToFirstPassword,
                }
              ],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PLEASE_REPEAT_PASSWORD')} />
            )}
          </FormItem>
          <Social/>
          <Button type="primary" onClick={handleSubmit}>
            {<Translate id={'REGISTER'} />}
          </Button>
          <div className={classes.linksBlock}>
            {<Translate id={'OR'} />} <a onClick={toggleSignInMode}>{<Translate id={'LOG_IN'} />}</a> {<Translate id={'WITH_EXISTED_USER'} />}
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
  withLocalize,
  injectSheet(styles),
  withUser(),
  withProps(({ form }) => ({
    compareToFirstPassword: (rule, value, callback) => {
      if (value && value !== form.getFieldValue('password')) {
        callback(<Translate id={'PASSWORDS_DO_NOT_MATCH'} />);
      } else {
        callback();
      }
    }
  })),
  withHandlers({
    handleSubmit: ({ signUp, form: { validateFields } }) => () => {
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
  signUp: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
