import { RSAA } from 'redux-api-middleware';

export const getPurchases = ({ filter }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/purchases?filter=${JSON.stringify(filter)}`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_PURCHASES_REQUEST',
        'GET_PURCHASES_SUCCESS',
        'GET_PURCHASES_FAILURE'
      ]
    }
  };
};

export const createPurchase = ({ userId, amount }) => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/user/${userId}/purchase`,
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
      types: [
        'CREATE_PURCHASEW_REQUEST',
        'CREATE_PURCHASEW_SUCCESS',
        'CREATE_PURCHASEW_FAILURE'
      ]
    }
  };
};

