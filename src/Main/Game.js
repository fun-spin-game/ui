import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Progress, Icon } from 'antd';
import { AES, enc } from 'crypto-js';
import { compose, branch, renderComponent, withHandlers, pure } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Roulette from './Roulette';
import withGamesActions from '../containers/withGamesActions';
import withUser from '../containers/withUser';

const Game = ({
  classes,
  translate,
  activeGame: {
    chanceToWin,
    prize,
    maxAttempts,
    risk,
    schema: schemaEncoded,
    amountOfAttempts,
    spinInProgress,
    maxAttemptsReached,
  },
  userInfo: { balance },
  onClickPlay,
  closeGame,
}) => {
  const lowBalance = balance < risk;
  const schema = AES.decrypt(schemaEncoded, 'dAfg$1397642gsge_39').toString(enc.Utf8);
  const result = Boolean(parseInt(schema[amountOfAttempts]));
  return (
    <div className={classes.rouletteOverlay}>
      {
        !spinInProgress && <a onClick={closeGame}>
          <Icon type="close" className={classes.close} />
        </a>
      }
      <div className={classes.chancePercentage}>{chanceToWin}% {translate('CHANCE_TO_WIN')}!</div>
      <Roulette
        prize={prize}
        chanceToWin={chanceToWin}
        risk={risk}
        result={result}
        onClickPlay={onClickPlay}
        maxAttemptsReached={maxAttemptsReached}
        lowBalance={lowBalance}
        spinInProgress={spinInProgress}
      />
      <div className={classes.attemptsBlock}>
        <Progress size="small" percent={amountOfAttempts / maxAttempts * 100} />
        <span>{amountOfAttempts}/{maxAttempts} {translate('ATTEMPTS_USED')}</span>
      </div>
    </div>
  )
};

const styles = {
  rouletteOverlay: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    background: '#000000d6',
    'z-index': 20,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    paddingTop: 100,
  },
  chancePercentage: {
    'font-size': '35px',
    color: 'white',
    'text-align': 'center',
    '@media(max-width: 600px)': {
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
    '@media(max-width: 600px)': {
      'margin-top': 55,
      'font-size': '15px',
    }
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    'font-size': '50px',
    '@media(max-width: 600px)': {
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
  withUser(),
  withGamesActions(),
  withHandlers({
    closeGame: ({ disconnectFromGame, activeGame: { id: gameId } }) => () => disconnectFromGame({ gameId }),
    onClickPlay: ({ notifyGameSpinStart, activeGame: { id: gameId, prize, risk } }) => ({ result }) => {
      notifyGameSpinStart({ gameId, result: result ? prize : -risk });
    }
  }),
  branch(
    ({ activeGame }) => !activeGame,
    renderComponent(() => null)
  ),
  pure
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
  onClickPlay: PropTypes.func.isRequired,
  notifyGameSpinStart: PropTypes.func.isRequired,
  translate: PropTypes.func.isRequired,
  closeGame: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
};
