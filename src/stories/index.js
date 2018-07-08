import React from 'react';

import 'antd/dist/antd.css';

import { storiesOf } from '@storybook/react';
import Home from '../Home';
import SignUp from '../Home/SignUp.js';

storiesOf('Home', module).add('Not authenticated', () => <Home />);
storiesOf('SignUp', module).add('default', () => <SignUp />);
