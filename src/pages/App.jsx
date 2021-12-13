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
import UserPage from './user';
import UserMain from './user/main';
import UserSettings from './user/settings';
import Registration from './login/signup';


// settings
import SettingsPage from './settings';

const App = (props) => {
  const navigate = useNavigate();
  const { logined, loadingGlobal } = useSelector((state) => state.main);
  const dispatch = useDispatch();

  const tokens = getTokens();
  const location = useLocation();

  const checkAuth = () => {
    dispatch(setLoading(false));

    // logined
    dispatch(setLogined(true));
    if(['/login', '/registration'].findIndex(el => el === location.pathname) > -1) navigate('/');
    
    // not logined
    // dispatch(setLogined(false));
    // navigate('/login');
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
            <Route path="/user-cabinet" element={<UserPage /> }>
              <Route path="settings" element={<UserSettings /> } />
            </Route>
            <Route path="/settings" element={<SettingsPage/>}>
              <Route path="views" />
            </Route>
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
