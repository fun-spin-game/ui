import { CALL_API } from 'redux-api-middleware';

export default () => next => action => {
  const callApi = action[CALL_API];

  if (callApi) {
    callApi.credentials = 'include';
    callApi.headers = {
      'Content-Type': 'application/json',
      ...callApi.headers,
    };
  }
  return next(action)
}
