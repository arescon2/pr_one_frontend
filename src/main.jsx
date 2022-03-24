import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from './pages/App';

import { store } from './stores';
import { Provider } from 'react-redux';

import 'antd/dist/antd.css';
import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru')

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer theme='dark' />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
