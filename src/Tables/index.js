import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { Circle } from 'rc-progress';
import { Link } from 'react-router-dom'
import { compose, pure, lifecycle } from 'recompose';
import { Button, Modal } from 'antd';
import { withLocalize } from 'react-localize-redux';
import PageTitle from '../common/PageTitle';
import PageDescription from '../common/PageDescription';
import withGameConfig from '../containers/withGameConfig';
import withUser from '../containers/withUser';
import withTables from '../containers/withTables';
import Coins from '../common/Coins';

const Tables = ({ classes, translate, tablesList }) => {
  return (
    <div>
      <PageTitle>{translate('TABLES')}</PageTitle>
      <PageDescription>{translate('CHOSE_A_TABLE_THAT_MATCH_YOUR_BALANCE')}</PageDescription>
      <div className={classes.tables}>
        {
          tablesList.map((table, index) => (
            <div className={classes.table} key={`table-${table.id}`}>
              <div className={classes.circle}>
                <Circle
                  className={classes.circle}
                  percent={(index + 1) / tablesList.length * 100}
                  gapDegree={95}
                  gapPosition="bottom"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeColor={'gold'}
                  trailWidth="7"
                  trailColor="#f5f5f5"
                  style={{
                    width: 150,
                    height: 150
                  }}
                />
              </div>
              <div className={classNames(classes.openButtonContainer, 'playButtonContainer')}>
                <Button
                  type="primary"
                  className={classNames(classes.openButton, 'openButton', 'ghostBtn')}
                  onClick={() => {}}
                >
                  <Link to={`/tables/${table.id}/lots`}>{translate('GO')}!</Link>
                </Button>
              </div>

              <div className={classes.ratesContainer}>
                <div>{translate('PRIZES')}:</div>
                {table.min} <Coins /> - {table.max} <Coins />
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
    width: 180,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginBottom: 20,
    position: 'relative',
    marginTop: 65,
  },
  openButtonContainer: {
    marginBottom: 20,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    top: 55,
  },
  ratesContainer: {
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    bottom: 0,
  },
  circle: {

  }
};

export default compose(
  withLocalize,
  withTables(),
  withUser(),
  withGameConfig(),
  injectSheet(styles),
  lifecycle({
    componentDidMount() {
      const {
        userInfo,
        gameConfig: {
          START_USER_BALANCE,
        },
        translate,
        confirmDemoModeActivated,
      } = this.props;
      if (!userInfo.demoModeActivatedConfirmation) {
        Modal.info({
          title: `${translate('WELCOME')}!`,
          content: <div>
            {translate('YOU_RECEIVED_N_COINS_AS_A_START_BONUS', { n: START_USER_BALANCE })}.<br/><br/>
            {translate('HAVE_A_GOOD_GAME')}!
          </div>,
          onOk() {
            confirmDemoModeActivated()
          },
          footer: [
            <Button
              key="submit"
              type="primary"
            >
              {translate('OK')}
            </Button>
          ]
        })
      }
    }
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
