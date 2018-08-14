import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  Table,
  Icon,
  Button,
  InputNumber,
  Slider,
  Form,
  Alert,
  Select,
  Input,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { compose, lifecycle, withState, withProps, pure } from 'recompose';
import { withLocalize, Translate } from 'react-localize-redux';
import withWithdraws from '../containers/withWithdraws';
import withUser from '../containers/withUser';
import injectSheet from 'react-jss';
import PageTitle from '../common/PageTitle';
import Coins from '../common/Coins';
import { redColor, greenColor } from '../variables';
import { START_BONUS, MIN_AMOUNT_OF_WITHDRAWING } from '../config';

const FormItem = Form.Item;

const getStatusLabel = (status) => {
  switch (status) {
    case 'done':
      return <div style={{ color: greenColor }}>
        <Icon type="check-circle-o" /> <span className="statusLabel"><Translate id="DONE" /></span>
      </div>;
    case 'inProgress':
      return <div>
        <Icon type="hourglass" /> <span className="statusLabel"><Translate id="IN_PROGRESS" /></span>
      </div>;
    case 'rejected':
      return <div style={{ color: redColor }}>
        <Icon type="close-circle-o" /> <span className="statusLabel"><Translate id="REJECTED" /></span>
      </div>;
  }
};

/* eslint-disable react/display-name */
const COLUMNS = [
  {
    title: <Translate id="STATUS" />,
    dataIndex: 'status',
    key: 'status',
    render: text => getStatusLabel(text)
  },
  {
    title: <Translate id="AMOUNT" />,
    dataIndex: 'amount',
    key: 'amount',
    render: text => <Fragment><Coins /> {text}</Fragment>
  },
  {
    title: <Translate id="DATE" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => <Fragment>{moment(text).format('hh:mm DD.MM.YYYY')}</Fragment>
  },
];/* eslint-enable react/display-name */

const WITHDRAW_METHODS = [
  {
    value: 'visa/mastercard',
    label: 'Visa/Mastercard',
    fieldPlaceholderTranslateId: 'CARD_NUMBER',
  },
  {
    value: 'webMoney',
    label: 'WebMoney',
    fieldPlaceholderTranslateId: 'WALLET_NUMBER',
  },
];

const Withdraw = ({
  withdraws,
  translate,
  classes,
  userInfo: { balance, paid },
  setAmount,
  amount,
  method,
  setMethod,
  setRequisite,
  form: { getFieldDecorator },
  handleSubmit,
}) => {
  const sortedWithdraws = _.sortBy(withdraws, 'createdAt');
  const maxValue = Math.floor(balance - MIN_AMOUNT_OF_WITHDRAWING >= START_BONUS ? balance - START_BONUS : 0);
  const lowBalance = balance < MIN_AMOUNT_OF_WITHDRAWING + START_BONUS;
  const paidNotEnough = paid < START_BONUS;
  return (
    <div className={classes.withdrawing}>
      <PageTitle>{translate('WITHDRAWING')}</PageTitle>
      <Form id="withdrawing" className={classes.withdrawingForm}>
        {
          !paidNotEnough && lowBalance && (
            <FormItem>
              <Alert
                showIcon
                message={`${translate('LOW_BALANCE')}. ${translate('YOU_SHOULD_HAVE_AT_LEAST_N_COINS_TO_WITHDRAW', { n: START_BONUS + MIN_AMOUNT_OF_WITHDRAWING })}`}
                type="error"
              />
            </FormItem>
          )
        }
        {
          paidNotEnough && (
            <FormItem>
              <Alert
                showIcon
                message={`${translate('TO_BE_ABLE_TO_WITHDRAW_YOU_SHOUD_BY_AT_LEAST_N_COINS', { n: START_BONUS })}`}
                type="warning"
              />
            </FormItem>
          )
        }
        {
          !paidNotEnough && !lowBalance && (
            <FormItem>
              <Alert
                showIcon
                message={`${translate('YOU_HAVE_N_COINS_START_BONUS_WHICH_IMPOSSIBLE_TO_WITHDRAW', { n: START_BONUS })}`}
                type="info"
              />
            </FormItem>
          )
        }
        <FormItem>
          <div>
            <InputNumber
              step={1}
              defaultValue={MIN_AMOUNT_OF_WITHDRAWING}
              min={MIN_AMOUNT_OF_WITHDRAWING}
              max={maxValue}
              onChange={setAmount}
              value={amount}
            /> $
            <div className={classes.rate}>1 <Coins /> = 1$</div>
          </div>
          <div>
            <Slider
              step={1}
              defaultValue={MIN_AMOUNT_OF_WITHDRAWING}
              min={MIN_AMOUNT_OF_WITHDRAWING}
              max={maxValue}
              tipFormatter={(value) => (<span>{value} <Coins /></span>)}
              onChange={(val) => setAmount(val)}
              value={amount}
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
            disabled={paidNotEnough || lowBalance}
            onClick={handleSubmit}
          >
            {translate('WITHDRAW')}
          </Button>
        </FormItem>
      </Form>
        <h3>{translate('WITHDRAWN_HISTORY')}:</h3>
        <Table
          dataSource={sortedWithdraws}
          columns={COLUMNS}
          pagination={false}
          rowKey={(o) => o.createdAt}
          className={classes.table}
          locale={{ emptyText: translate('EMPTY') }}
        />
        <List
          locale={{ emptyText: translate('EMPTY') }}
          className={classes.list}
          grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
          dataSource={sortedWithdraws}
          renderItem={({ createdAt, amount, status }) => (
            <List.Item>
              <Card title={moment(createdAt).format('HH:mm DD.MM.YYYY')}>
                <div className={classes.card}>
                  <span className={classes.status}>{getStatusLabel(status)}</span>
                  <div className={classes.amount}>
                    <div>{amount} <Coins /></div>
                  </div>
                </div>
              </Card>
            </List.Item>
          )}
        />
    </div>
  )
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
  withState('amount', 'setAmount', 0),
  withState('method', 'setMethod', WITHDRAW_METHODS[0].value),
  withState('requisite', 'setRequisite', ''),
  Form.create(),
  withProps(({ form, userInfo: { userId }, amount, method, requisite, createWithdraw }) => ({
    handleSubmit: () => {
      form.validateFields((err) => {
        if (!err) {
          createWithdraw({ userId, amount, method, requisite });
        }
      });
    },
  })),
  lifecycle({
    componentDidMount () {
      this.props.getWithdraws({ filter: { userId: this.props.userInfo.id } });
    },
  }),
  injectSheet(styles),
  pure,
)(Withdraw);

Withdraw.defaultProps = {
};

Withdraw.propTypes = {
  withdraws: PropTypes.arrayOf(PropTypes.object).isRequired,
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
  handleSubmit: PropTypes.func.isRequired,
};
