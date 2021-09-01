import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Card } from 'antd';
import ReactPlayer from 'react-player';

import styles from './VideoCard.module.css';

export interface VideoCardProps {
  videoId: string;
  title: string;
  description: string;
}

const VideoCard: FC<VideoCardProps> = ({
  videoId,
  title,
  description,
}) => {

  const search = useSelector((state: RootState) => state.youtubeSeach);

  return (
    <div>
      <div className={styles.videocontainer}>
        <iframe
          title={videoId}
          src={`https://www.youtube.com/embed/${videoId}`}></iframe>
        <div className={styles.aboutvideo}>
          <div className={styles.videotitle}>{title}</div>
          <div className={styles.videodescripton}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
