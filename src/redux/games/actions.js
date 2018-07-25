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
export const notifyGameSpin = ({ gameId, result }) => ({
  type: 'NOTIFICATION_GAME_SPIN',
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
