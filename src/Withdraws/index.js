import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import { compose, lifecycle } from "recompose";
import { withLocalize } from "react-localize-redux";
import withPayments from "../containers/withPayments";
import injectSheet from "react-jss";
import PageTitle from "../common/PageTitle";

const Payments = ({ payments, translate }) => (
  <Fragment>
    <PageTitle>{translate('LAST_WITHDRAWS')}:</PageTitle>
    <List
      itemLayout="horizontal"
      dataSource={payments}
      renderItem={o => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={o.user.photo} />}
            title={o.user.displayName}
            description={''}
          />
        </List.Item>
      )}
    />
  </Fragment>
);

const styles = {

};

export default compose(
  withLocalize,
  withPayments(),
  lifecycle({
    componentDidMount () {
      this.props.getPayments();
    },
  }),
  injectSheet(styles),
)(Payments);

Payments.defaultProps = {
};

Payments.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.object).isRequired,
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  getPayments: PropTypes.func.isRequired,
};
