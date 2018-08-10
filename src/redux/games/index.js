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
    case 'GAME_UPDATED': {
      return {
        ...state,
        games: [
          ...state.games.map(game => {
            return game.id === payload.game.id ? payload.game : game;
          })
        ]
      }
    }
    case 'PLAYGROUND_UPDATED': {
      return {
        ...state,
        games: [
          ...state.games.reduce((prev, game) => {
            if (payload.expiredGamesIds.indexOf(game.id) !== -1) return prev;
            if (payload.gameUsersDisconnected.find(o => o.gameId === game.id && o.userId === game.connectedUserId)) {
              return [...prev, { ...game, connectedUserId: null, connectedUser: null, lastTouchAt: null }];
            }
            return [...prev, game ];
          }, []),
          ...payload.createdGames,
        ]
      }
    }
    default:
      return state
  }
}

export default reducer;
