import * as React from 'react';
import { FC, useMemo, useEffect } from 'react';
import { Form, Input, Button, Select, Slider } from 'antd';

import { IFavoritesInput } from '../../api/types';

const { Option } = Select;

interface FavoritesFormProps {
  initialValues: IFavoritesInput,
  onCancel: () => void;
  onSubmit: (values: IFavoritesInput) => void;
  changeFavoriteTitle?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changeFavoriteResultsPerPage?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editMode?: boolean;
}

const FavoritesForm: FC<FavoritesFormProps> = ({
  initialValues,
  onCancel,
  onSubmit,
  changeFavoriteTitle,
  changeFavoriteResultsPerPage,
  editMode = false,
}) => {
  const [form] = Form.useForm();
  const buttonTexts = useMemo(() => {
    return editMode ? { cancelBtn: 'Не изменять', okBtn: 'Изменить' } : { cancelBtn: 'Не сохранять', okBtn: 'Сохранить' };
  }, [editMode]);

  useEffect(() => form.resetFields(), [form, initialValues]);

  return (
    <Form
      form={form}
      name="saveForm"
      id="saveForm"
      onFinish={onSubmit}
      initialValues={initialValues}
      preserve={false}
    >
      <Form.Item
        name="query"
        label="Запрос"
      >
        <Input disabled={!editMode} />
      </Form.Item>

      <Form.Item
        name="title"
        label="Название"
      >
        <Input
          placeholder="Укажите название"
          onChange={changeFavoriteTitle} />
      </Form.Item>

      <Form.Item
        name="order"
        label="Select"
        hasFeedback
        rules={[{ required: true, message: 'Сортировать по...' }]}
      >
        <Select placeholder="Без сортировки">
          <Option value="date">По дате</Option>
          <Option value="rating">По рейтингу</Option>
          <Option value="relevance">По актуальности</Option>
          <Option value="title">По заголовку</Option>
          <Option value="videoCount">По количеству видео</Option>
          <Option value="viewCount">По количеству просмотров</Option>
        </Select>
      </Form.Item>

      <Form.Item name="resultsPerPage" >
        <Slider
          min={12}
          max={50}
        />
      </Form.Item>

      <Button onClick={onCancel}>
        {buttonTexts.cancelBtn}
      </Button>

      <Button
        htmlType="submit"
        type="primary"
      >
        {buttonTexts.okBtn}
      </Button>
    </Form>
  );
};

export default FavoritesForm;
