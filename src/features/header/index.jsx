import './style.scss';

import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import {
  Button,
  ButtonGroup,
  Menu,
  MenuItem,
  Position,
  Alignment,
  Navbar,
  H6
} from "@blueprintjs/core";

import {
  Popover2,
} from "@blueprintjs/popover2";

import { useSelector, useDispatch } from 'react-redux';

import { setLogined, setLoading } from '../stores/mainSlice';

const Header = () => {
  const { pageTitle } = useSelector((state) => state.main);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(setLogined(false));
    navigate('/login');
  }
  
  const handleAdd = () => {
    navigate('/page/new_ticket');
  }

  return (
    <Navbar className='header-block'>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <H6>{pageTitle}</H6>
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
