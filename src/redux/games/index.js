import _ from 'lodash';

const reducer = (state = {
  games: [],
  activeGameId: null,
}, { type, payload, meta = {} },) => {
  switch (type) {
    case 'INIT_DATA': {
      const { games } = payload;
      return {
        ...state,
        games: _.keyBy(games, 'id'),
      };
    }
    case 'GAME_EXPIRED': {
      return {
        ...state,
        games: _.omit(state.games, payload.gameId),
      }
    }
    case 'GAME_CREATED': {
      return {
        ...state,
        games: { ...state.games, [payload.game.id]: payload.game },
      }
    }
    case 'GAME_UPDATED': {
      return {
        ...state,
        games: { ...state.games, [payload.game.id]: { ...state.games[payload.game.id], ...payload.game } },
        activeGameId: meta.activeGameId !== undefined ? meta.activeGameId : state.activeGameId,
      }
    }
    case 'PLAYGROUND_UPDATED': {
      return {
        ...state,
        games: _.assign(
          Object.keys(state.games).reduce((prev, gameId) => {
            const game = state.games[gameId];

            if (payload.expiredGamesIds.indexOf(game.id) !== -1) {
              return prev;
            }

            if (payload.gameUsersDisconnected.find(o => o.gameId === game.id && o.userId === game.connectedUserId)) {
              prev[gameId] = { ...game, connectedUserId: null, connectedUser: null, lastTouchAt: null };
              return prev
            }
            prev[gameId] = game;
            return prev;
          }, {}),
          _.keyBy(payload.createdGames, 'id'),
        ),
        activeGameId: payload.gameUsersDisconnected.find(o => o.gameId === state.activeGameId) ? null : state.activeGameId,
      }
    }
    default:
      return state
  }
};

export default reducer;
