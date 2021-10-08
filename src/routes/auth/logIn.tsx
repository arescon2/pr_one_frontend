import React, { useState } from 'react';
import _ from 'lodash';

import { Form, Input, Button, notification, List } from 'antd';

import { update, createStore } from 'nanostores';
import { useStore } from 'nanostores/react';
import { StoreGlobal } from '../../stores/global';

interface IError {
  field: string;
  message: string;
}
interface ILoginForm {
  error: boolean;
  error_messages: [IError?];
}

const storeLogin = createStore<ILoginForm>(() => {
  storeLogin.set({
    error: false,
    error_messages: []
  })
  // initializer: subscribe to events
  return () => {
    // destructor: unsubscribe from all events
  }
})

const LoginPage = () => {
  const [form] = Form.useForm();
  let store = useStore(storeLogin);

  const onFinish = (values: { login: string, password: string }) => {

    let errors: [IError?] = [];

    if(_.isEmpty(values.login)) errors.push({
      field: 'login',
      message: 'Поле "Логин" пустой.'
    });

    if(_.isEmpty(values.password)) errors.push({
      field: 'password',
      message: 'Поле "Пароль" пустой.'
    });

    if(!_.isEmpty(errors)) {
      update(storeLogin, old_val => {
        old_val.error = true;
        old_val.error_messages = errors;
        return old_val;
      });
    } else {
      // api
      update(StoreGlobal, old_val => {
        old_val.auth_status = true;
        return old_val;
      });
    };
  };
  
  return (
    <div className="login">
      <div className='login_title'>
        <span>Авторизация</span>
      </div>
      <div className='login_fields'>
        <Form
          form={form}
          className='login-form'
          layout='vertical'
          onFinish={onFinish}
          onValuesChange={() => {
            update(storeLogin, old_val => {
              old_val.error = false;
              old_val.error_messages = [];
              return old_val;
            });
          }}
        >
          <Form.Item name='login' >
            <Input placeholder='Логин'/>
          </Form.Item>
          <Form.Item name='password' >
            <Input placeholder='Пароль' type='password' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Авторизация
            </Button>
          </Form.Item>
        </Form>
      </div>

      { store.error ? <div className='notice_login_form'>
        {
          store.error_messages.map(val => {
            return <p>{val?.message}</p>
          })
        }
      </div> : null }
    </div>
  )
}

export default LoginPage;