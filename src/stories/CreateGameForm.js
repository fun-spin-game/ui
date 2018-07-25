import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Provider from './Provider';
import CreateGameForm from '../Main/CreateGameForm';

addDecorator((story) => <Provider story={story()} />);

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
