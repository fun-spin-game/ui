import { RSAA } from 'redux-api-middleware';

export const getStatistic = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/statistic`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_STATISTIC_REQUEST',
      'GET_STATISTIC_SUCCESS',
      'GET_STATISTIC_FAILURE'
    ]
  }
});
