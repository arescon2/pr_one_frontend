import { Col, Row, PageHeader, Form, Button, Input, Typography, Skeleton, Divider, InputNumber, message } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import _ from 'lodash';

import { Get, Post, Put } from '../../../features/api';
import { setSettingForm } from '../../../features/stores/settingsSlice';


const OrgsOne = () => {
  const navigate = useNavigate();
  const { pagename, id } = useParams();

  const updMode = (id !== 'new') ? true : false;

  const [ form ] = Form.useForm();

  const { settingFormOne } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [ localLoading, setLocalLoading ] = useState(true);

  const handleBack = () => navigate(`/settings/${pagename}`);

  const onSaveOne = async (data) => {
    if (updMode) {
      await Put('/organization', data).then((res) => {
        message.success('Изменения сохранены');
        handleReset();
      });
    } else {
      await Post('/organization', data).then((res) => {
        message.success('Организация добавлена');
        handleReset();
        handleBack();
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    }
  }

  const handleReset = (data) => {
    form.resetFields();
    setLocalLoading(false);
  }

  const getData = async () => {
    await Get('/organization?filters=' + JSON.stringify({ id: id })).then((res) => {
      const data = res.data.data[0];
      handleReset()
      dispatch(setSettingForm(data))
    });
  }

  useEffect(async () => {
    let isMounted = true;

    if (isMounted) {
      if (_.isEmpty(settingFormOne) && updMode) {
        getData()
      } else handleReset();
    };

    return () => isMounted = false;
  }, [])

  return <Row >
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Организация'
          subTitle={id !== 'new' ? 'Редактирование' : 'Новый'}
          onBack={handleBack}
        />
      </div>
    </Col>
      {
        localLoading ? <Col md={24}>
            <Skeleton active />
          </Col> :
          <Col md={24}>
            <Form
              size='small'
              initialValues={settingFormOne}
              form={form}
              name='form_orgs'
              className="ant-advanced-search-form"
              onFinish={onSaveOne}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {
                updMode ? <Form.Item
                  hidden
                  name='id'
                  label='ID'
                >
                  <Input />
                </Form.Item>
                : null
              }
              <Row>
                <Col md={12}>
                  <Row gutter={12}>
                    <Col span={24}>
                      <Form.Item
                        name='name'
                        label='Название'
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='inn'
                        label='ИНН'
                        rules={[{ required: true }]}
                      >
                        <InputNumber style={{ width: '100%' }} disabled={updMode} />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='ogrn'
                        label='ОГРН'
                      >
                        <InputNumber style={{ width: '100%' }} disabled={updMode} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row gutter={12}>
                    <Col span={24}>
                      <Form.Item
                        name='address'
                        label='Адрес'
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='index'
                        label='Индекс'
                      >
                        <InputNumber style={{ width: '100%' }} type='number' />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Divider />
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='tel'
                    label='Телефон'
                  >
                    <InputNumber style={{ width: '100%' }} type='tel' />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name='email'
                    label='Эл.Почта'
                  >
                    <Input type='email' />
                  </Form.Item>
                </Col>
              </Row>
              <Col span={24}>
                <Divider />
              </Col>
              
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit">
                  { !updMode ? 'Добавить' : 'Сохранить' }
                </Button>
                <Button
                  style={{ margin: '0 8px' }}
                  onClick={handleReset}
                >
                  Отменить изменения
                </Button>
              </Col>
            </Form>
          </Col>
      }
  </Row>
};

const generatorField = () => {
  return 
}

export default OrgsOne;