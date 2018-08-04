const initialState = {
  history: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_PAYMENTS_SUCCESS':
      return { ...state, history: payload };
    default:
      return state;
  }
};

export default reducer;
