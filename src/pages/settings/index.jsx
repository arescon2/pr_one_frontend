import { useDispatch } from 'react-redux';
import { useOutlet, Outlet } from 'react-router-dom';
import SMain from './main';

import { setPageTitle } from '../../features/stores/mainSlice';

import { useLoading } from '../../hooks';
import { useEffect } from 'react';

const SettingsPage = () => {
  const _outlet = useOutlet();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useLoading(false);

  useEffect(() => {
    dispatch(setPageTitle('Настройки'));
  }, [])

  if(_outlet) return <Outlet />;
    else return <SMain />;
};

export default SettingsPage;