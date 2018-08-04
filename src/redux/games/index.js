const reducer = (state = {
  games: [],
  actions: [],
  appInFocus: true,
}, { type, payload },) => {
  switch (type) {
    case 'SET_APP_IN_FOCUS':
      return { ...state, appInFocus: payload.value };
    case 'INIT_DATA': {
      const { games, actions } = payload;
      return {
        ...state,
        games: games.map((game) => { delete game.gameActions; return game; }),
        actions,
      };
    }
    case 'GAME_EXPIRED': {
      return {
        ...state,
        games: state.games.filter((game) => game.id !== payload.gameId),
      }
    }
    case 'GAME_CREATED': {
      return {
        ...state,
        games: [ ...state.games, payload.game ],
      }
    }
    case 'GAME_SPIN_DONE':
    case 'GAME_SPIN_START':
    case 'GAME_USER_DISCONNECTED':
    case 'GAME_USER_CONNECTED': {
      return {
        ...state,
        actions: [...state.actions, {type, payload}]
      }
    }
    case 'PLAYGROUND_UPDATED': {
      return {
        ...state,
        actions: [...state.actions, ...payload.gameUserDisconnectGameActions],
        games: [
          ...state.games.filter(o => payload.expiredGamesIds.indexOf(o.id) === -1),
          ...payload.createdGames,
        ]
      }
    }
    default:
      return state
  }
}

export default reducer;
