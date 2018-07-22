import { combineEpics, ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
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
);
