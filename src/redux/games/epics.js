import React from 'react';
import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, ignoreElements, tap } from 'rxjs/operators';
import { notification, message } from 'antd';
import { Observable } from 'rxjs';
import ws from '../../helpers/ws';
import { getActiveGame } from '../../helpers/gameUtils';
import Coins from '../../common/Coins';

const interceptorDelay = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(true), parseInt(ms)));
};

const wsMessageToReduxInterceptor = ({ message, state }) => {
  if (message.type.indexOf('NOTIFICATION') !== -1) return false;
  switch (message.type) {
    case 'GAME_EXPIRED':{
      const activeGame = getActiveGame({
        actions: state.games.actions,
        games: state.games.games,
        userId: state.user.userInfo || state.user.userInfo.id
      });
      if (activeGame && activeGame.id === message.payload.gameId) {
        return interceptorDelay(process.env.REACT_APP_ACTIVE_GAME_EXPIRED_DELAY);
      }
    }
  }
  return true;
}

export default combineEpics(
  (action$, state$) => action$.pipe(
    ofType('GET_USER_INFO_SUCCESS'),
    mergeMap(() => Observable.create(observer => {
      ws.init()
      .on('close', () => notification.error({
        key: 'CONNECTION_LOST',
        description: 'Conection with server is lost. Trying to reconnect...',
        duration: 0,
      }))
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
    ofType('GAME_SPIN_DONE'),
    tap(({ payload: { result, game: { creatorUserId, risk }, user: { displayName } } }) => {
      if (creatorUserId !== state$.value.user.userInfo.id) return;
      if (result < 0) {
        message.success(<span>+{risk} <Coins /> User {displayName} lose in you lot</span>)
      } else {
        message.error(<span>-{risk} <Coins /> User {displayName} won in you lot</span>)
      }
    }),
    ignoreElements()
  ),
  (action$, $state) => action$.pipe(
    ofType(
      'GAME_CREATED',
    ),
    tap(({ payload: { game: { creatorUserId } } }) => {
      if (creatorUserId == $state.value.user.userInfo.id) message.info('Game created')
    }),
    ignoreElements()
  ),
  (action$, $state) => action$.pipe(
    ofType(
      'PLAYGROUND_UPDATED',
    ),
    tap(({ payload: { notifyUsersCreatorsIdsAboutGameExpired } }) => {
      if (notifyUsersCreatorsIdsAboutGameExpired.indexOf($state.value.user.userInfo.id) !== -1)
      message.info('You game expired')
    }),
    ignoreElements()
  ),
);
