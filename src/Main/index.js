import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss';
import FlipMove from 'react-flip-move';
import { Button } from 'antd';
import { compose } from 'recompose';
import GameItem from './GameItem';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';

class Main extends Component {
  constructor() {
    super();

    this.state = {
      createGameMode: false,
    };
  }
  toggleCreateGameModal(value) {
    this.setState({
      createGameMode: value,
    })
  }
  render() {
    const {
      classes,
      games,
      connectToGame,
      notifyCreateGame,
      getGamePlayer,
      appInFocus,
      userInfo: { balance },
      isGameNotWonYet,
    } = this.props;
    return (
      <Fragment>
        <h1 className={classes.title}>Lots:</h1>
        <div className={`${classes.gameItems}`}>
          <FlipMove leaveAnimation="accordionVertical" disableAllAnimations={!appInFocus}>
            {
              _.sortBy(games, [({ risk }) => balance <= risk, 'prize'])
              .map(({ prize, risk, chanceToWin, maxAttempts, creatorUser, id: gameId }) => {
                return (
                  <GameItem
                    id={gameId}
                    key={gameId}
                    prize={prize}
                    risk={risk}
                    notWonYet={isGameNotWonYet({ gameId })}
                    creatorUser={creatorUser}
                    chanceToWin={chanceToWin}
                    maxAttempts={maxAttempts}
                    onClickPlay={connectToGame}
                    disabled={balance < risk}
                    gamePlayer={getGamePlayer({ gameId })}
                  />
                );
              })
            }
          </FlipMove>
        </div>
        <div className={classes.createGameBlock}>
          <Button type="primary" onClick={() => this.toggleCreateGameModal(true)} className={classes.createGameBtn}>Create lot</Button>
        </div>
        <Game />
        <CreateGameForm
          visible={this.state.createGameMode}
          onCancel={() => this.toggleCreateGameModal(false)}
            handleSubmit={(values) => { notifyCreateGame({ game: values }); this.toggleCreateGameModal(false) }}
        />
      </Fragment>
    )
  }
}

const styles = {
  gameItems: {
    '& > *': {
      'padding-top': 50,
      display: 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'space-evenly',
    }
  },
  chanceToWin: {
    'margin-bottom': '5px',
  },
  menuFirstItem: {
    'margin-top': '0 !important',
  },
  title: {
    'text-align': 'center',
  },
  createGameBlock: {
    'text-align': 'center',
    padding: '25px 0',
  }
};

export default compose(
  injectSheet(styles),
  withUser(),
  withGames(),
)(Main);

Main.defaultProps = {
  activeGame: null,
};

Main.propTypes = {
  classes: PropTypes.object.isRequired,
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  connectToGame: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  getGamePlayer: PropTypes.func.isRequired,
  appInFocus: PropTypes.bool.isRequired,
  isGameNotWonYet: PropTypes.func.isRequired,
  notifyCreateGame: PropTypes.func.isRequired,
};
