import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { findCardPairId } from '../utils';

interface GameState {
  flippedCardId: string | null;
  nomatchCardId: string | null;
  matchCardIds: string[];
  collectedCardIds: string[];
  pairsLeft: number;
}

const initialState = <GameState>{
  flippedCardId: null,
  nomatchCardId: null,
  matchCardIds: [],
  collectedCardIds: [],
  pairsLeft: 10,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    selectCard(state, action: PayloadAction<string>) {
      const cardId = action.payload;
      if (cardId === state.flippedCardId) {
        return;
      }

      if (!state.flippedCardId) {
        state.flippedCardId = cardId;
        return;
      }

      const pairId = findCardPairId(cardId);
      if (pairId === state.flippedCardId) {
        state.matchCardIds.push(state.flippedCardId, cardId);
        state.flippedCardId = null;
      } else {
        state.nomatchCardId = cardId;
      }
    },
    flipBackAfterIncorrect(state) {
      state.flippedCardId = null;
      state.nomatchCardId = null;
    },
    collectAfterPairFound(state) {
      state.collectedCardIds.push(state.matchCardIds[0], state.matchCardIds[1]);
      state.matchCardIds = [];
      state.pairsLeft -= 1;
    },
    quitGame() {
      return initialState;
    },
  },
});

export const {
  selectCard,
  flipBackAfterIncorrect,
  collectAfterPairFound,
  quitGame,
} = gameSlice.actions;
export default gameSlice.reducer;
