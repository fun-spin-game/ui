export const getRisk = ({ prize, chanceToWin }) => {
  return prize * chanceToWin / (100 - chanceToWin);
};

export const getActiveGame = ({ actions, userId, games }) => {
  const reversedActions = [...actions].reverse();
  const lastRelevantAction = reversedActions.find(({ type, payload }) => {
    return payload.userId === userId &&
    (type === 'GAME_USER_CONNECTED' ||
    type === 'GAME_USER_DISCONNECTED');
  });
  const activeGameId = (
    lastRelevantAction &&
    lastRelevantAction.type === 'GAME_USER_CONNECTED' &&
    lastRelevantAction.payload.userId === userId
  ) ? lastRelevantAction.payload.gameId : null;

  return games.find(({ id }) => id === activeGameId);
};

export const getLastGameAction = ({ gameId, actions }) => [...actions].reverse().find(({ payload }) => gameId === payload.gameId);

export const toFixedIfNeed = (val) => {
  return parseFloat(val.toFixed(process.env.REACT_APP_FIXED_DIGITS));
};
