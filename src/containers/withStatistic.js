import { connect } from 'react-redux';
import { getStatistic } from '../redux/statistic/actions';

export default () => connect(
  ({
    statistic: {
      top,
    }
  }) => ({
    top,
  }),
  (dispatch) => {
    return {
      getStatistic() {
        return dispatch(getStatistic());
      },
    };
  }
);
