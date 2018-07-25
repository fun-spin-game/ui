import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Provider from './Provider';
import GameItem from '../Main/GameItem';

addDecorator((story) => <Provider story={story()} />);

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
