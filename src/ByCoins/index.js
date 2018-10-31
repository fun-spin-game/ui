import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  List,
  Table,
  Icon,
  Button,
  Slider,
  Form,
} from 'antd';
import _ from 'lodash';
import moment from 'moment';
import cryptoJs from 'crypto-js';
import { compose, lifecycle, withState, pure, withProps } from 'recompose';
import { withLocalize, Translate } from 'react-localize-redux';
import withUser from '../containers/withUser';
import injectSheet from 'react-jss';
import PageTitle from '../common/PageTitle';
import Coins from '../common/Coins';
import { redColor, greenColor } from '../variables';
import withPurchases from '../containers/withPurchases';
import withGameConfig from '../containers/withGameConfig';
import { DATE_FORMAT } from '../config';

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

const ByCoins = ({
  purchases,
  translate,
  classes,
  setAmount,
  amount,
  purchaseUrl,
  gameConfig: { MIN_AMOUNT_OF_PURCHASE, MAX_AMOUNT_OF_PURCHASE, COINS_RATE }
}) => {
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
      render: text => <Fragment><Coins /> {text / COINS_RATE}</Fragment>
    },
    {
      title: <Translate id="DATE" />,
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: text => <Fragment>{moment(text).format(DATE_FORMAT)}</Fragment>
    },
  ];/* eslint-enable react/display-name */
  const sortedWithdraws = _.sortBy(purchases, 'createdAt');
  return (
    <div className={classes.purchase}>
      <PageTitle>{translate('TOP_UP_THE_BALANCE')}</PageTitle>
      <Form id="purchase" className={classes.purchaseForm}>
        <FormItem>
          <div>
            {amount} <Coins /> / { amount * COINS_RATE } $
          </div>
          <div>
            <Slider
              step={500}
              min={MIN_AMOUNT_OF_PURCHASE}
              max={MAX_AMOUNT_OF_PURCHASE}
              tipFormatter={(value) => (<span>{value} <Coins /></span>)}
              onChange={(val) => setAmount(val)}
              value={amount}
            />
          </div>
        </FormItem>
        <FormItem className={classes.btnBlock}>
          <a href={purchaseUrl}>
            <Button
              type="primary"
            >
              {translate('TOP_UP')}
            </Button>
          </a>
        </FormItem>
      </Form>
        <h3>{translate('PURCHASES_HISTORY')}:</h3>
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
              <Card title={moment(createdAt).format(DATE_FORMAT)}>
                <div className={classes.card}>
                  <span className={classes.status}>{getStatusLabel(status)}</span>
                  <div className={classes.amount}>
                    <div>{amount / COINS_RATE} <Coins /></div>
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
  purchase: {
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
  purchaseForm: {
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
  withPurchases(),
  withUser(),
  withGameConfig(),
  withState(
    'amount',
    'setAmount',
    ({ gameConfig: { MIN_AMOUNT_OF_PURCHASE } }) => MIN_AMOUNT_OF_PURCHASE),
  withProps(({ amount, userInfo, gameConfig: { COINS_RATE } }) => {
    const purchaseId = `${userInfo.id}_${_.random(100000)}`;
    return {
      purchaseUrl: 'http://www.free-kassa.ru/merchant/cash.php?' +
      'm=87104&' +
      `oa=${amount * COINS_RATE}&` +
      `o=${purchaseId}&` +
      `us_userId=${userInfo.id}&` +
      `s=${cryptoJs.MD5(`87104:${amount * COINS_RATE}:${process.env.REACT_APP_FREE_KASSA_SECRET}:${purchaseId}`).toString()}`
    }
  }),
  Form.create(),
  lifecycle({
    componentDidMount () {
      this.props.getPurchases({ filter: { userId: this.props.userInfo.id } });
    },
  }),
  injectSheet(styles),
  pure,
)(ByCoins);

ByCoins.defaultProps = {
};

ByCoins.propTypes = {
  purchases: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  getPurchases: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  setAmount: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
  form: PropTypes.object.isRequired,
  gameConfig: PropTypes.object.isRequired,
  purchaseUrl: PropTypes.string.isRequired,
};
