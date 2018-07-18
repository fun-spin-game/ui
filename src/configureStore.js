import { createStore, applyMiddleware } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { createEpicMiddleware } from 'redux-observable';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import { rootReducer, rootEpic } from './redux';

export default ({ history }) => {

  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(
      apiMiddleware,
      logger,
      routerMiddleware(history),
      epicMiddleware,
    ),
  );

  epicMiddleware.run(rootEpic);

  return store
}
