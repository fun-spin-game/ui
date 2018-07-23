export const connectToGame = ({ gameId }) => ({
  type: 'CONNECT_TO_GAME',
  payload: {
    gameId
  }
});
export const disconnectFromGame = ({ gameId }) => ({
  type: 'DISCONNECT_FROM_GAME',
  payload: {
    gameId
  }
});
