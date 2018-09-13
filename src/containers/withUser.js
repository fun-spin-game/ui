import { connect } from 'react-redux';
import {
  getUserInfo,
  logout,
  signIn,
  signUp,
  confirmDemoModeFinished,
  confirmDemoModeActivated,
} from '../redux/user/actions';

export default () => connect(
  ({
    user: {
      userInfo,
      userInfoRequestDone,
    }
  }) => ({
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
      },
      signIn(values) {
        return dispatch(signIn(values));
      },
      signUp(values) {
        return dispatch(signUp(values));
      },
      confirmDemoModeFinished() {
        return dispatch(confirmDemoModeFinished());
      },
      confirmDemoModeActivated() {
        return dispatch(confirmDemoModeActivated());
      }
    };
  }
);
