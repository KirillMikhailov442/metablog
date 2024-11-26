import { configureStore } from '@reduxjs/toolkit';
import showComponents from './slices/showComponents';
import theme from './slices/theme';

export const store = configureStore({
  reducer: {
    showComponents,
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
