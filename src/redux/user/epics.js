import { combineEpics, ofType } from 'redux-observable';
import { tap, ignoreElements, mapTo } from 'rxjs/operators';
import { notification } from 'antd';
import ws from '../../helpers/ws';
import { getUserInfo } from './actions';

export default combineEpics(
  (action$) => action$.pipe(
    ofType('LOGOUT_REQUEST'),
    tap(() => ws.instance.socket.close()),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('SIGN_UP_SUCCESS', 'SIGN_IN_SUCCESS'),
    mapTo(getUserInfo())
  ),
  (action$) => action$.pipe(
    ofType('SIGN_IN_FAILURE'),
    tap(() => {
      notification.error({
        duration: 10,
        message: 'Error',
        description: 'Login or password is incorrect!'
      });
    }),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('SIGN_UP_FAILURE'),
    tap(() => {
      notification.error({
        duration: 10,
        message: 'Error',
        description: 'Try another login!'
      });
    }),
    ignoreElements()
  ),
);
