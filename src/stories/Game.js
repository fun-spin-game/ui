import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Provider from './Provider';
import Game from '../Main/Game';

addDecorator((story) => <Provider story={story()} />);

storiesOf('Game', module)
.add('default', () => {
  const activeGame = {
    id: 1,
    prize: 20,
    bid: 20,
    chanceToWin: 50,
    maxAttempts: 10,
  };
  return (
  <Game
    activeGame={{ ...activeGame }}
    amountOfAttempts={4}
    balance={10}
  />
)});
