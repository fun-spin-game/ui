import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Progress, Icon } from 'antd';
import { compose, branch, renderComponent, withHandlers, pure, lifecycle, withProps } from 'recompose';
import { withLocalize } from 'react-localize-redux';
import Roulette from './Roulette';
import withGamesActions from '../containers/withGamesActions';
import withUser from '../containers/withUser';
import withSpinnersActions from '../containers/withSpinnersActions';
import withGameConfig from '../containers/withGameConfig';

const Game = ({
  classes,
  translate,
  activeGame: {
    chanceToWin,
    prize,
    maxAttempts,
    risk,
    spinInProgress,
  },
  onClickPlay,
  closeGame,
  amountOfAttempts,
  maxAttemptsReached,
  lowBalance,
  result
}) => (
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
);

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
    '@media(max-width: 666px)': {
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
    '@media(max-width: 666px)': {
      'margin-top': 55,
      'font-size': '15px',
    }
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    'font-size': '50px',
    '@media(max-width: 666px)': {
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
  withLocalize,
  withSpinnersActions(),
  withUser(),
  withGamesActions(),
  withGameConfig(),
  branch(
    ({ activeGame }) => !activeGame,
    renderComponent(() => null)
  ),
  withProps(({
    activeGame: {
      won,
      lost,
    },
  }) => {
    return {
      amountOfAttempts: won + lost,
    };
  }),
  withProps(({
    amountOfAttempts,
    userInfo: { balance, isDemoMode, paid },
    activeGame: {
      risk,
      prize,
      decryptedSchema,
      maxAttempts,
    },
    gameConfig: { START_USER_BALANCE, MAX_BALANCE_WITHOUT_PAID }
  }) => {
    const schemaResult = Boolean(parseInt(decryptedSchema[amountOfAttempts]));
    let result;
    if (isDemoMode && !schemaResult && balance - risk <= START_USER_BALANCE / 2) {
      result = true;
    } else if (
      paid <= 0 &&
      schemaResult &&
      balance + prize > MAX_BALANCE_WITHOUT_PAID
    ) {
      result = false;
    } else {
      result = schemaResult;
    }
    return {
      maxAttemptsReached: amountOfAttempts >= maxAttempts,
      lowBalance: balance < risk,
      result,
    };
  }),
  withHandlers({
    closeGame: ({ disconnectFromGame, activeGame: { id: gameId } }) => () => disconnectFromGame({ gameId }),
    onClickPlay: ({ notifyGameSpinStart, activeGame: { id: gameId } }) => ({ result }) => {
      notifyGameSpinStart({ gameId, result });
    }
  }),
  lifecycle({
    componentDidMount () {
      this.props.setSpinnerStatus({ key: 'GAME_CHOOSE', active: false })
    },
  }),
  injectSheet(styles),
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
  gameConfig: PropTypes.object.isRequired,
  amountOfAttempts: PropTypes.number.isRequired,
  maxAttemptsReached: PropTypes.bool.isRequired,
  lowBalance: PropTypes.bool.isRequired,
  result: PropTypes.bool.isRequired,
};
