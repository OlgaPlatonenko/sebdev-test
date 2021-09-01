import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { RootState } from '../../store';
import { setIsGrid, setIsNotGrid } from '../../store/youtubeSearchSlice';

import styles from './VideoListTitle.module.css';

interface IVideoListTitle { }

const VideoListTitle: FC<IVideoListTitle> = () => {

  const reduxDispatch = useDispatch();

  const search = useSelector((state: RootState) => state.youtubeSeach);
  let query = search.query;
  let total = search.totalCount;

  return (
    <div>
      <div className={styles.listname}>
        <div className={styles.listnameleft}>
          <div className={styles.listnametext}>Видео по запросу</div>
          <div className={styles.listnamequery}>{query}</div>
          <div className={styles.listnametotalcount}>{total}</div>
        </div>
        <div className={styles.listnameright}>
          <div className={styles.listicons}>
            <div onClick={() => {  reduxDispatch(setIsGrid()); }}> <UnorderedListOutlined /> </div>
            <div onClick={() => {  reduxDispatch(setIsNotGrid()); }}><AppstoreOutlined /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListTitle;
