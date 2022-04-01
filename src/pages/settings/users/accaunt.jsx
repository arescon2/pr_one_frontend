import { Col, Row, Form, Button, Input, Divider, Tag, Skeleton, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Get, Post, Put } from '../../../features/api';
import RolesAccaunt from './roles';

const AccPerson = () => {
  const [ form ] = Form.useForm();

  const [accaunt, setAccaunt] = useState({});
  const [loading, setLoading] = useState(true);

  const [sended, setSended] = useState(false)

  const { id } = useParams();

  const handleSaveAcc = async (values) => {

    let data = {
      login: values.login,
      email: values.email,
      organization: values.organization,
    };

    setSended(true);

    if (accaunt.id)
      await Put('/accaunt?id='+accaunt.id, data).then((res) => message.success('Изменения сохранены') );
    else {
      data.person = parseInt(id);
      data.password = values.password;

      await Post('/accaunt', data).then((res) => {
        res.data.roles = [];
        setAccaunt(res.data);
        message.success('Аккаунт создан');
      }).catch(error => message.error('Ошибка: ' + JSON.stringify(error.message)) );
    }
    form.resetFields();
    setSended(false);
  }

  const onChangeActive = async () => {
    await Put('/accaunt?id=' + accaunt.id, {
      isActive: !accaunt.isActive
    }).then((res) => {
      setAccaunt({...accaunt, isActive: !accaunt.isActive})
      form.resetFields();
      message.success('Изменения сохранены');
    });
  }

  useEffect(() => {
    if (id !== 'new') {
      Get('/accaunt?filters=' + JSON.stringify({ person: id })).then((res) => {
        let data = res.data.data[0];
        setAccaunt(data || {});
        setLoading(false);
      });
    }
  }, [id]);

  return loading ? <Col md={24}>
      <Skeleton active />
    </Col> : <Row gutter={8}>
              <Col md={18} sm={24} xs={24}>
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
                  <Col md={24}>
                    <Form.Item
                      name='id'
                      label='ID'
                      hidden
                    >
                      <Input hidden />
                    </Form.Item>
                    <Form.Item
                      name='uid'
                      label='Идентификатор'
                    >
                      { accaunt.uid ? <Tag color='green'>{accaunt.uid}</Tag> : <Tag color='blue'>Не установлен</Tag>}
                    </Form.Item>
                    <Form.Item
                      name='email'
                      label='Электронная почта'
                    >
                      <Input type='email' autoComplete='new-email' />
                    </Form.Item>
                    <Form.Item
                      name='login'
                      label='Логин'
                    >
                      <Input autoComplete='new-login' />
                    </Form.Item>
                    <Form.Item
                      hidden={accaunt.uid ? true : false}
                      name='password'
                      label='Пароль'
                    >
                      <Input hidden={accaunt.uid ? true : false} autoComplete='new-password' type='password' />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={sended}>
                      { accaunt.uid ? 'Сохранить' : 'Создать аккаунт' }
                    </Button>
                    {
                      accaunt.uid ? <>
                        <Button type="primary" danger={accaunt.isActive} onClick={onChangeActive}>
                          {
                            accaunt.isActive ? 'Заблокировать' : 'Активировать'
                          }
                        </Button>
                      </> : null
                    }
                  </Col>
                </Form>
              </Col>
          <Col md={24} sm={24} xs={24}>
          <Col span={24}>
            <Divider />
            <Typography.Title level={4}>Роли</Typography.Title>
          </Col>
          {accaunt.roles ? <RolesAccaunt accaunt={accaunt} /> : null}
        </Col>
      </Row>
};

export default AccPerson;