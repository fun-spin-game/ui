import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Progress, Icon } from 'antd';
import { compose, branch, renderComponent } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Roulette from './Roulette';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';

class Game extends Component {
  render() {
    const {
      classes,
      translate,
      activeGame: {
        chanceToWin,
        prize,
        maxAttempts,
        risk,
        id: gameId,
      },
      userInfo: { balance },
      disconnectFromGame,
      getAmountOfAttempts,
      notifyGameSpinStart,
      isGameSpinInProgress,
    } = this.props;
    const amountOfAttempts = getAmountOfAttempts({ gameId });
    const maxAttemptsReached = amountOfAttempts >= maxAttempts;
    const lowBalance = balance < risk;
    const inProgress = isGameSpinInProgress({ gameId });
    return (
      <div className={classes.rouletteOverlay}>
        {
            !inProgress && <a onClick={() => disconnectFromGame({ gameId })}>
              <Icon type="close" className={classes.close} />
            </a>
        }
        <div className={classes.chancePercentage}>{chanceToWin}% {translate('CHANCE_TO_WIN')}!</div>
        <Roulette
          prize={prize}
          chanceToWin={chanceToWin}
          risk={risk}
          onClickPlay={({ result }) => {
            notifyGameSpinStart({ gameId, result: result ? prize : -risk });
          }}
          onSpinFinished={() => {}}
          maxAttemptsReached={maxAttemptsReached}
          lowBalance={lowBalance}
          inProgress={inProgress}
        />
        <div className={classes.attemptsBlock}>
          <Progress size="small" percent={amountOfAttempts / maxAttempts * 100} />
          <span>{amountOfAttempts}/{maxAttempts} {translate('ATTEMPTS_USED')}</span>
        </div>
      </div>
    )
  }
}

const styles = {
  rouletteOverlay: {
    position: 'fixed',
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
    background: '#000000d6',
    'z-index': 20,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
  chancePercentage: {
    'font-size': '35px',
    color: 'white',
    'text-align': 'center',
    '@media(max-width: 400px)': {
      'font-size': '17px',
    }
  },
  attemptsBlock: {
    'text-align': 'center',
    'font-size': '18px',
    color: 'white',
    'margin-top': 200,
    'margin-right': 0,
    padding: '0 50px',
    '& .ant-progress-text': {
      display: 'none',
    },
    '& .ant-progress-bg': {
      height: '2px !important',
    },
    '@media(max-width: 400px)': {
      'margin-top': 130,
      'font-size': '15px',
    }
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    'font-size': '50px',
    '@media(max-width: 400px)': {
      top: 20,
      right: 15,
      'font-size': '35px',
    }
  },
  disabledAlert: {
    position: 'absolute',
    top: 25,
    left: 25,
    width: 300,
  }
};

export default compose(
  injectSheet(styles),
  withLocalize,
  withGames(),
  withUser(),
  branch(
    ({ activeGame }) => !activeGame,
    renderComponent(() => null)
  )
)(Game);

Game.defaultProps = {
  activeGameId: null,
  disabled: false,
  disabledMessage: 'Disabled',
  disabledTitle: null,
};

Game.propTypes = {
  classes: PropTypes.object.isRequired,
  activeGame: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  disabledMessage: PropTypes.node,
  disabledTitle: PropTypes.node,
  disconnectFromGame: PropTypes.func.isRequired,
  getAmountOfAttempts: PropTypes.func.isRequired,
  notifyGameSpinStart: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  isGameSpinInProgress: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
