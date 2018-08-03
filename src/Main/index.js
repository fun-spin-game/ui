import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import injectSheet from 'react-jss';
import FlipMove from 'react-flip-move';
import { Button, Select, Slider } from 'antd';
import { withLocalize } from 'react-localize-redux';
import { compose } from 'recompose';
import GameItem from './GameItem';
import Game from './Game';
import CreateGameForm from './CreateGameForm';
import withGames from '../containers/withGames';
import withUser from '../containers/withUser';
import PageTitle from '../common/PageTitle';
import Coins from '../common/Coins';

const Option = Select.Option;



const FILTERS = new Array(200 / 20)
.fill()
.map((o, index) => ({ min: index * 20, max: (index + 1) * 20 }));

class Main extends Component {
  constructor() {
    super();

    this.state = {
      createGameMode: false,
      filter: 0,
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
      translate,
    } = this.props;
    const filter = FILTERS[this.state.filter];
    const filteredGames = games.filter(o => o.prize >= filter.min && o.prize <= filter.max);
    return (
      <Fragment>
        <PageTitle>{translate('LOTS')}:</PageTitle>
        <Slider
          defaultValue={0}
          min={0}
          max={FILTERS.length - 1}
          onAfterChange={(value) => { this.setState({ filter: value }) }}
          tipFormatter={(value) => (<span>{FILTERS[value].min} <Coins /> - {FILTERS[value].max} <Coins /></span>)}
        />
        <div className={`${classes.gameItems}`}>
          <FlipMove leaveAnimation="accordionVertical" disableAllAnimations={!appInFocus}>
            {
              _.sortBy(filteredGames, [({ risk }) => balance <= risk, 'prize'])
              .map(({ prize, risk, chanceToWin, maxAttempts, creatorUser, id: gameId }) => {
                return (
                  <div key={gameId}>
                    <GameItem
                      id={gameId}
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
                  </div>
                );
              })
            }
          </FlipMove>
        </div>
        <div className={classes.createGameBlock}>
          <Button
            type="primary"
            onClick={() => this.toggleCreateGameModal(true)}
            className={classes.createGameBtn}
          >
            {translate('CREATE_LOT')}
          </Button>
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
      display: 'flex',
      'flex-wrap': 'wrap',
      'justify-content': 'space-around',
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
  withLocalize,
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
  translate: PropTypes.func.isRequired,
  notifyCreateGame: PropTypes.func.isRequired,
};
