import { combineEpics, ofType } from 'redux-observable';
import { tap, ignoreElements } from 'rxjs/operators';
import ws from '../../helpers/ws';

export default combineEpics(
  (action$) => action$.pipe(
    ofType('GET_USER_INFO_SUCCESS'),
    tap(() => {
      ws.init();
      ws.instance.connect();
    }),
    ignoreElements()
  )
);
