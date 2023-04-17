import { createSlice } from '@reduxjs/toolkit';

interface MetaState {
  isInGame: boolean;
}

const initialState = <MetaState>{
  isInGame: false,
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
  },
});

export const { startGame, stopGame } = metaSlice.actions;
export default metaSlice.reducer;
