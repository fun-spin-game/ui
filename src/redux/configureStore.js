import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import { rootReducer, rootEpic } from './index';
import restApiInjector from './middlewares/restApiInjector';
import spinnerMiddleware from './middlewares/spinnerMiddleware';

export default ({ history }) => {
  const epicMiddleware = createEpicMiddleware();

  const middlewares = [
    restApiInjector,
    apiMiddleware,
    epicMiddleware,
    routerMiddleware(history),
    spinnerMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') middlewares.push(logger);

  const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(...middlewares),
  );

  epicMiddleware.run(rootEpic);

  return store
}
