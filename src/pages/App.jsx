import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setLogined, setLoading } from '../features/stores/mainSlice';

import AdminLayout from '../features/layouts/admin';

import LoadingPage from '../features/loadingPage';

import Login from '../pages/login';

import { getTokens } from '../libs';
import { Get } from '../features/api';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faHome, faClipboardList, faTrash, faEdit, faSync, faPlus } from '@fortawesome/free-solid-svg-icons'
import RoutesBlock from './routes';

library.add(faCog, faHome, faClipboardList, faTrash, faEdit, faSync, faPlus);

const App = () => {
  const navigate = useNavigate();
  const { logined, loadingGlobal } = useSelector((state) => state.main);
  const dispatch = useDispatch();

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
          <RoutesBlock />
        </AdminLayout>
        :
        <Routes>          
          <Route path="login" element={<Login />} />
        </Routes>
    }
  </>
}

export default App
