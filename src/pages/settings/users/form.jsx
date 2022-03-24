import { Col, Row, PageHeader, Form, Button, Input, Typography, Skeleton, Divider, InputNumber, message, DatePicker, Select } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import _ from 'lodash';
import moment from 'moment';

import { Get, Post, Put } from '../../../features/api';
import { setSettingForm } from '../../../features/stores/settingsSlice';
import { DicSex } from '../../../libs';


const UserOne = () => {
  const navigate = useNavigate();
  const { pagename, id } = useParams();

  const updMode = (id !== 'new') ? true : false;

  const [ form ] = Form.useForm();

  const { settingFormOne } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const [ localLoading, setLocalLoading ] = useState(true);

  const handleBack = () => navigate(`/settings/${pagename}`);

  const onSaveOne = async (data) => {
    console.log(data);
    data.sex ? data.sexText = (_.find(DicSex, (el) => el.id === data.sex )).short : null;
    data.dateBirth ? data.dateBirth = moment(data.dateBirth).toISOString() : null;

    if (updMode) {
      await Put('/person', data).then((res) => {
        message.success('Изменения сохранены');
      });
    } else {
      await Post('/person', data).then((res) => {
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
    await Get('/person?filters=' + JSON.stringify({ id: id })).then((res) => {
      let data = res.data.data[0];
      data.dateBirth = moment(data.dateBirth);
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
          title='Пользователь'
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
                        name='fam'
                        label='Фамилия'
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='im'
                        label='Имя'
                        rules={[{ required: true }]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='otch'
                        label='Отчество'
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col md={12}>
                  <Row gutter={12}>
                    <Col span={24}>
                      <Form.Item
                        name='dateBirth'
                        label='Дата рождения'
                      >
                        <DatePicker format='DD-MM-YYYY'/>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name='sex'
                        label='Пол'
                      >
                        <Select >
                          {
                            DicSex.map(el => {
                              return <Select.Option value={el.id}>{el.name}</Select.Option>
                            })
                          }
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
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

export default UserOne;