import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, List, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { compose, lifecycle, pure } from 'recompose';
import { withLocalize, Translate } from 'react-localize-redux';
import withWithdraws from '../containers/withWithdraws';
import injectSheet from 'react-jss';
import PageTitle from '../common/PageTitle';
import Coins from '../common/Coins';
import Spinner from '../common/Spinner';

/* eslint-disable react/display-name */
const COLUMNS = [
  {
    title: <Translate id="USER" />,
    dataIndex: 'user',
    key: 'user',
    render: user => <Fragment><Avatar icon="user" src={user.photo} /><span>&nbsp;&nbsp;&nbsp;</span>{user.displayName}</Fragment>
  },
  {
    title: <Translate id="WITHDRAWN" />,
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
];
/* eslint-enable react/display-name */
const Withdraws = ({ withdraws, translate, classes }) => {
  const sortedWithdraws = _.sortBy(withdraws, 'createdAt')
  return (
    <div className={classes.withdraws}>
      <PageTitle>{translate('LAST_WITHDRAWS')}</PageTitle>
      <Spinner spinnerKey="REST_API.GET_WITHDRAWS_REQUEST" overlay={true} transparentOverlay={true}>
        <Fragment>
          {
            window.screen.width > 600 ? (
              <Table
                dataSource={sortedWithdraws}
                columns={COLUMNS}
                pagination={false}
                rowKey={(o) => o.createdAt}
              />
            ) : (
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 4, xl: 5, xxl: 5 }}
                dataSource={sortedWithdraws}
                renderItem={({ createdAt, amount, user: { displayName, photo } }) => (
                  <List.Item>
                    <Card title={moment(createdAt).format('HH:mm DD.MM.YYYY')}>
                      <div className={classes.card}>
                        <Avatar icon="user" src={photo} className={classes.avatar} size="large" />
                        <div>
                          <p>{displayName}</p>
                          <span>{amount} <Coins /></span>
                        </div>
                      </div>
                    </Card>
                  </List.Item>
                )}
              />
            )
          }
        </Fragment>
      </Spinner>
    </div>
  )
};

const styles = {
  withdraws: {
    '& .ant-card-body': {
      paddingLeft: 15,
    },
    '& .ant-card-head-title': {
      fontSize: '12px',
    }
  },
  card: {
    display: 'flex',
    height: 80,
  },
  avatar: {
    marginRight: 15,
  }
};

export default compose(
  withLocalize,
  withWithdraws(),
  lifecycle({
    componentDidMount () {
      this.props.getWithdraws({ filter: { status: 'done' } });
    },
  }),
  injectSheet(styles),
  pure,
)(Withdraws);

Withdraws.defaultProps = {
};

Withdraws.propTypes = {
  withdraws: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  getWithdraws: PropTypes.func.isRequired,
};
