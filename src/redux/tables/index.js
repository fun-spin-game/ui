const initialState = {
  tablesList: [],
};

const reducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_TABLES_SUCCESS':
      return { ...state, tablesList: payload };
    default:
      return state;
  }
};

export default reducer;
