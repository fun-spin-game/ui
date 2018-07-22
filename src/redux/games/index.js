const gamesReducer = (state = {
  games: [],
  actions: [],
  activeGameId: null,
}, { type, payload },) => {
  switch (type) {
    case 'INIT_DATA': {
      const { games } = payload;
      const actions = [].concat.apply(this, games.map(({ gameActions }) => [...gameActions]));
      return {
        ...state,
        games: games.map((game) => { delete game.gameActions; return game; }),
        actions,
      };
    }
    case 'GAME_EXPIRED': {
      return {
        ...state,
        games: state.games.filter((game) => game.id !== payload.id),
      }
    }
    case 'GAME_CREATED': {
      return {
        ...state,
        games: [ ...state.games, payload ],
      }
    }
    default:
      return state
  }
}

export const createGame = (game) => ({
  type: 'CREATE_GAME',
  game
})

export default gamesReducer;
