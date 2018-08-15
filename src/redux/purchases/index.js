const initialState = {
  history: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_PURCHASES_SUCCESS':
      return { ...state, history: payload };
    case 'CREATE_PURCHASES_SUCCESS':
      return { ...state, history: [...state.history, { ...payload }] };
    default:
      return state;
  }
};

export default reducer;
