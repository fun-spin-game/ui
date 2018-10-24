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
      getWithdraws({ filter, withFakes } = {}) {
        return dispatch(getWithdraws({ filter, withFakes }));
      },
      createWithdraw({ amount, method, requisite }) {
        return dispatch(createWithdraw({ amount, method, requisite }))
      }
    };
  }
);
