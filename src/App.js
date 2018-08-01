import React from 'react';
import Providers, { history } from './Providers';
import Routes from './Routes';

const App = () => {
  return (
    <Providers>
      <Routes history={history} />
    </Providers>
  );
}

export default App;
