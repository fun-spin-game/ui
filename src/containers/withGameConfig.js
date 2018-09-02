import { connect } from 'react-redux';
import {
  getGameConfig,
} from '../redux/gameConfig/actions';

export default () => connect(
  ({ gameConfig }) => {
    return {
      gameConfig,
    };
  }, (dispatch) => ({
    getGameConfig() {
      return dispatch(getGameConfig());
    }
  }),
);
