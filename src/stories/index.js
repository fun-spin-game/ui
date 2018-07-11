import React from 'react';

import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "animate.css/animate.css";
import "../index.css";
import "@fortawesome/fontawesome-free/css/all.css";

import { storiesOf } from '@storybook/react';
import Login from '../Login';
import SignUp from '../Login/SignUp';
import Main from '../Main';
import GameItem from '../Main/GameItem';

storiesOf('Login', module).add('Not authenticated', () => <Login />);
storiesOf('SignUp', module).add('default', () => <SignUp />);
storiesOf('Main', module).add('default', () => { return (
  <Main
    relatedActions={[
      {
        action: 'GAME_ITEM_REQUEST',
        gameUser: {
          id: 1,
          user: {
            avatarLink: 'http://ololo.com',
          },
        },
        payload: {
          gameItemId: 1,
        }
      }
    ]}
  />
)});
storiesOf('GameItem', module)
.add('default', () => { return (
  <GameItem
    id={1}
    percentage={10}
    prize={100}
    bid={10}
    tries={2}
    maxTries={10}
    inProgress={false}
  />
)})
.add('inProgress', () => { return (
  <GameItem
    id={1}
    percentage={10}
    prize={100}
    bid={10}
    tries={2}
    maxTries={10}
    inProgress={true}
  />
)})
.add('won', () => { return (
  <GameItem
    id={1}
    percentage={10}
    prize={100}
    bid={10}
    tries={2}
    maxTries={10}
    won={true}
  />
)})
.add('lost', () => { return (
  <GameItem
    id={1}
    percentage={10}
    prize={100}
    bid={10}
    tries={2}
    maxTries={10}
    lost={true}
  />
)});
