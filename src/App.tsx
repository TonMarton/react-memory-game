import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import Game from './components/Game';
import GlobalStyle from './globalStyle';
import { AppState } from './store';

function App() {
  const theme = useSelector((state: AppState) => state.metaReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Game />
    </ThemeProvider>
  );
}

export default App;
