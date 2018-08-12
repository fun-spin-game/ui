import { connect } from 'react-redux';
export default () => connect(
  ({ games: { games, activeGameId } }) => {
    return {
      games: Object.values(games),
      activeGame: games[activeGameId],
    };
  }
);
