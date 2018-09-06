import React, { Fragment } from 'react';
import { combineEpics, ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs/operators';
import { Translate } from 'react-localize-redux';
import { message } from 'antd';
import Providers from '../Providers';

export default combineEpics(
  (action$) => action$.pipe(
    ofType(
      'CREATE_WITHDRAW_SUCCESS',
    ),
    tap(() => {
      message.success(
        <span>
          <Providers><Fragment><Translate id="YOUR_REQUEST_TO_WITHDRAW_WILL_BE_HANDLED_IN_THE_NEAREST_TIME" />!</Fragment></Providers>
        </span>
      )
    }),
    ignoreElements()
  ),
);
