import React from 'react';
import { Provider } from 'react-redux';
import Game from './components/GameBoard';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
}

export default App;
