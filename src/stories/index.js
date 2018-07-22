import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.css";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.css";


import Login from '../Login';
import SignUp from '../Login/SignUp';
import Main from '../Main';
import GameItem from '../Main/GameItem';
import Roulette from '../Main/Roulette';
import Game from '../Main/Game';
import CreateGameForm from '../Main/CreateGameForm';

addDecorator(withKnobs);

const GAMES = [
  {
    id: 1,
    prize: 20,
    bid: 20,
    chanceToWin: 50,
    maxAttempts: 10,
  },
  {
    prize: 100,
    bid: 150,
    chanceToWin: 75,
    maxAttempts: 10,
    player: {

    }
  },
  {
    prize: 5,
    bid: 2,
    chanceToWin: 15,
    maxAttempts: 10,
  },
  {
    prize: 20,
    bid: 20,
    chanceToWin: 70,
    maxAttempts: 10,
  },
  {
    prize: 100,
    bid: 150,
    chanceToWin: 90,
    maxAttempts: 10,
  },
  {
    prize: 5,
    bid: 2,
    chanceToWin: 30,
    maxAttempts: 10,
  },
  {
    prize: 20,
    bid: 20,
    chanceToWin: 50,
    maxAttempts: 10,
  },
  {
    prize: 100,
    bid: 150,
    chanceToWin: 10,
    maxAttempts: 10,
  },
  {
    prize: 5,
    bid: 2,
    chanceToWin: 45,
    maxAttempts: 10,
  }
];

const GAMES_ACTIONS = [
  {
    id: 1,
    action: 'GAME_SPIN_REQUEST',
    gameUser: {
      id: 1,
      user: {
        avatarLink: 'http://ololo.com',
      },
    },
    payload: {
      gameId: 1,
    }
  },
  {
    action: 'GAME_SPIN_RESPONSE',
    gameUser: {
      id: 1,
      user: {
        avatarLink: 'http://ololo.com',
      },
    },
    payload: {
      gameId: 1,
      requestGameActionId: 1,
    }
  },
];

storiesOf('Login', module).add('Not authenticated', () => <Login />);
storiesOf('SignUp', module).add('default', () => <SignUp />);
storiesOf('Main', module)
.add('default', () => { return (
  <Main
    games={GAMES}
    actions={GAMES_ACTIONS}
  />
)})
.add('withActiveGame', () => { return (
  <Main
    games={GAMES}
    actions={GAMES_ACTIONS}
    activeGameId={1}
  />
)});
storiesOf('GameItem', module)
.add('default', () => { return (
  <GameItem
    id={1}
    chanceToWin={10}
    prize={100}
    bid={10}
    tries={2}
    maxAttempts={10}
    inProgress={false}
  />
)})
.add('inProgress', () => { return (
  <GameItem
    id={1}
    chanceToWin={10}
    prize={100}
    bid={10}
    tries={2}
    maxAttempts={10}
    inProgress={true}
  />
)})
.add('won', () => { return (
  <GameItem
    id={1}
    chanceToWin={10}
    prize={100}
    bid={10}
    tries={2}
    maxAttempts={10}
    won={true}
  />
)})
.add('lost', () => { return (
  <GameItem
    id={1}
    chanceToWin={10}
    prize={100}
    bid={10}
    tries={2}
    maxAttempts={10}
    lost={true}
  />
)});

storiesOf('Roulette', module)
.add('default', () => { return (
  <Roulette
    prize={100}
    bid={100}
    chancePercentage={50}
    onClickPlay={() => {}}
    onSpinFinished={() => {}}
    inProgress={boolean('inProgress', false)}
  />
)});


storiesOf('Game', module)
.add('default', () => {
  const activeGame = GAMES[0];
  return (
  <Game
    activeGame={{ ...activeGame }}
    amountOfAttempts={4}
    balance={10}
  />
)});
storiesOf('CreateGameForm', module)
.add('default', () => {
  return (
  <CreateGameForm
    balance={100}
    handleSubmit={() => {}}
    onCancel={() => {}}
    visible={true}
  />
)});
