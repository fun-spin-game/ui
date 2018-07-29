const initialState = {
  top: [],
};

const userReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_STATISTIC_SUCCESS':
      return { ...state, top: payload };
    default:
      return state;
  }
};

export default userReducer;
