import { RSAA } from 'redux-api-middleware';

export const getWithdraws = ({ filter }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/withdraws?filter=${JSON.stringify(filter)}`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_WITHDRAWS_REQUEST',
        'GET_WITHDRAWS_SUCCESS',
        'GET_WITHDRAWS_FAILURE'
      ]
    }
  };
};

export const createWithdraw = ({ amount, method, requisite }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/withdraws`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, method, requisite }),
      types: [
        'CREATE_WITHDRAW_REQUEST',
        'CREATE_WITHDRAW_SUCCESS',
        'CREATE_WITHDRAW_FAILURE'
      ]
    }
  };
};
