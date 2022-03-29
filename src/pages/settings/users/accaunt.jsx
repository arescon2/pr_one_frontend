import { Col, Row, Form, Button, Input, Divider, Tag, Skeleton, Typography, message } from 'antd';
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
      email: values.email,
      organization: values.organization,
    }

    if (accaunt.id) {
      await Put('/accaunt?id='+accaunt.id, data).then((res) => {
        console.log('asdasd');
        message.success('Изменения сохранены');
      });
    } else {
      data.person = parseInt(id);
      data.password = values.password;

      await Post('/accaunt', data).then((res) => {
        message.success('Аккаунт создан');
        handleBack();
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    }
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
    } else setLoading(false);
  }, [id, setAccaunt]);

  return loading ? <Col md={24}>
      <Skeleton active />
    </Col> : <Form
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
            name='organization'
            label='Организация'
          >
            <SelectApi type='organization' />
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

          <Button type="primary" htmlType="submit">
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
};

export default AccPerson;