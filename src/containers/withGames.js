import { connect } from 'react-redux';
import {
  connectToGame,
  disconnectFromGame,
  notifyGameSpinStart,
  notifyCreateGame,
  setAppInFocus,
} from '../redux/games/actions';

export default () => connect(
  ({ games: { games, appInFocus }, user: { userInfo } }) => {
    let activeGame = null;
    if (userInfo) {
      activeGame = games.find(o => o.connectedUserId === userInfo.id);
      if (activeGame) {
        activeGame.notWonYet = activeGame.won === 0;
        activeGame.amountOfAttempts = activeGame.won + activeGame.lost;
        activeGame.spinInProgress = !!activeGame.spinInProgress;
        activeGame.maxAttemptsReached = activeGame.amountOfAttempts >= activeGame.maxAttempts;
      }
    }

    return {
      appInFocus,
      games,
      activeGame,
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
  }),
);
