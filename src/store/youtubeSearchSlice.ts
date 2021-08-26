import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getVideos } from '../api/youtube';
import { ISearchVideoInput, ISearchVideoResponse } from '../api/types';

export const searchVideos = createAsyncThunk(
  'youtubeSearch/searchVideos',
  async (params: ISearchVideoInput) => {
    try {
      const response = await getVideos(params);
      return response;
    } catch (err) {
      return err;
    }
  },
);

interface IVideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail: {
    width: number;
    height: number;
    url: string;
  }
}

interface IVideoFavouriteItem {
  userId: string,
  favourite: {
    queryText?: string;
    queryName?: string;
    sortBy?: string;
    slider?: number;
  }
}

interface IYoutubeSearchState {
  videos: IVideoItem[];
  totalCount: number;
  isLoading: boolean;
  query: string;
  favourite: IVideoFavouriteItem[];
  allQueries: IVideoFavouriteItem[];
}

const initialState = {
  videos: [],
  totalCount: 0,
  isLoading: false,
  query: '',
  favourite: [],
  allQueries: [],
} as IYoutubeSearchState;

const youtubeSearchSlice = createSlice({
  name: 'youtubeSearch',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<{ query: string }>) {
      state.query = action.payload.query;
    },
    saveQuery(state, action) {
      const payload = action.payload as IVideoFavouriteItem;
      state.favourite.push(payload);
      state.allQueries.push(payload);
    },
    addQueriesReload(state, action) {
      state.allQueries=action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(searchVideos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchVideos.fulfilled, (state, action) => {
      const payload = action.payload as ISearchVideoResponse;

      state.totalCount = payload.pageInfo.totalResults;
      state.videos = payload.items.map((v) => ({
        videoId: v.id.videoId,
        title: v.snippet.channelTitle,
        description: v.snippet.description,
        thumbnail: {
          width: v.snippet.thumbnails.medium.width,
          height: v.snippet.thumbnails.medium.height,
          url: v.snippet.thumbnails.medium.url,
        },
      }));
      state.isLoading = false;
    });
    builder.addCase(searchVideos.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setQuery, saveQuery, addQueriesReload } = youtubeSearchSlice.actions;
export default youtubeSearchSlice.reducer;
