import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';

import Provider from './Provider';
import Login from '../Login';

addDecorator((story) => <Provider story={story()} />);

storiesOf('Login', module).add('Not authenticated', () => <Login />);
