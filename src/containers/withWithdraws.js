import { connect } from 'react-redux';
import { getWithdraws, createWithdraw } from '../redux/withdraws/actions';

export default () => connect(
  ({
    withdraws: {
      history,
    }
  }) => ({
    withdraws: history,
  }),
  (dispatch) => {
    return {
      getWithdraws({ filter } = {}) {
        return dispatch(getWithdraws({ filter }));
      },
      createWithdraw({ amount, method, requisite }) {
        return dispatch(createWithdraw({ amount, method, requisite }))
      }
    };
  }
);
