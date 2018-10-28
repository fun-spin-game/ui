import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import injectSheet from 'react-jss';
import classNames from 'classnames';
import { Link } from 'react-router-dom'
import { Row, Col, Button } from 'antd';
import Particles from 'react-particles-js';
import { compose, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import { default as HowToPlayCommon } from '../common/HowToPlay';
import StartToPlay from './StartToPlay';
import { blueColor, lightGrayColor, darkColor } from '../variables';
import particles from './particles';
import { default as WithdrawsCommon } from '../common/Withdraws';

const ADVANTAGES = [
  {
    textKey: 'WHY_IT_WORTH_TO_START_REASON_1',
    iconClass: 'fas fa-dice',
  },
  {
    textKey: 'WHY_IT_WORTH_TO_START_REASON_2',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    textKey: 'WHY_IT_WORTH_TO_START_REASON_3',
    iconClass: 'fas fa-heart',
  }
];

const ACHIEVEMENTS = [
  {
    value: moment().diff(moment('2018-06-01'), 'days') * 325,
    textKey: 'OUR_ACHIEVEMENTS_1_DESCRIPTION',
    unitKey: '$',
    iconClass: 'fas fa-hand-holding-usd',
  },
  {
    value: 125,
    textKey: 'OUR_ACHIEVEMENTS_2_DESCRIPTION',
    unitKey: 'OUR_ACHIEVEMENTS_2_TEXT',
    iconClass: 'fas fas fa-money-bill',
  },
  {
    value: 837,
    textKey: 'OUR_ACHIEVEMENTS_3_DESCRIPTION',
    unitKey: 'OUR_ACHIEVEMENTS_3_TEXT',
    iconClass: 'fas fas fa-users',
  },
];

const Home = ({ classes, translate }) => {
  /* eslint-disable no-constant-condition */
  return (
    <div className={classes.home}>
      <Particles
        width="100%"
        height="100%"
        style={{
          left: 0,
          top: 0,
          right: 0,
          position: 'absolute',
        }}
        params={particles()}
      />
      <h1 className={classes.title}>FunSpin</h1>
      <StartToPlay ghostBtn={true} />
      <div className={classNames(classes.block, classes.advantagesBlock)}>
        <h2>{translate('MANAGE_LUCK_AND_EARN_MONEY')}!</h2>
        <Row gutter={40}>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <h3>{translate('WHAT_IS_THIS')}:</h3>
            <div className={classes.advantagesList}>
              <div className={classes.advantagesItem}>
                <i className={classNames('fas fa-question', classes.advantageIcon)}></i>
                <div className={classes.advantageText}>{translate('ABOUT_THE_GAME_TEXT')}</div>
                {
                  false && (
                    <div className={classes.video}>
                      <iframe
                          width="100%"
                          height="315"
                          src="https://www.youtube.com/embed/tgbNymZ7vqY"
                        >
                      </iframe>
                    </div>
                  )
                }
              </div>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }}>
            <Fragment>
                <h3>{translate('WHY_IT_WORTH_TO_START')}:</h3>
                <div className={classes.advantagesList}>
                  {
                    ADVANTAGES.map(o => (
                      <div key={o.textKey} className={classes.advantagesItem}>
                        <i className={classNames(o.iconClass, classes.advantageIcon)}></i>
                        <div className={classes.advantageText}>{translate(o.textKey)}</div>
                      </div>
                    ))
                  }
                </div>
            </Fragment>
          </Col>
        </Row>
      </div>
      <StartToPlay />
      <div className={classNames(classes.block, classes.achievementsBlock)}>
        <h2>{translate('OUR_ACHIEVEMENTS')}:</h2>
        <div className={classes.achievementsList}>
          {
            ACHIEVEMENTS.map(o => (
              <div key={o.textKey} className={classes.achievementsItem}>
                <i className={classNames(o.iconClass, classes.achievementIcon)}></i>
                <div className={classes.achievementText}>
                  {o.value} <span className={classes.achievementUnit}>{translate(o.unitKey)}</span>
                </div>
                <div className={classes.achievementDescription}>{translate(o.textKey)}</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className={classNames(classes.block, classes.howToPlayBlock)}>
        <h2>{translate('HOW_TO_PLAY')}:</h2>
        <HowToPlayCommon />
      </div>
      <StartToPlay />
      <div className={classNames(classes.block, classes.withdrawsBlock)}>
        <h2>{translate('LAST_WITHDRAWS')}. {translate('WAIT_YOU_IN_THIS_LIST')}!</h2>
        <WithdrawsCommon filter={{ status: 'done' }} withFakes={true} />
      </div>
      <div className={classNames(classes.block, classes.getBonusBlock)}>
        <h3 className={classes.getBonusText}>{translate('HOME_GET_BOUS_TEXT')}!</h3>
        <Button
          type="primary"
          className={classNames(classes.getBonusBtn)}
          size="large"
        >
          <Link to="/login">{translate('GET_BOUS')}!</Link>
        </Button>
      </div>
    </div>
  )
};

const styles = {
  home: {
    textAlign: 'center',
    fontSize: '16px',
  },
  title: {
    fontFamily: 'Satisfy',
    fontWeight: 'bold',
    fontSize: 90,
    color: blueColor,
    position: 'relative',
    marginBottom: 20,
    '@media(max-width: 666px)': {
      fontSize: 80,
    }
  },
  block: {
    position: 'relative',
    margin: '0 -20px',
    padding: '40px 20px',
    '& > h2': {
      marginBottom: 40,
      fontFamily: 'Lobster',
    }
  },
  video: {
    marginTop: 20,
  },
  advantagesList: {
    textAlign: 'left',
    fontStyle: 'italic',
    fontSize: 14,
    marginBottom: 30,
  },
  advantageIcon: {
    color: blueColor,
    position: 'absolute',
    fontSize: 30,
  },
  advantageText: {
    paddingLeft: 60,
  },
  advantagesItem: {
    marginBottom: 20,
  },
  advantagesBlock: {
    background: lightGrayColor,
  },
  achievementsBlock: {
    textAlign: 'center',
    background: darkColor,
    color: 'white',
    '& > h2': {
      color: 'white',
    },
  },
  achievementsList: {
    display: 'flex',
    justifyContent: 'space-around',
    '@media(max-width: 666px)': {
      flexDirection: 'column',
      alignItems: 'center',
    }
  },
  achievementsItem: {
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    '@media(max-width: 666px)': {
      marginTop: 40,
      '&:first-child': {
        marginTop: 0,
      }
    },
  },
  achievementIcon: {
    fontSize: 40,
  },
  achievementText: {
    marginTop: 10,
    fontSize: 22,
  },
  achievementDescription: {
    fontSize: 10,
    marginTop: 5,
    maxWidth: 150
  },
  achievementUnit: {
    fontSize: 16,
  },
  howToPlayBlock: {
    background: 'white',
    paddingBottom: 0,
  },
  withdrawsBlock: {
    background: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    '& .ant-table-tbody > tr > td, & .ant-table-thead > tr:first-child > th': {
      padding: '16px 40px',
    },
  },
  getBonusBlock: {
    textAlign: 'center',
    padding: '40px 20px',
  },
  getBonusBtn: {
    marginTop: 20,
  },
  getBonusText: {
  }
};

export default compose(
  withLocalize,
  injectSheet(styles),
  pure,
)(Home);

Home.defaultProps = {
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func.isRequired,
};
