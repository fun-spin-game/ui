import { connect } from 'react-redux';
import { connectToGame, disconnectFromGame } from './actions';

const getActiveGame = ({ actions, userId, games }) => {
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

export default () => connect(
  ({ games: { games, actions }, user: { userInfo } }) => {
    return {
      games,
      actions,
      activeGame: userInfo ? getActiveGame({ games, actions, userId: userInfo.id }) : null,
    };
  }, (dispatch) => ({
    connectToGame({ gameId }) {
      return dispatch(connectToGame({ gameId }));
    },
    disconnectFromGame({ gameId }) {
      return dispatch(disconnectFromGame({ gameId }));
    },
  }), (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getAmountOfAttempts({ gameId }) {
      return 0;
    }
  }),
);
