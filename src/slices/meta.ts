import { createSlice } from '@reduxjs/toolkit';
import { DefaultTheme } from 'styled-components';
import lightTheme from '../themes/light';
import darkTheme from '../themes/dark';

interface MetaState {
  isInGame: boolean;
  theme: DefaultTheme;
}

const initialState = <MetaState>{
  isInGame: false,
  theme: lightTheme,
};

const metaSlice = createSlice({
  name: 'meta',
  initialState,
  reducers: {
    startGame(state) {
      state.isInGame = true;
    },
    stopGame(state) {
      state.isInGame = false;
    },
    toggleTheme(state) {
      if (state.theme.name === lightTheme.name) {
        state.theme = darkTheme;
      } else {
        state.theme = lightTheme;
      }
    },
  },
});

export const { startGame, stopGame, toggleTheme } = metaSlice.actions;
export default metaSlice.reducer;
