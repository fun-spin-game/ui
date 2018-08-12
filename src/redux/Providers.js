import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { compose, pure } from 'recompose';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router'
import { LocalizeProvider } from 'react-localize-redux';

import configureStore from './configureStore';

export const history = createHistory();
export const store = configureStore({ history });

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <LocalizeProvider store={store}>
        <ConnectedRouter history={history}>
          {children}
        </ConnectedRouter>
      </LocalizeProvider>
    </Provider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};

export default compose(pure)(Providers);
