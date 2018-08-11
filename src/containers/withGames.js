import { connect } from 'react-redux';
export default () => connect(
  ({ games: { games }, user: { userInfo } }) => {
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
      games,
      activeGame,
    };
  }
);
