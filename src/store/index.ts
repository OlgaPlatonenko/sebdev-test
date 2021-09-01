import { configureStore } from '@reduxjs/toolkit';

import youtubeSeach from './youtubeSearchSlice';
import user from './userSlice';
import favorites from './favoritesSlice';

export const store = configureStore({
  reducer: {
    youtubeSeach,
    user,
    favorites,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
