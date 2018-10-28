import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon, Button, Form } from 'antd';
import injectSheet from 'react-jss'
import { compose, withHandlers, pure } from 'recompose'
import FormContainer from './FormContainer'
import PageDescription from '../common/PageDescription';
import Social from './Social';
import withUser from '../containers/withUser';
import { Translate, withLocalize } from 'react-localize-redux';
import Spinner from '../common/Spinner';

const FormItem = Form.Item;

const SignIn = ({
  classes,
  toggleSignInMode,
  handleSubmit,
  translate,
  form: { getFieldDecorator },
}) => {
  return (
    <Fragment>
      <PageDescription>{translate('ENTER_DATA_OF_YOU_ACCOUNT')}</PageDescription>
      <FormContainer>
        <Form>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: <Translate id={'PLEASE_ENTER_YOU_EMAIL'} />},
                { type: 'email', message: <Translate id={'EMAIL_IS_NOT_VALID'} /> },
              ],
            })(
              <Input prefix={<Icon type="mail" />} placeholder="Email" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: <Translate id={'PLEASE_ENTER_YOU_PASSWORD'} />}],
            })(
              <Input prefix={<Icon type="lock" />} type="password" placeholder={translate('PASSWORD')} />
            )}
          </FormItem>
          <Social />
          <Spinner spinnerKey="LOGIN">
            <Button type="primary" onClick={handleSubmit}>
              {<Translate id={'LOG_IN'} />}
            </Button>
          </Spinner>
          <div className={classes.linksBlock}>
            {<Translate id={'OR'} />} <a onClick={toggleSignInMode}>{<Translate id={'REGISTER'} />}</a> {<Translate id={'NEW_USER'} />}
          </div>
        </Form>
      </FormContainer>
    </Fragment>
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
  withLocalize,
  injectSheet(styles),
  withUser(),
  withHandlers({
    handleSubmit: ({ signIn, form: { validateFields } }) => () => validateFields((err, values) => {
      if (!err) {
        signIn(values);
      }
    })
  }),
  pure
)(SignIn);

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  toggleSignInMode: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};
