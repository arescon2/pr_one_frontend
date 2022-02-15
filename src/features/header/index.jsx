import './style.scss';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Divider } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faPlus, faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { setLogined, setLoading } from '../stores/mainSlice';
import { Post } from '../api';

const Header = () => {
  const { pageTitle } = useSelector((state) => state.main);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    Post('/auth/logout').then( () => {
      navigate('/login');      
      dispatch(setLogined(false));
    });
  }
  
  const handleAdd = () => {
    navigate('/page/new_ticket');
  }

  const handleGoCabinet = () => navigate('/user-cabinet');

  return (
    <div className='header-block'>
      <Button icon={<FontAwesomeIcon icon={faPlus} />} type='text' ></Button>
      <div className='user-block'>
        <Button icon={<FontAwesomeIcon icon={faUserCog} />} type='text' onClick={handleGoCabinet} ></Button>
        <Button icon={<FontAwesomeIcon icon={faBell} />} type='text' ></Button>
        <Divider type='vertical'/>
        <Button icon={<FontAwesomeIcon icon={faSignOutAlt} />} type='text' danger onClick={handleLogOut}  ></Button>
      </div>
    </div>
  )
}

export default Header;
