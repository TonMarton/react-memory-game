import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { findCardPairId } from '../utils';

interface GameState {
  flippedCardId: string | null;
  nomatchCardId: string | null;
  collectedCardIds: string[];
  pairsLeft: number;
}

const initialState = <GameState>{
  flippedCardId: null,
  nomatchCardId: null,
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
        state.collectedCardIds.push(state.flippedCardId, cardId);
        state.flippedCardId = null;
        state.pairsLeft -= 1;
      } else {
        state.nomatchCardId = cardId;
      }
    },
    flipBackAfterIncorrect(state) {
      state.flippedCardId = null;
      state.nomatchCardId = null;
    },
    quitGame() {
      return initialState;
    },
  },
});

export const { selectCard, flipBackAfterIncorrect, quitGame } =
  gameSlice.actions;
export default gameSlice.reducer;
