import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { catsApi } from './cats';
import reducer from './reducer';

export const store = configureStore({
  reducer: {
    reducer,
    [catsApi.reducerPath]: catsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(catsApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
