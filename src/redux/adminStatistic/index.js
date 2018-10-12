const initialState = {
  adminStatistic: null,
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_ADMIN_STATISTIC_REQUEST':
      return { ...initialState };
    case 'GET_ADMIN_STATISTIC_SUCCESS':
      return { ...state, adminStatistic: payload };
    default:
      return state;
  }
};

export default reducer;
