import * as React from 'react';
import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { List, Button, Modal, Popconfirm, Row, Col } from 'antd';
import { IFavoritesInput } from '../../api/types';
import FavoriteForm from '../../components/FavoritesForm/FavoritesForm';

import {
  setEditFavorites,
  addEditFavoriteTitle,
  addEditFavoriteQuery,
  addEditFavoriteOrder,
  addEditFavoriteResultsPerPage,
  editQuery,
  addEditFavoriteId,
  saveFavoriteList,
  setSavedFavorites,
  addFavoriteTitle,
  addFavoriteResultsPerPage,
  deleteQuery,
} from '../../store/favoritesSlice';

import { setSearchQuery, searchVideos } from '../../store/youtubeSearchSlice';
import { v4 as uuidV4 } from 'uuid';
interface FavoritesScreenProps {
  favorites: IFavoritesInput[];
}

const FavoritesScreen: FC<FavoritesScreenProps> = () => {

  const favoritesArr = JSON.parse(localStorage.getItem('user1') || '{}');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const favoritesState = useSelector((state: RootState) => state.favorites);
  const reduxDispatch = useDispatch();
  const routeHistory = useHistory();

  const setEditValue = (id: any) => {
    reduxDispatch(setEditFavorites(id));
    favoritesArr.forEach((item: IFavoritesInput) => {
      if (item.id !== id) {
        return;
      }
      reduxDispatch(addEditFavoriteTitle(item.title));
      reduxDispatch(addEditFavoriteQuery(item.query));
      reduxDispatch(addEditFavoriteId(item.id));
      reduxDispatch(addEditFavoriteOrder(item.order));
      reduxDispatch(addEditFavoriteResultsPerPage(item.resultsPerPage));
    });
    setModalOpen(true);
  };
  const acceptChanges = (values: IFavoritesInput) => {
    reduxDispatch(editQuery());
    const arrSavedQueries = JSON.parse(localStorage.getItem('user1') || '');
    reduxDispatch(setSavedFavorites(arrSavedQueries));
    reduxDispatch(saveFavoriteList());
    setModalOpen(false);
  };
  const setDeleteValue = (id: any) => {
    reduxDispatch(setEditFavorites(id));
    setConfirmOpen(true);
  };
  const delFavoriteQuery = () => {
    reduxDispatch(deleteQuery());
    setConfirmOpen(false);
  };
  const search = (id: string) => {
    console.log('search');
    const searchInput = favoritesState.favoriteList.filter(el => el.id === id)[0];
    reduxDispatch(setSearchQuery({ query: searchInput.query }));
    reduxDispatch(searchVideos({
      q: searchInput.query,
      order: searchInput.order ? searchInput.order : 'relevance',
      resultsPerPage: searchInput.resultsPerPage,
    }));
    routeHistory.push('/');
  };

  return (
    <div>
      Избранные запросы

      <List
        dataSource={favoritesArr}
        renderItem={(item: any, idx) =>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <List.Item>
              <Col className="gutter-row" >
                <div onClick={() => search(item.id)} style={{ cursor: 'pointer' }}>
                  {item.title}
                </div>
              </Col>
              <Col
                className="gutter-row"
                span={4}>
                <Button onClick={() => setEditValue(item.id)}>edit</Button>
              </Col>
              <Col
                className="gutter-row"
                span={4}>
                <Button onClick={() => setDeleteValue(item.id)}>delete</Button>
              </Col>
            </List.Item>
          </Row>
        }
      />

      <Modal
        title="Сохранить запрос"
        visible={isModalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
      >
        <FavoriteForm
          initialValues={{
            id: favoritesState.editFavoriteForm.id,
            title: favoritesState.editFavoriteForm.title,
            query: favoritesState.editFavoriteForm.query,
            order: null,
            resultsPerPage: favoritesState.editFavoriteForm.resultsPerPage,
          }}
          onCancel={() => setModalOpen(false)}
          onSubmit={(values) => acceptChanges(values)}
          changeFavoriteTitle={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            reduxDispatch(addFavoriteTitle(e.target.value));
          }}
          changeFavoriteResultsPerPage={(e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            // reduxDispatch(addFavoriteResultsPerPage(e.target.value));
          }}
        />
      </Modal>

      <Popconfirm
        title="Удалить запрос?"
        onConfirm={() => delFavoriteQuery()}
        onCancel={() => setConfirmOpen(false)}
        okText="Yes"
        cancelText="No"
        visible={isConfirmOpen}
      >
      </Popconfirm>
    </div >
  );
};

export default FavoritesScreen;
