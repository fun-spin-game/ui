import { RSAA } from 'redux-api-middleware';

export const getTables = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/tables`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_TABLES_REQUEST',
      'GET_TABLES_SUCCESS',
      'GET_TABLES_FAILURE'
    ]
  }
});
