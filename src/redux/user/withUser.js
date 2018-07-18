import { connect } from 'react-redux';
import { getUserInfo, logout } from './apiActions';

export default () => connect(
  ({ user: { userInfo, userInfoRequestDone } }) => ({
    userInfo,
    userInfoRequestDone,
  }),
  (dispatch) => {
    return {
      getUserInfo() {
        return dispatch(getUserInfo());
      },
      logout() {
        return dispatch(logout());
      }
    };
  }
);
