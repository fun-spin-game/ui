import { combineEpics } from 'redux-observable';
import { filter, map } from 'rxjs/operators';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import games from './games';
import meta from './meta';
import user from './user';
import statistic from './statistic';
import withdraws from './withdraws';
import spinners from './spinners';
import userEpic from './user/epics';
import gameEpic from './games/epics';
import statisticEpic from './statistic/epics';
import paymentsEpic from './withdraws/epics';
import { setSpinnerStatus } from './spinners/actions';

export const rootReducer = combineReducers({
  games,
  user,
  statistic,
  withdraws,
  meta,
  spinners,
  localize: localizeReducer,
});

export const rootEpic = combineEpics(
  userEpic,
  gameEpic,
  statisticEpic,
  paymentsEpic,
  (action$) => action$.pipe(
    filter(({ type }) => type.indexOf('REQUEST') !== -1),
    map(({ type }) => setSpinnerStatus({ key: `REST_API.${type}`, active: true })),
  ),
);
