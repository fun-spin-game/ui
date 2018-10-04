import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, List, Table } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { compose, lifecycle, pure } from 'recompose';
import { Translate } from 'react-localize-redux';
import withWithdraws from '../containers/withWithdraws';
import injectSheet from 'react-jss';
import Spinner from '../common/Spinner';
import { DATE_FORMAT } from '../config';

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
    render: text => <Fragment>$ {text}</Fragment>
  },
  {
    title: <Translate id="DATE" />,
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: text => <Fragment>{moment(text).format(DATE_FORMAT)}</Fragment>
  },
];
/* eslint-enable react/display-name */

const Withdraws = ({ withdraws, classes }) => {
  const sortedWithdraws = _.sortBy(withdraws, 'createdAt').reverse().splice(0, 10);
  return (
    <div className={classes.withdraws}>
      <Spinner spinnerKey="REST_API.GET_WITHDRAWS_REQUEST" overlay={true} transparentOverlay={true}>
        <Fragment>
          {
            window.innerWidth > 666 ? (
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
                    <Card title={moment(createdAt).format(DATE_FORMAT)}>
                      <div className={classes.card}>
                        <Avatar icon="user" src={photo} className={classes.avatar} size="large" />
                        <div>
                          <p>{displayName}</p>
                          <span>$ {amount}</span>
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
  );
};

const styles = {
  withdraws: {
    '& .ant-card-body': {
      paddingLeft: 15,
    },
    '& .ant-card-head-title': {
      fontSize: '12px',
      textAlign: 'left',
    }
  },
  card: {
    display: 'flex',
    height: 80,
    textAlign: 'left',
  },
  avatar: {
    marginRight: 15,
  }
};

export default compose(
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
  getWithdraws: PropTypes.func.isRequired,
};
