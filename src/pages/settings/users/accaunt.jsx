import { Col, Row, Form, Button, Input, Divider, Tag, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Get } from '../../../features/api';
import SelectApi from '../../../features/comps/selectApi';

const AccPerson = () => {
  const [ form ] = Form.useForm();

  const [accaunt, setAccaunt] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    Get('/accaunt?filters=' + JSON.stringify({ id: id })).then((res) => {
      let data = res.data.data[0];
      setAccaunt(data);
      setLoading(false);
    });
  }, [id, setAccaunt]);

  return loading ? <Col md={24}>
    <Skeleton active />
  </Col> : <Form
    size='small'
    form={form}
    initialValues={accaunt}
    name='acc_form_person'
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
  >
    <Row>
      <Col span={24}>
        <Divider />
      </Col>
      <Col md={12} sm={24} xs={24}>
        <Form.Item
          name='uid'
          label='Идентификатор'
        >
          { accaunt.uid ? <Tag color='green'>{accaunt.uid}</Tag> : <Tag color='blue'>Не установлен</Tag>}
        </Form.Item>
        <Form.Item
          name='organization'
          label='Организация'
        >
          <SelectApi type='organization' />
        </Form.Item>
        <Form.Item
          name='login'
          label='Логин'
        >
          <Input autoComplete='new-login' />
        </Form.Item>
        <Form.Item
          name='password'
          label='Пароль'
        >
          <Input autoComplete='new-password' type='password' />
        </Form.Item>
      </Col>
      <Col span={24} style={{ textAlign: 'left' }}>
        <Button type="primary" htmlType="submit">
          Создать аккаунт
        </Button>
      </Col>
    </Row>
  </Form>
};

export default AccPerson;