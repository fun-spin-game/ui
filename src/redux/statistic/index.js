const initialState = {
  top: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_STATISTIC_REQUEST':
      return initialState;
    case 'GET_STATISTIC_SUCCESS':
      return { ...state, top: payload };
    default:
      return state;
  }
};

export default reducer;
