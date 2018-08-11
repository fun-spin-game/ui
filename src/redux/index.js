import { combineReducers } from 'redux';
import games from './games';
import meta from './meta';
import { combineEpics } from 'redux-observable';
import { localizeReducer } from 'react-localize-redux';
import user from './user';
import statistic from './statistic';
import withdraws from './withdraws';
import userEpic from './user/epics';
import gameEpic from './games/epics';
import statisticEpic from './statistic/epics';
import paymentsEpic from './withdraws/epics';

export const rootReducer = combineReducers({
  games,
  user,
  statistic,
  withdraws,
  meta,
  localize: localizeReducer,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
  paymentsEpic,
);
