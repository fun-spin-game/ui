import { connect } from 'react-redux';
import { connectToGame, disconnectFromGame, notifyGameSpin, notifyCreateGame } from './actions';
import { getActiveGame } from '../../helpers/gameUtils';

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
    notifyGameSpin({ gameId, result }) {
      return dispatch(notifyGameSpin({ gameId, result }))
    },
    notifyCreateGame({ game }) {
      return dispatch(notifyCreateGame({ game }));
    }
  }), (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getAmountOfAttempts({ gameId }) {
      return stateProps.actions
      .filter((action) => action.type === 'GAME_SPIN' && gameId === action.payload.gameId).length;
    },
    getGamePlayer({ gameId }) {
      const { actions } = stateProps;
      const lastGameAction = [...actions].reverse().find(({ payload }) => gameId === payload.gameId)
      if (lastGameAction && lastGameAction.type !== 'GAME_USER_DISCONNECTED') return lastGameAction.payload.user;
      else return null
    }
  }),
);
