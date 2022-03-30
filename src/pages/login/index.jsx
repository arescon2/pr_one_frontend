import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './style.scss';

import { Row, Col, Alert, Button, Input } from 'antd';

import { Post } from '../../features/api';
import { setLoading, setLogined } from '../../features/stores/mainSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logined } = useSelector((state) => state.main);
  
  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([]);
  
  const handlerEnter = (ev) => {
    ev.charCode === 13 ? handlerGo() : null;
  };

  const handlerGo = () => {
    Post('/auth/login', { login, password }).then((res) => {
      navigate('/');
      dispatch(setLogined({
        status: true,
        user: res.data
      }));
      dispatch(setLoading(false));
    }).catch( error => {
      setErrors(error.message || []);
    });
  };

  const handleChangeLogin = (ev) => setLogin(ev.target.value);
  const handleChangePassword = (ev) => setPassword(ev.target.value);

  useEffect(() => {
    logined ? navigate('/') : null;
  }, []);

  const ErrorBlock = () => {
    return errors.map( message => {
      return <Alert message={message} type='error' />
    })
  }

  return [
    <div className='bkg-login'></div>,
    <div className='login-form-block'>
      <Row className='row-login-block'>
        <h2 className="title bp3-heading">Авторизация в системе</h2>
      </Row>
      <Row className='row-login-block'>
        <Col>
          <Input
            onChange={handleChangeLogin}
            onKeyPress={handlerEnter}
            placeholder="Логин"
            value={login}
          />
        </Col>
      </Row>
      <Row className='row-login-block'>
        <Col>
          <Input
            type='password'
            onChange={handleChangePassword}
            onKeyPress={handlerEnter}
            placeholder="Пароль"
            value={password}
          />
        </Col>
      </Row>
      <Row className='row-login-block'>
        <Col>
          <Button
            alignText='center'
            className='success-button'
            type='link'
            onClick={handlerGo}
          >Авторизоваться</Button>
        </Col>
      </Row>
      <Row className='row-login-block'>
        { ErrorBlock()}
      </Row>
    </div>
  ]
}

export default Login
  