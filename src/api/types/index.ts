export interface IUserLoginInput {
  username: string;
  password: string;
}

export interface ILoginResponse {
  username: string;
  token: string;
}

export type TOrder = 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';

export interface ISearchVideoInput {
  q: string;
  order?: TOrder;
  resultsPerPage?: number;
}

export interface ISearchVideoResponseItem {
  id: {
    videoId: string;
  }
  snippet: {
    channelTitle: string;
    description: string;
    thumbnails: {
      medium: {
        height: number;
        width: number;
        url: string;
      }
    }
  }
}

export interface ISearchVideoResponse {
  etag: string;
  pageInfo: {
    totalResults: number;
  }
  items: ISearchVideoResponseItem[]
}

export interface IFavoritesInput {
  id: string;
  query: string;
  title: string;
  order: TOrder | null;
  resultsPerPage: number;
}
