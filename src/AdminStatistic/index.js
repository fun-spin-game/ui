import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { Card } from 'antd';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import withAdminStatistic from '../containers/withAdminStatistic';

const AdminStatistic = ({ classes, translate, adminStatistic }) => {
  return (
    <div className={classes.adminStatistic}>
      <PageTitle>{translate('ADMIN_STATISTIC')}</PageTitle>
      <div>
        {
          adminStatistic.fields.map(o => (<div key={`field-${o.label}`}>
            <p>{o.label}: {o.value}</p>
            {
              o.fields && o.fields.map(oo => (<div key={`field-${o.label}-${oo.label}`}>
                <Card title={`${oo.label}`}>
                  {
                    oo.fields && oo.fields.map(ooo => (<div key={`field-${o.label}-${oo.label}-${ooo.label}`}>
                      <p>
                        {ooo.label}: {ooo.value}
                      </p>
                    </div>))
                  }
                </Card>
              </div>))
            }
          </div>))
        }
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
  pure,
  lifecycle({
    componentDidMount() {
      this.props.getAdminStatistic()
    }
  }),
  branch(
    ({ adminStatistic }) => adminStatistic === null,
    renderNothing,
  ),
)(AdminStatistic);

AdminStatistic.defaultProps = {
  adminStatistic: null,
};

AdminStatistic.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  adminStatistic: PropTypes.object,
};
