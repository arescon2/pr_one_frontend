import './style.scss';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Position,
  Alignment,
  Navbar
} from "@blueprintjs/core";

import {
  Popover2,
} from "@blueprintjs/popover2";

import { useSelector, useDispatch } from 'react-redux';

import { setLogined, setLoading } from '../stores/mainSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setLogined(false));
    navigate('/login');
  }

  return (
    <Navbar className='header-block'>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <Button minimal icon='plus' />
        </Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Navbar.Divider />
        <Button icon='cog' minimal onClick={()=> navigate('/user-cabinet')}>Arescon</Button>
        <Button icon='notifications' minimal />
        <Navbar.Divider />
        <Button intent='danger' icon="log-out" minimal onClick={handleLogOut} />
      </Navbar.Group>
    </Navbar>
  )
}

export default Header;
