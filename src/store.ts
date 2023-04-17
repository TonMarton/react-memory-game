import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { catsApi } from './cats';
import gameReducer from './slices/game';
import metaReducer from './slices/meta';

export const store = configureStore({
  reducer: {
    gameReducer,
    metaReducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
