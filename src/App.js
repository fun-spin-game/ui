import React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';

import Routes from './Routes';
import configureStore from './configureStore';

const history = createHistory();

const App = () => {
  return (
    <Provider store={configureStore({ history })}>
      <Routes history={history} />
    </Provider>
  );
}

export default App;
