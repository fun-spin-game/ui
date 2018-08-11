const reducer = (state = {
  appInFocus: true,
}, { type, payload }) => {
  switch (type) {
    case 'SET_APP_IN_FOCUS':
      return { ...state, appInFocus: payload.value };
    default:
      return state;
  }
}

export default reducer;
