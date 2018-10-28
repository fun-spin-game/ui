const initialState = {
  history: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_WITHDRAWS_REQUEST':
      return initialState;
    case 'GET_WITHDRAWS_SUCCESS':
      return { ...state, history: payload };
    case 'CREATE_WITHDRAW_SUCCESS':
      return { ...state, history: [...state.history, { ...payload }] };
    default:
      return state;
  }
};

export default reducer;
