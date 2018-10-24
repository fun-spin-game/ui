import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import injectSheet from 'react-jss';
import PageTitle from '../common/PageTitle';
import { default as WithdrawsCommon } from '../common/Withdraws';

const Withdraws = ({ translate, classes }) => {
  return (
    <div className={classes.withdraws}>
      <PageTitle>{translate('LAST_WITHDRAWS')}</PageTitle>
      <WithdrawsCommon filter={{ status: 'done' }} withFakes={true} />
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
  injectSheet(styles),
  pure,
)(Withdraws);

Withdraws.defaultProps = {
};

Withdraws.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
