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
})

export const logout = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/logout`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'LOGOUT_REQUEST',
      'LOGOUT_SUCCESS',
      'LOGOUT_FAILURE'
    ]
  }
})
