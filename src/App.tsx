import { FC } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Row, Col } from 'antd';

import { RouterView } from './router';
import { Header } from './components';
import { RootState } from './store';

interface AppProps { }

const App: FC<AppProps> = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  return (
    <Layout style={{ height: '100vh' }}>
      {isLoggedIn && (
        <Layout.Header style={{ background: '#FFF' , height: '75px' }}>
          <Header />
        </Layout.Header>
      )}
      <Layout>
        <Layout.Content style={{ minHeight: '100vh', padding: '20px' }}>
          <Row justify="center">
            <Col span={16}>
              <RouterView />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default App;
