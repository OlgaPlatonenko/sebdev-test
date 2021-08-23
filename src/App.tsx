import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col } from 'antd';

import { RouterView } from './router';
import { Header } from './components';
import { RootState } from './store';

interface AppProps {}

const App: FC<AppProps> = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <Layout style={{ height: '100vh' }}>
      {isLoggedIn && (
        <Layout.Header style={{ background: '#FFF' }}>
          <Header />
        </Layout.Header>
      )}

      <Layout.Content>
        <Row justify="center">
          <Col span={23}>
            <RouterView />
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
};

export default App;
