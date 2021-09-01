import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { getVideos } from '../api/youtube';
import { ISearchVideoInput, ISearchVideoResponse } from '../api/types';

export const searchVideos = createAsyncThunk(
  'youtubeSearch/searchVideos',
  async (params: ISearchVideoInput) => {
    try {
      const response = await getVideos(params);

      return response;
    } catch(err) {
      return err;
    }
  },
);

export interface IVideoItem {
  videoId: string;
  title: string;
  description: string;
  thumbnail?: {
    width: number;
    height: number;
    url: string;
  } ;
}

interface IYoutubeSearchState {
  videos: IVideoItem[];
  totalCount: number;
  isLoading: boolean;
  query: string;
  status: string;
  isGrid: boolean;
}

const initialState = {
  videos: [],
  totalCount: 0,
  isLoading: false,
  query: '',
  status: '',
  isGrid: true,
} as IYoutubeSearchState;

const youtubeSearchSlice = createSlice({
  name: 'youtubeSearch',
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<{ query: string }>) {
      state.query = action.payload.query;
    },
    setIsGrid(state) {
      state.isGrid = true;
    },
    setIsNotGrid(state) {
      state.isGrid = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchVideos.pending, (state) => {
      state.isLoading = true;
      state.status = 'pending';
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
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(searchVideos.rejected, (state) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});

export const { setSearchQuery, setIsGrid, setIsNotGrid } = youtubeSearchSlice.actions;
export default youtubeSearchSlice.reducer;
