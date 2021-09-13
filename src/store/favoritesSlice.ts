import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFavoritesInput } from '../api/types';

const favoriteList = JSON.parse(localStorage.getItem('user1') || '');

interface IFavoritesSlice {
  favorites: IFavoritesInput[];
  favoriteList: IFavoritesInput[];
  editFavorite: string;
  editFavoriteForm: {
    query: '',
    title: '',
    id: '',
    order: '',
    resultsPerPage: 12,
  },
}

interface IFavoritesPayload extends IFavoritesInput {
  username: string;
}

const initialState = {
  favorites: [],
  favoriteList: favoriteList,
  editFavorite: '',
  editFavoriteForm: {
    query: '',
    title: '',
    id: '',
    order: '',
    resultsPerPage: 12,
  },
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
    setEditFavorites(state, action: PayloadAction<any>) {
      state.editFavorite = action.payload;
    },
    addEditFavoriteTitle(state, action: PayloadAction<any>) {
      state.editFavoriteForm.title = action.payload;
    },
    addEditFavoriteQuery(state, action: PayloadAction<any>) {
      state.editFavoriteForm.query = action.payload;
    },
    addEditFavoriteOrder(state, action: PayloadAction<any>) {
      state.editFavoriteForm.order = action.payload;
    },
    addEditFavoriteResultsPerPage(state, action: PayloadAction<any>) {
      //  state.editFavoriteForm.resultsPerPage = action.payload;
    },
    addFavoriteTitle(state, action: PayloadAction<any>) {
      state.editFavoriteForm.title = action.payload;
    },
    addFavoriteResultsPerPage(state, action: PayloadAction<any>) {
      state.editFavoriteForm.resultsPerPage = action.payload;
    },
    addEditFavoriteId(state, action: PayloadAction<any>) {
      state.editFavoriteForm.id = action.payload;
    },
    editQuery(state) {
      state.favoriteList.map(item => {
        if (item.id === state.editFavorite) {
          item.title = state.editFavoriteForm.title;
          item.query = state.editFavoriteForm.query;
          // item.order = state.editFavoriteForm.order;
          item.resultsPerPage = state.editFavoriteForm.resultsPerPage;
        }
        return item;
      });
    },
    deleteQuery(state) {
      let k = 0;
      state.favoriteList.map((item, idx) => {
        if (item.id === state.editFavorite) {
          k=idx;
          return k;
        }
        return k;
      });
      state.favoriteList.splice(k,1);
      localStorage.user1 = JSON.stringify(state.favoriteList);
    },
    saveFavoriteList(state) {
      localStorage.user1 = JSON.stringify(state.favoriteList);
    },

  },
});

export const { setFavorites,
  setSavedFavorites,
  setEditFavorites,
  addEditFavoriteTitle,
  addEditFavoriteQuery,
  addEditFavoriteOrder,
  addEditFavoriteResultsPerPage,
  editQuery,
  addEditFavoriteId,
  saveFavoriteList,
  addFavoriteTitle,
  addFavoriteResultsPerPage,
  deleteQuery,
} = favoritesSlice.actions;
export default favoritesSlice.reducer;
