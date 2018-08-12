import { setSpinnerStatus } from '../spinners/actions';

export default (store) => (next) => (action) => {
  const { type, meta } = action;

  if (type.indexOf('REQUEST') !== -1) {
    store.dispatch(setSpinnerStatus({ key: `REST_API.${type}`, active: true }));
  }
  if (type.indexOf('SUCCESS') !== -1 || type.indexOf('FAILURE') !== -1) {
    const toReplace = type.indexOf('SUCCESS') !== -1 ? 'SUCCESS' : 'FAILURE';
    store.dispatch(setSpinnerStatus({
      key: `REST_API.${type.replace(new RegExp(toReplace, 'gi'), 'REQUEST')}`,
      active: false
    }));
  }

  if (!meta || !meta.spinnerKeys) return next(action);

  const spinnerKeys = meta.spinnerKeys;
  Object.keys(spinnerKeys).map((key) => {
    store.dispatch(setSpinnerStatus({ key, active: spinnerKeys[key] }))
  });


  return next(action);
}
