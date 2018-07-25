import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, ignoreElements, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import ws from '../../helpers/ws';
import { getActiveGame } from '../../helpers/gameUtils';

const interceptorDelay = (ms) => {
  return new Promise(resolve => setTimeout(() => resolve(true), parseInt(ms)));
};

const wsMessageToReduxInterceptor = ({ message, state }) => {
  switch (message.type) {
    case 'NOTIFICATION_GAME_SPIN':
      return false;
    case 'GAME_EXPIRED':{
      const activeGame = getActiveGame({
        actions: state.games.actions,
        games: state.games.games,
        userId: state.user.userInfo.id
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
      ws.init().on('message', async (message) => {
        const interceptorResult = await wsMessageToReduxInterceptor({ message, state: state$.value });
        if (interceptorResult) observer.next(message);
      })
    })),
  ),
  (action$) => action$.pipe(
    ofType('CONNECT_TO_GAME'),
    tap(({ payload }) => {
      ws.instance.send('CONNECT_TO_GAME', payload);
    }),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('DISCONNECT_FROM_GAME'),
    tap(({ payload }) => {
      ws.instance.send('DISCONNECT_FROM_GAME', payload);
    }),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('NOTIFICATION_GAME_SPIN'),
    tap(({ payload }) => {
      ws.instance.send('NOTIFICATION_GAME_SPIN', payload);
    }),
    ignoreElements()
  )
);
