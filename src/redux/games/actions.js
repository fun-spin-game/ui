export const connectToGame = ({ gameId }) => ({
  type: 'CONNECT_TO_GAME',
  payload: {
    gameId
  }
});
