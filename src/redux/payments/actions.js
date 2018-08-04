import { RSAA } from 'redux-api-middleware';

export const getPayments = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/payments`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_PAYMENTS_REQUEST',
      'GET_PAYMENTS_SUCCESS',
      'GET_PAYMENTS_FAILURE'
    ]
  }
});
