import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { v4 as uuidV4 } from 'uuid';

import { searchVideos, setSearchQuery } from '../../store/youtubeSearchSlice';
import { setFavorites } from '../../store/favoritesSlice';
import { RootState } from '../../store';
import VideoListTitle from '../../components/VideoListTitle/VideoListTitle';
import VideoList from '../../components/VideoList/VideoList';
import VideoListTable from '../../components/VideoList/VideoListTable';
import FavoriteForm from '../../components/FavoritesForm/FavoritesForm';
import { IFavoritesInput } from '../../api/types';
const { Search } = Input;

interface SearchScreenProps { }

const SearchScreen: FC<SearchScreenProps> = () => {
  const reduxDispatch = useDispatch();
  const search = useSelector((state: RootState) => state.youtubeSeach);
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { username } = useSelector((state: RootState) => state.user);
  const status = search.status;

  const makeSearch = (q: string) => {
    if (!q) {
      return;
    }

    reduxDispatch(setSearchQuery({ query: q }));
    reduxDispatch(searchVideos({ q }));
  };

  const suffix = (
    <HeartOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
        cursor: 'pointer',
      }}
      onClick={() => setModalOpen(true)}
    />
  );

  const saveToFavorites = (values: IFavoritesInput) => {
    reduxDispatch(setFavorites({ ...values, username, id: uuidV4() }));
    setModalOpen(false);
  };

  return (
    <div>
      <Search
        placeholder="Что хотите посмотреть?"
        enterButton="Найти"
        size="large"
        loading={search.isLoading}
        onSearch={makeSearch}
        suffix={suffix}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {(status === 'fulfilled' && search.isGrid) ? (
        <div>
          <VideoListTitle />
          <VideoList
            videos={search.videos}
            resultsPerPage={12}
          />
        </div>) : (
        (status === 'fulfilled' && !search.isGrid) ? (
          <div>
            <VideoListTitle />
            <VideoListTable
              videos={search.videos}
              resultsPerPage={12}
            />
          </div>) : null
      )}

      <Modal
        title="Сохранить запрос"
        visible={isModalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <FavoriteForm
          initialValues={{
            id: '',
            title: '',
            query,
            order: null,
            resultsPerPage: 12,
          }}
          onCancel={() => setModalOpen(false)}
          onSubmit={(values) => saveToFavorites(values)}
        />
      </Modal>

    </div>
  );
};

export default SearchScreen;
