import { connect } from 'react-redux';
import { getPayments } from '../redux/payments/actions';

export default () => connect(
  ({
    payments: {
      history,
    }
  }) => ({
    payments: history,
  }),
  (dispatch) => {
    return {
      getPayments() {
        return dispatch(getPayments());
      },
    };
  }
);
