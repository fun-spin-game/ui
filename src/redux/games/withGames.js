import { connect } from 'react-redux';

export default () => connect(({ games: { games, actions, activeGameId } }) => {
  return {
    games,
    actions,
    activeGameId,
  };
});
