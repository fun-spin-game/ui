const reducer = (state = null, { type, payload }) => {
  switch (type) {
    case 'GET_GAME_CONFIG_SUCCESS':
      return { ...payload };
    default:
      return state;
  }
};

export default reducer;
