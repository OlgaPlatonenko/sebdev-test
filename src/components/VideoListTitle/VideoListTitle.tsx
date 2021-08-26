import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import { RootState } from '../../store';
import { searchVideos } from '../../store/youtubeSearchSlice';

import styles from './VideoListTitle.module.css';

interface IVideoListTitle { }

//const reduxDispatch = useDispatch();

const handleIsShowList = () => {
  //reduxDispatch(isShowListTrue());
  // reduxDispatch(isShowTableFalse());
};
const handleIsShowTable = () => {
  // reduxDispatch(isShowListFalse());
  //reduxDispatch(isShowTableTrue());
};

const VideoListTitle: FC<IVideoListTitle> = () => {

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
            <div onClick={handleIsShowList}> <UnorderedListOutlined /> </div>
            <div onClick={handleIsShowTable}><AppstoreOutlined /></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListTitle;
