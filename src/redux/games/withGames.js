import { connect } from 'react-redux';
import { connectToGame } from './actions';

export default () => connect(
  ({ games: { games, actions, activeGameId } }) => {
    return {
      games,
      actions,
      activeGameId,
    };
  }, (dispatch) => ({
    connectToGame({ gameId }) {
      return dispatch(connectToGame({ gameId }));
    },
  }),
);
