import { connect } from 'react-redux';
import { getPurchases, createPurchase } from '../redux/purchases/actions';

export default () => connect(
  ({
    purchases: {
      history,
    }
  }) => ({
    purchases: history,
  }),
  (dispatch) => {
    return {
      getPurchases({ filter } = {}) {
        return dispatch(getPurchases({ filter }));
      },
      createPurchase({ userId, amount }) {
        return dispatch(createPurchase({ userId, amount }))
      }
    };
  }
);
