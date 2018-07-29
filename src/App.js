import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router'

import Routes from './Routes';
import configureStore from './configureStore';

const history = createHistory();

const App = () => {
  return (
    <Provider store={configureStore({ history })}>
      <ConnectedRouter history={history}>
        <Routes history={history} />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
