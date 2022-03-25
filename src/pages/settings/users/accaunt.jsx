import { Col, Row, Form, Button, Input, Divider, Tag, Skeleton, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Get, Post, Put } from '../../../features/api';
import SelectApi from '../../../features/comps/selectApi';

const AccPerson = () => {
  const [ form ] = Form.useForm();

  const [accaunt, setAccaunt] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const handleSaveAcc = async (values) => {

    let data = {
      login: values.login,
      organization: values.organization,
    }

    if (accaunt.id) {
      await Put('/accaunt?id='+accaunt.id, data).then((res) => {
        message.success('Изменения сохранены');
      });
    } else {
      data.userid = id;
      await Post('/accaunt', data).then((res) => {
        message.success('Аккаунт создан');
        handleBack();
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    }
  }

  useEffect(() => {
    Get('/accaunt?filters=' + JSON.stringify({ id: id })).then((res) => {
      let data = res.data.data[0];
      setAccaunt(data);
      setLoading(false);
    });
  }, [id, setAccaunt]);

  return loading ? <Col md={24}>
    <Skeleton active />
  </Col> : 
    <Col md={24}>
      <Col span={24}>
        <Divider />
        <Typography.Title level={4}>Аккаунт</Typography.Title>
      </Col>
      <Form
        size='small'
        form={form}
        initialValues={accaunt}
        onFinish={handleSaveAcc}
        name='acc_form_person'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Row>
          <Col>
            <Form.Item
              name='id'
              label='ID'
              hidden
            >
              <Input hidden />
            </Form.Item>
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
              <Input readOnly={accaunt.login ? true : false} autoComplete='new-login' />
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
              { accaunt.uid ? 'Сохранить' : 'Создать аккаунт' }
            </Button>
          </Col>
        </Row>
      </Form>
    </Col>
};

export default AccPerson;