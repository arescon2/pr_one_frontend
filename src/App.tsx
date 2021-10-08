import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useStore } from 'nanostores/react';
import _ from 'lodash';
import './styles/App.css';

import { API } from './libs';

import { StoreGlobal } from './stores/global';

// pages
import LoginPage from './routes/auth/logIn';
import LoadingPage from './routes/auth/loading';
import { Footer, Header } from 'antd/lib/layout/layout';
import { Layout } from 'antd';

const App = () => {
  
  const init = () => {
    API.get('/auth/check', {}).then((res) => {
      console.log(res);
    })
  }
  
  let _store = useStore(StoreGlobal);

  // при обновлении страницы или при первом посещении проверяем наличие токенов и валидируем их
  if(!_store.token) {
    if(!_store.token_refresh) {
      // redirect to log in page
    } else {
      // the refresh token exists
      // отправляем запрос валидации
    }
  }

  if(_store.auth_status) document.getElementsByTagName('body')[0].classList.remove('login_bckg'); // remove login background
		else document.getElementsByTagName('body')[0].classList.add("login_bckg");

  return (
    <div className="App">
      <LoadingPage />
      {
        !_store.auth_status ?
          <LoginPage /> :
          <Layout>
            <Helmet>
              <meta charSet='utf-8' />
            </Helmet>
            <Layout>
              <Header style={{ padding: 0 }}>
              
              </Header>
              <Footer>
                
              </Footer>
            </Layout>
          </Layout>
      }
    </div>
  )
}

export default App
