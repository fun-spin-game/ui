import { connect } from 'react-redux';
import { getAdminStatistic } from '../redux/adminStatistic/actions';

export default () => connect(
  ({
    adminStatistic: { adminStatistic },
  }) => ({
    adminStatistic,
  }),
  (dispatch) => {
    return {
      getAdminStatistic() {
        return dispatch(getAdminStatistic());
      },
    };
  }
);
