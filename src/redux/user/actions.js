import { RSAA } from 'redux-api-middleware';

export const getUserInfo = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/user`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_USER_INFO_REQUEST',
      'GET_USER_INFO_SUCCESS',
      'GET_USER_INFO_FAILURE'
    ]
  }
});

export const signIn = (values) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/auth/local`,
    method: 'POST',
    body: JSON.stringify(values),
    types: [
      'SIGN_IN_REQUEST',
      'SIGN_IN_SUCCESS',
      'SIGN_IN_FAILURE'
    ]
  }
});

export const signUp = (values) => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/sign-up`,
    method: 'POST',
    body: JSON.stringify(values),
    types: [
      'SIGN_UP_REQUEST',
      'SIGN_UP_SUCCESS',
      'SIGN_UP_FAILURE'
    ]
  }
});

export const logout = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/logout`,
    method: 'GET',
    types: [
      'LOGOUT_REQUEST',
      'LOGOUT_SUCCESS',
      'LOGOUT_FAILURE'
    ]
  }
});
