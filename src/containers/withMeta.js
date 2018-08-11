import { connect } from 'react-redux';
import {
  setAppInFocus,
} from '../redux/meta/actions';

export default () => connect(
  ({ meta: { appInFocus } }) => {
    return {
      appInFocus,
    };
  }, (dispatch) => ({
    setAppInFocus(val) {
      return dispatch(setAppInFocus(val));
    }
  }),
);
