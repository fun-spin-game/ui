import { connect } from 'react-redux';
import {
  connectToGame,
  disconnectFromGame,
  notifyGameSpinStart,
  notifyCreateGame,
  setAppInFocus,
} from '../redux/games/actions';
import { getActiveGame, getLastGameAction } from '../helpers/gameUtils';

export default () => connect(
  ({ games: { games, actions, appInFocus }, user: { userInfo } }) => {
    return {
      appInFocus,
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
    notifyGameSpinStart({ gameId, result }) {
      return dispatch(notifyGameSpinStart({ gameId, result }))
    },
    notifyCreateGame({ game }) {
      return dispatch(notifyCreateGame({ game }));
    },
    setAppInFocus(val) {
      return dispatch(setAppInFocus(val));
    }
  }), (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    getAmountOfAttempts({ gameId }) {
      return stateProps.actions
      .filter((action) => action.type === 'GAME_SPIN_DONE' && gameId === action.payload.gameId).length;
    },
    getGamePlayer({ gameId }) {
      const { actions } = stateProps;
      const lastGameAction = getLastGameAction({ actions, gameId });
      if (lastGameAction && lastGameAction.type !== 'GAME_USER_DISCONNECTED') return lastGameAction.payload.user;
      else return null
    },
    isGameSpinInProgress({ gameId }) {
      const { actions } = stateProps;
      const lastGameAction = getLastGameAction({ actions, gameId });
      return lastGameAction && lastGameAction.type === 'GAME_SPIN_START';
    },
    isGameNotWonYet({ gameId }) {
      const { actions } = stateProps;
      const wonGameAction = actions.filter(o => o.payload.gameId === gameId && o.payload.result > 0);
      return !wonGameAction.length;
    }
  }),
);
