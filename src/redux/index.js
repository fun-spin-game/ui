import { combineReducers } from 'redux';
import games from './games';
import { combineEpics } from 'redux-observable';
import { localizeReducer } from 'react-localize-redux';
import user from './user';
import statistic from './statistic';
import userEpic from './user/epics';
import gameEpic from './games/epics';
import statisticEpic from './statistic/epics';

export const rootReducer = combineReducers({
  games,
  user,
  statistic,
  localize: localizeReducer,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
);
