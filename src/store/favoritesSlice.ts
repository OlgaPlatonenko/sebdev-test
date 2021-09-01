import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFavoritesInput } from '../api/types';

interface IFavoritesSlice {
  favorites: IFavoritesInput[];
}

interface IFavoritesPayload extends IFavoritesInput {
  username: string;
}

const initialState = {
  favorites: [],
} as IFavoritesSlice;

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites(state, action: PayloadAction<IFavoritesPayload>) {
      const { query, title, id, order, resultsPerPage } = action.payload;
      const favorite: IFavoritesInput = {
        query,
        title,
        id,
        order,
        resultsPerPage,
      };

      state.favorites.push(favorite);
      localStorage.setItem(action.payload.username, JSON.stringify(state.favorites));
    },
    setSavedFavorites(state, action: PayloadAction<IFavoritesInput[]>) {
      state.favorites = action.payload;
    },
  },
});

export const { setFavorites, setSavedFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
