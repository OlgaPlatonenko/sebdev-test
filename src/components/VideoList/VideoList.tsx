import { FC } from 'react';
import { List } from 'antd';
import { IVideoItem } from '../../store/youtubeSearchSlice';
import VideoCard from '../VideoCard/VideoCard';

import styles from './VideoList.module.css';

export interface VideoListProps {
  videos: IVideoItem[];
  resultsPerPage: number;
}

const VideoList: FC<VideoListProps> = ({
  videos,
  resultsPerPage,
}) => {

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={videos}
        renderItem={item => (
          <List.Item>
            <VideoCard
              videoId={item.videoId}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div >
  );
};

export default VideoList;
