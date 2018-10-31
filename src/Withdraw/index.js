import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Slider,
  Form,
  Alert,
  Select,
  Input,
} from 'antd';
import { compose, withState, withProps, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import withWithdraws from '../containers/withWithdraws';
import withUser from '../containers/withUser';
import withGameConfig from '../containers/withGameConfig';
import injectSheet from 'react-jss';
import PageTitle from '../common/PageTitle';
import Coins from '../common/Coins';
import WithdrawsCommon from '../common/Withdraws';

const FormItem = Form.Item;

const WITHDRAW_METHODS = [
  {
    value: 'payeer',
    label: 'Payeer',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
  {
    value: 'qiwi',
    label: 'QIWI',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
  {
    value: 'perfectMoney',
    label: 'PerfectMoney',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
];

const Withdraw = ({
  translate,
  classes,
  userInfo: { balance, id: userId },
  setAmount,
  amount,
  method,
  setMethod,
  setRequisite,
  form: { getFieldDecorator },
  handleSubmit,
  gameConfig: { MIN_AMOUNT_OF_WITHDRAWING, COINS_RATE }
}) => {
  const lowBalance = balance < MIN_AMOUNT_OF_WITHDRAWING;
  const maxValue = Math.floor(balance / 100) * 100;
  return (
    <div className={classes.withdrawing}>
      <PageTitle>{translate('WITHDRAWING')}</PageTitle>
      <Form id="withdrawing" className={classes.withdrawingForm}>
        {
          lowBalance && (
            <FormItem>
              <Alert
                showIcon
                message={`${translate('LOW_BALANCE')}. ${translate('MIN_AMOUNT_TO_WITHDRAW_IS_N_COINS', { n: MIN_AMOUNT_OF_WITHDRAWING })}`}
                type="warning"
              />
            </FormItem>
          )
        }
        <FormItem>
          <div>
            {amount} <Coins /> / { amount * COINS_RATE } $
          </div>
          <div>
            <Slider
              step={100}
              defaultValue={MIN_AMOUNT_OF_WITHDRAWING}
              min={MIN_AMOUNT_OF_WITHDRAWING}
              max={maxValue}
              tipFormatter={(value) => (<span>{value} <Coins /></span>)}
              onChange={(val) => setAmount(val)}
              value={amount}
              disabled={lowBalance}
            />
          </div>
        </FormItem>
        <FormItem>
          <Select value={method} onChange={(val) => setMethod(val)}>
            {
              WITHDRAW_METHODS.map(o => (
                <Select.Option key={JSON.stringify(o)} value={o.value}>{o.label}</Select.Option>
              ))
            }
          </Select>
        </FormItem>
        <FormItem>
          {getFieldDecorator('requisite', {
            rules: [{ required: true, message: <span>{translate('THIS_FIELD_IS_REQUIRED')}</span> }],
          })(
            <Input
              placeholder={translate(WITHDRAW_METHODS.find(o => o.value === method).fieldPlaceholderTranslateId)}
              onChange={(e) => setRequisite(e.target.value)}
            />
          )}
        </FormItem>
        <FormItem className={classes.btnBlock}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            disabled={lowBalance}
          >
            {translate('WITHDRAW')}
          </Button>
        </FormItem>
      </Form>
        <h3>{translate('WITHDRAWN_HISTORY')}:</h3>
        <WithdrawsCommon filter={{ userId }} />
    </div>
  );
};

const styles = {
  withdrawing: {
    '& .ant-card-body': {
      paddingLeft: 15,
    },
    '& .ant-card-head-title': {
      fontSize: '12px',
    },
    '& .statusLabel': {
      '@media(max-width: 666px)': {
        display: 'none',
      }
    }
  },
  withdrawingForm: {
    maxWidth: 400,
  },
  card: {
    display: 'flex',
    height: 30,
    alignItems: 'center'
  },
  status: {
    fontSize: '25px',
    marginRight: 14,
  },
  avatar: {
    marginRight: 15,
  },
  amount: {
    fontSize: '16px'
  },
  table: {
    '@media(max-width: 666px)': {
      display: 'none',
    }
  },
  list: {
    '@media(min-width: 667px)': {
      display: 'none',
    }
  },
  rate: {
    float: 'right'
  }
  ,
  btnBlock: {
    textAlign: 'right'
  }
};
export default compose(
  withLocalize,
  withWithdraws(),
  withUser(),
  withGameConfig(),
  withState('amount', 'setAmount', ({ gameConfig: { MIN_AMOUNT_OF_WITHDRAWING } }) => MIN_AMOUNT_OF_WITHDRAWING),
  withState('method', 'setMethod', WITHDRAW_METHODS[0].value),
  withState('requisite', 'setRequisite', ''),
  Form.create(),
  withProps(({ form, amount, method, requisite, createWithdraw }) => ({
    handleSubmit: () => {
      form.validateFields((err) => {
        if (!err) {
          createWithdraw({ amount, method, requisite });
        }
      });
    },
  })),
  injectSheet(styles),
  pure,
)(Withdraw);

Withdraw.defaultProps = {
};

Withdraw.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  getWithdraws: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  method: PropTypes.string.isRequired,
  setMethod: PropTypes.func.isRequired,
  setRequisite: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  gameConfig: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
