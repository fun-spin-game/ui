import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory';
import configureStore from '../configureStore';

const history = createHistory();

export default function Provider({ story }) {
  return (
    <ReduxProvider store={configureStore({ history })}>
      <ConnectedRouter history={history}>
        {story}
      </ConnectedRouter>
    </ReduxProvider>
  );
}

Provider.propTypes = {
  story: PropTypes.object.isRequired,
}
