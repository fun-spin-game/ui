import { connect } from 'react-redux';
import {
  setSpinnerStatus,
} from '../redux/spinners/actions';

export default () => connect(null, (dispatch) => ({
    setSpinnerStatus({ key, active }) {
      return dispatch(setSpinnerStatus({ key, active }));
    }
  }),
);
