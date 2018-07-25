import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { boolean, withKnobs } from '@storybook/addon-knobs';

import Provider from './Provider';
import Roulette from '../Main/Roulette';

addDecorator((story) => <Provider story={story()} />);
addDecorator(withKnobs);

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
