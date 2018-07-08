import React from 'react';

import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../index.css";

import { storiesOf } from '@storybook/react';
import Login from '../Login';
import SignUp from '../Login/SignUp';
import Main from '../Main';

storiesOf('Login', module).add('Not authenticated', () => <Login />);
storiesOf('SignUp', module).add('default', () => <SignUp />);
storiesOf('Main', module).add('default', () => <Main />);
