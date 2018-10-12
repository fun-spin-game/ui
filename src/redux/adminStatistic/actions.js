import { RSAA } from 'redux-api-middleware';

export const getAdminStatistic = () => ({
  [RSAA]: {
    endpoint: `${process.env.REACT_APP_BASE_REST_URL}/admin-statistic`,
    credentials: 'include',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    types: [
      'GET_ADMIN_STATISTIC_REQUEST',
      'GET_ADMIN_STATISTIC_SUCCESS',
      'GET_ADMIN_STATISTIC_FAILURE'
    ]
  }
});
