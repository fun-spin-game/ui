import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss'
import { Progress, Icon } from 'antd';
import { compose, branch, renderComponent } from 'recompose';
import Roulette from './Roulette';
import withGames from '../redux/games/withGames';

class Game extends Component {
  render() {
    const {
      classes,
      activeGame: {
        chanceToWin,
        prize,
        maxAttempts,
        id: gameId,
      },
      disconnectFromGame,
      getAmountOfAttempts
    } = this.props;
    const amountOfAttempts = getAmountOfAttempts({ gameId });
    return (
      <div className={classes.rouletteOverlay}>
        <a onClick={() => disconnectFromGame({ gameId })}>
          <Icon type="close" className={classes.close} />
        </a>
        <div className={classes.chancePercentage}>{chanceToWin}% chance to win!</div>
        <Roulette
          prize={prize}
          chanceToWin={chanceToWin}
          onClickPlay={() => {}}
          onSpinFinished={() => {}}
          inProgress={false}
        />
        <div className={classes.attemptsBlock}>
          <Progress size="small" percent={amountOfAttempts / maxAttempts * 100} />
          <span>{amountOfAttempts}/{maxAttempts} attempts left</span>
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
    'z-index': 10,
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
  },
  chancePercentage: {
    'font-size': '35px',
    color: 'white',
    'text-align': 'center',
  },
  attemptsBlock: {
    'text-align': 'center',
    'font-size': '18px',
    color: 'white',
    'margin-top': 60,
    'margin-right': 0,
    padding: '0 50px',
    '& .ant-progress-outer': {
      'padding-right': 0
    },
    '& .ant-progress-bg': {
      height: '2px !important',
    }
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 20,
    'font-size': '50px',
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
  withGames(),
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
};
