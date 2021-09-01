import { FC } from 'react';
import { List, Card } from 'antd';
import { IVideoItem } from '../../store/youtubeSearchSlice';
import VideoCard from '../VideoCard/VideoCard';

export interface VideoListProps {
  videos: IVideoItem[];
  resultsPerPage: number;
}

const VideoListTable: FC<VideoListProps> = ({
  videos,
  resultsPerPage,
}) => {
  const { Meta } = Card;
  return (
    <div>
      <p>tableList</p>
      <List
        itemLayout='vertical'
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 3,
        }}
        dataSource={videos}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 300 }}
              cover={<iframe
                title={item.videoId}
                src={`https://www.youtube.com/embed/${item.videoId}`}></iframe>}
            >
              <Meta
                title={item.title}
                description={item.description} />
            </Card>,
          </List.Item>
        )}
      />
    </div >
  );
};

export default VideoListTable;
