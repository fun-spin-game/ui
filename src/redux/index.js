import { combineReducers } from 'redux';
import games from './games';
import { combineEpics } from 'redux-observable';
import user from './user';
import statistic from './statistic';
import userEpic from './user/epics';
import gameEpic from './games/epics';
import statisticEpic from './statistic/epics';

export const rootReducer = combineReducers({
  games,
  user,
  statistic,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
);
