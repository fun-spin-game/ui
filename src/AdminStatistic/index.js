import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import withAdminStatistic from '../containers/withAdminStatistic';
import { default as WithdrawsCommon } from '../common/Withdraws';
import StatisticField from './StatisticField';

const AdminStatistic = ({ classes, translate, adminStatistic }) => {
  return (
    <div className={classes.adminStatistic}>
      <PageTitle>{translate('ADMIN_STATISTIC')}</PageTitle>
      <div>
        {
          adminStatistic.fields.map(o => (<StatisticField key={`field-${o.label}`} field={o} />))
        }
        <WithdrawsCommon maxItems={9999999} />
      </div>
    </div>
  )
};

const styles = {
  adminStatistic: {
  },
};

export default compose(
  withAdminStatistic(),
  withLocalize,
  injectSheet(styles),
  lifecycle({
    componentDidMount() {
      this.props.getAdminStatistic()
    }
  }),
  branch(
    ({ adminStatistic }) => adminStatistic === null,
    renderNothing,
  ),
  pure,
)(AdminStatistic);

AdminStatistic.defaultProps = {
  adminStatistic: null,
};

AdminStatistic.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  adminStatistic: PropTypes.object,
};
