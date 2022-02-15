import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setLogined, setLoading } from '../features/stores/mainSlice';

import AdminLayout from '../features/layouts/admin';
import Login from '../pages/login';

import LoadingPage from '../features/loadingPage';

import Main from './main';
import NotFound from './views/404';

import PageView from './views/page';

import { getTokens } from '../libs';
import Settings from './settings';
import { Get } from '../features/api';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faHome, faClipboardList, faTrash, faEdit, faSync, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faCog, faHome, faClipboardList, faTrash, faEdit, faSync, faPlus);

const App = () => {
  const navigate = useNavigate();
  const { logined, loadingGlobal } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const tokens = getTokens();
  const location = useLocation();

  const checkAuth = async () => {
    await Get('/auth/check').then(() => {
      // logined
      dispatch(setLogined(true));
      if(location.pathname === '/login') navigate('/');
    }).catch( error => {
          // not logined
      dispatch(setLogined(false));
      navigate('/login');
    }).finally(() => dispatch(setLoading(false)))    
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <>
    { loadingGlobal ? <LoadingPage/> : null}
    {
      logined ? <AdminLayout>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/:pagename" element={<Settings />} />
            <Route path="/settings/:pagename/:id" element={<Settings />} />
            <Route path="/page/:pagename" element={<PageView />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
        :
        <Routes>          
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
    }
  </>
}

export default App
