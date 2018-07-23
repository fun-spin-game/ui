import { combineEpics, ofType } from 'redux-observable';
import { mergeMap, ignoreElements, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import ws from '../../helpers/ws';

export default combineEpics(
  (action$) => action$.pipe(
    ofType('GET_USER_INFO_SUCCESS'),
    mergeMap(() => Observable.create(observer => {
      ws.init().on('message', (message) => {
        observer.next(message);
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
);
