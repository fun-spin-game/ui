import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import { rootReducer, rootEpic } from './redux';
import restApiInjector from './helpers/restApiInjector';

export default ({ history }) => {

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
      restApiInjector,
      apiMiddleware,
      epicMiddleware,
      logger,
      routerMiddleware(history),
    ),
  );

  epicMiddleware.run(rootEpic);

  return store
}
