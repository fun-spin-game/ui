const initialState = {
  userInfo: null,
  userInfoRequestDone: false,
};

const userReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_USER_INFO_SUCCESS':
      return { ...state, userInfo: payload, userInfoRequestDone: true };
    case 'GET_USER_INFO_FAILURE':
      return { ...state, userInfoRequestDone: true };
    case 'LOGOUT_SUCCESS':
      return { ...state, userInfo: null };
    default:
      return state;
  }
};

export default userReducer;
