export const connectToGame = ({ gameId }) => ({
  type: 'NOTIFICATION_GAME_USER_CONNECT',
  payload: {
    gameId
  }
});
export const disconnectFromGame = ({ gameId }) => ({
  type: 'NOTIFICATION_GAME_USER_DISCONNECT',
  payload: {
    gameId
  }
});
export const notifyGameSpinStart = ({ gameId, result }) => ({
  type: 'NOTIFICATION_GAME_SPIN_START',
  payload: {
    gameId,
    result,
  }
});
export const notifyCreateGame = ({ game }) => ({
  type: 'NOTIFICATION_CREATE_GAME',
  payload: {
    game,
  }
});
export const setAppInFocus = (value) => ({
  type: 'SET_APP_IN_FOCUS',
  payload: {
    value,
  }
});
