import { RSAA } from 'redux-api-middleware';

export const getGameConfig = () => {
  return {
    [RSAA]: {
      endpoint: `${process.env.REACT_APP_BASE_REST_URL}/game-config`,
      credentials: 'include',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      types: [
        'GET_GAME_CONFIG_REQUEST',
        'GET_GAME_CONFIG_SUCCESS',
        'GET_GAME_CONFIG_FAILURE'
      ]
    }
  };
};
