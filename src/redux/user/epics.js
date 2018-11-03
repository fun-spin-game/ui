import { combineEpics, ofType } from 'redux-observable';
import { tap, ignoreElements, mapTo } from 'rxjs/operators';
import { notification } from 'antd';
import ws from '../../helpers/ws';
import { getUserInfo } from './actions';
import { Fragment } from 'react';
import { Translate } from 'react-localize-redux';
import Providers from '../Providers';
import React from 'react';

export default combineEpics(
  (action$) => action$.pipe(
    ofType('LOGOUT_REQUEST'),
    tap(() => {
      ws.instance.socket.close();
    }),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('SIGN_UP_SUCCESS', 'SIGN_IN_SUCCESS'),
    mapTo(getUserInfo())
  ),
  (action$) => action$.pipe(
    ofType('GET_USER_INFO_SUCCESS'),
    tap(({ payload: { id: userId } }) => {
      gtag('set', { 'user_id': userId }); // Задание идентификатора пользователя с помощью параметра user_id (текущий пользователь).
      ws.init();
    }),
    ignoreElements(),
  ),
  (action$) => action$.pipe(
    ofType('SIGN_IN_FAILURE'),
    tap((action) => {
      notification.error({
        duration: 10,
        description: <Providers>
          <Fragment>
            <Translate id={ action.payload.status === 401 ? 'EMAIL_OR_PASSWORD_IS_INCORRECT' : 'SERVER_ERROR'} />
          </Fragment>
        </Providers>
      });
    }),
    ignoreElements()
  ),
  (action$) => action$.pipe(
    ofType('SIGN_UP_FAILURE'),
    tap((action) => {
      notification.error({
        duration: 10,
        description: <Providers>
          <Fragment>
            <Translate id={ action.payload.status === 400 ? 'THIS_EMAIL_IS_BUSY' : 'SERVER_ERROR'} />
          </Fragment>
        </Providers>
      });
    }),
    ignoreElements()
  ),
);
