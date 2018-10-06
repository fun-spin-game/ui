import { connect } from 'react-redux';
import { getTables } from '../redux/tables/actions';

export default () => connect(
  ({ tables: { tablesList } }) => {
    return {
      tablesList,
    };
  },
  (dispatch) => {
    return {
      getTables: () => dispatch(getTables()),
    };
  },
);
