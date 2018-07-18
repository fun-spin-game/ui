const gamesReducer = (state = {
  games: [],
  actions: [],
  activeGameId: null,
}, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const createGame = (game) => ({
  type: 'CREATE_GAME',
  game
})

export default gamesReducer;
