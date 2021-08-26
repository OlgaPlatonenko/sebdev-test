import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { Modal } from 'antd';
import { Form, Input, Select, Slider } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import { searchVideos, setQuery, saveQuery, addQueriesReload } from '../../store/youtubeSearchSlice';
import { RootState } from '../../store';
import VideoListTitle from '../../components/VideoListTitle/VideoListTitle';
const { Search } = Input;

interface SearchScreenProps { }

const SearchScreen: FC<SearchScreenProps> = () => {
  const reduxDispatch = useDispatch();
  const search = useSelector((state: RootState) => state.youtubeSeach);

  const makeSearch = (q: string) => {
    if (!q) {
      return;
    }

    reduxDispatch(setQuery({ query: q }));
    reduxDispatch(searchVideos({ q }));
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const suffix = (
    <HeartOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
        cursor: 'pointer',
      }}
      onClick={openModal}
    />
  );

  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 20 },
  };

  const { Option } = Select;

  const onFinish = (values: any) => {
    values.userId = localStorage.getItem('authToken');
    values.queryText = search.query;
    reduxDispatch(saveQuery(values));
  };
  //Т.о. обошла момент, когла localStorage пустой и будет ошибка push
  //т.е. просто подставляю пусто массив
  //код из моего проекта не работает
  //СПРОСИТЬ
  /**
   //чтобы после обновления страницы и обновления state не перезаписывался localstorage
    //делаем проверку. если было обновление и state пустой читаем его из localstorage,
    //и обновляем не пустым значением из slice а считанным из localstorage значением
    //то есть сохраняем предыдущие сохраненные запросы
    //иначе просто пишем в localstorage массив запросов

    if (localStorage.getItem('savedquery') === null) {
        reduxDispatch(addQueriesReload([].concat({
            nameOfQuery: '',
            textOfQuery: '',
            sortByOfQuery: null,
        })));
    }
    let allQueries = useSelector((state) => state.videostore.allQueries);
    if (allQueries.length === 0) {
        reduxDispatch(addQueriesReload(JSON.parse(localStorage.getItem('savedquery'))));
    } else {
        localStorage.setItem('savedquery', JSON.stringify(allQueries))
    };
   **/
  let emptyArr: any = [{
    queryText: '',
    queryName: '',
    sortBy: '',
    slider: 12,
  }];
  if (localStorage.getItem('favquery') === null) {
    localStorage.setItem('favquery', JSON.stringify(emptyArr));
  }
  if (search.allQueries.length === 0) {
    reduxDispatch(addQueriesReload(JSON.parse(localStorage.getItem('favquery') || '{}')));
  } else {
    localStorage.setItem('favquery', JSON.stringify(search.allQueries));
  }

  return (
    <div>
      <Search
        placeholder="Что хотите посмотреть?"
        enterButton="Найти"
        size="large"
        loading={search.isLoading}
        onSearch={makeSearch}
        suffix={suffix}
      />
      <VideoListTitle/>
      <Modal
        title="Сохранить запрос"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ form: 'saveForm', htmlType: 'submit' }}
      >
        <Form
          name="saveForm"
          id="saveForm"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Form.Item
            name="queryText"
            label="Запрос"
          >
            <Input
              defaultValue={search.query}
              form='saveForm' />
          </Form.Item>
          <Form.Item
            name="queryName"
            label="Название">
            <Input placeholder="Укажите название" />
          </Form.Item>
          <Form.Item
            name="sortBy"
            label="Select"
            hasFeedback
            rules={[{ required: true, message: 'Сортировать по...' }]}
          >
            <Select placeholder="Без сортировки">
              <Option value="date">date</Option>
              <Option value="rating">rating</Option>
              <Option value="relevance">relevance</Option>
              <Option value="title">title</Option>
              <Option value="videoCount">videoCount</Option>
              <Option value="viewCount">viewCount</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Максимальное количество:">
            <span className="ant-form-text" ></span>
          </Form.Item>
          <Form.Item name="slider" >
            <Slider
              max={50}
            />
          </Form.Item>
        </Form>
      </Modal>

    </div>
  );
};

export default SearchScreen;
