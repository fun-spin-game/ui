import _ from 'lodash';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case 'SET_SPINNER_STATUS': {
      const obj = JSON.parse(JSON.stringify(state));
      return _.update(obj, payload.key, () => payload.active);
    }
    default:
      return state;
  }
};

export default reducer;
