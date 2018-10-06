import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { compose, pure, lifecycle } from 'recompose';
import { Button } from 'antd';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import withTables from '../containers/withTables';
import Coins from '../common/Coins';

const Tables = ({ classes, translate, tablesList }) => {
  return (
    <div>
      <PageTitle>{translate('TABLES')}</PageTitle>
      <div className={classes.tables}>
        {
          tablesList.map(table => (
            <div className={classes.table} key={`table-${table.id}`}>
              <div className={classNames(classes.openButtonContainer, 'playButtonContainer')}>
                <Button
                  type="primary"
                  className={classNames(classes.openButton, 'openButton', 'ghostBtn')}
                  onClick={() => {}}
                >
                  {translate('PLAY')}!
                </Button>
              </div>
              <div>
                {table.min} <Coins /> / {table.max} <Coins />
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
};

const styles = {
  tables: {
    display: 'flex',
    'flex-wrap': 'wrap',
    'justify-content': 'space-around',
  },
  table: {
    width: 150,
    height: 150,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  }
};

export default compose(
  withLocalize,
  withTables(),
  injectSheet(styles),
  lifecycle({
    componentDidMount () {
      this.props.getTables();
    },
  }),
  pure,
)(Tables);

Tables.defaultProps = {
};

Tables.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
  getTables: PropTypes.func.isRequired,
  tablesList: PropTypes.array.isRequired,
};
