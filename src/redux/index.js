import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';

import games from './games';
import meta from './meta';
import user from './user';
import statistic from './statistic';
import tables from './tables';
import withdraws from './withdraws';
import purchases from './purchases';
import spinners from './spinners';
import gameConfig from './gameConfig';
import adminStatistic from './adminStatistic';

import userEpic from './user/epics';
import gameEpic from './games/epics';
import statisticEpic from './statistic/epics';
import paymentsEpic from './withdraws/epics';
import tablesEpic from './tables/epics';

import { setSpinnerStatus } from './spinners/actions';

export const rootReducer = combineReducers({
  games,
  user,
  statistic,
  withdraws,
  purchases,
  meta,
  spinners,
  gameConfig,
  tables,
  adminStatistic,
  localize: localizeReducer,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
  paymentsEpic,
  tablesEpic,
  (action$) => action$.pipe(
    filter(({ type }) => type.indexOf('REQUEST') !== -1),
    map(({ type }) => setSpinnerStatus({ key: `REST_API.${type}`, active: true })),
  ),
);
