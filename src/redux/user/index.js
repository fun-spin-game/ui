// import WS from '../../helpers/ws';

// const socketConnect = (token) => {
//   WS.instance.setToken(token);
//   WS.instance.connect();
//
//   return new Promise((resolve) => {
//     WS.instance.on('SUBSCRIBED', (userData) => {
//       resolve(userData);
//     });
//   });
// };

const initialState = {
  userInfo: null,
  userInfoRequestDone: false,
};

const userReducer = (
  state = initialState,
  { type, payload },
) => {
  switch (type) {
    case 'GET_USER_INFO_REQUEST':
      return { ...initialState };
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
