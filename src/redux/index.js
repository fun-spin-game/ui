import { combineReducers } from 'redux';
import {
  routerReducer,
} from 'react-router-redux';
import games from './games';
import { combineEpics } from 'redux-observable';
import user from './user';
import userEpic from './user/epics';

export const rootReducer = combineReducers({
  games,
  user,
  router: routerReducer
});

export const rootEpic = combineEpics(
  userEpic,
);
