import React, { Fragment } from 'react';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, ignoreElements, tap, mapTo } from 'rxjs/operators';
import { notification, message } from 'antd';
import { Observable } from 'rxjs';
import { Translate } from 'react-localize-redux';
import ws from '../../helpers/ws';
import Coins from '../../common/Coins';
import Providers from '../Providers';
import { setSpinnerStatus } from '../spinners/actions';

const wsMessageToReduxInterceptor = ({ message }) => {
  if (message.type.indexOf('NOTIFICATION') !== -1) return false;
  return true;
}

export default combineEpics(
  (action$, state$) => action$.pipe(
    ofType('GET_USER_INFO_SUCCESS'),
    mergeMap(() => Observable.create(observer => {
      ws.instance
      .on('close', () => {
        if (state$.value.user.userInfo)
          notification.error({
            key: 'CONNECTION_LOST',
            description: (
              <Providers>
                <Fragment>
                  <Translate id="CONNECTION_WITH_SERVER_LOST_TRYINT_TO_RECONNECT" />...
                </Fragment>
              </Providers>
            ),
            duration: 0,
          });
      })
      .on('open', () => notification.close( 'CONNECTION_LOST'))
      .on('message', async (message) => {
        const interceptorResult = await wsMessageToReduxInterceptor({ message, state: state$.value });
        if (interceptorResult) observer.next(message);
      })
    })),
  ),
  (action$) => action$.pipe(
    ofType(
      'NOTIFICATION_GAME_USER_CONNECT',
    ),
    mapTo(setSpinnerStatus({ key: 'GAME_CHOOSE', active: true })),
  ),
  (action$) => action$.pipe(
    ofType(
      'NOTIFICATION_GAME_USER_CONNECT',
      'NOTIFICATION_GAME_USER_DISCONNECT',
      'NOTIFICATION_CREATE_GAME',
      'NOTIFICATION_GAME_SPIN_START',
    ),
    tap(({ type, payload }) => {
      ws.instance.send(type, payload);
    }),
    ignoreElements()
  ),
  (action$, state$) => action$.pipe(
    ofType('GAME_UPDATED'),
    tap(({ payload: { result, reason, game: { creatorUserId, risk, connectedUser } } }) => {
      if (reason !== 'GAME_SPIN_DONE' || creatorUserId !== state$.value.user.userInfo.id) return;
      const { displayName } = connectedUser;
      if (result < 0) {
        message.success(<span>
          +{risk} <Coins /> <Providers><Fragment><Translate id="USER_LOSE_IN_YOU_LOT" data={{ displayName }} />!</Fragment></Providers>
        </span>)
      } else {
        message.error(<span>
          -{risk} <Coins /> <Providers><Fragment><Translate id="USER_WON_IN_YOU_LOT" data={{ displayName }} /></Fragment></Providers>
        </span>)
      }
    }),
    ignoreElements()
  ),
  (action$, $state) => action$.pipe(
    ofType(
      'GAME_CREATED',
    ),
    tap(({ payload: { game: { creatorUserId } } }) => {
      if (creatorUserId == $state.value.user.userInfo.id) message.info(
        <Providers><Translate id="LOT_CREATED" /></Providers>
      )
    }),
    ignoreElements()
  ),
  (action$, $state) => action$.pipe(
    ofType(
      'PLAYGROUND_UPDATED',
    ),
    tap(({ payload: { notifyUsersCreatorsIdsAboutGameExpired } }) => {
      if (notifyUsersCreatorsIdsAboutGameExpired.indexOf($state.value.user.userInfo.id) !== -1)
      message.info(
        <Providers><Translate id="YOU_LOT_EXPIRED" /></Providers>
      )
    }),
    ignoreElements()
  ),
);
