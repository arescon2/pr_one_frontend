import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss';

import { Container, Row, Col } from 'react-grid-system';

import {
  InputGroup,
  Button
} from "@blueprintjs/core";

const Login = () => {
  const navigate = useNavigate();
  const { logined, loadingGlobal } = useSelector((state) => state.main);
  
  const { login, setLogin } = useState('');
  const { password, setPassword } = useState('');
  const { errors, setErrors } = useState(false);
  
  const handlerEnter = (ev) => {
    ev.keycode === 13 ? handlerGo() : null;
  };

  const handlerGo = () => {
    alert('go')
  };

  useEffect(() => {
    logined ? navigate('/') : null;
  }, [])

  return [
    <div className='bkg-login'></div>,
    <Container>
      <div className='login-form-block'>
        <Row className='row-login-block'>
          <h2 className="title bp3-heading">Авторизация в системе</h2>
        </Row>
        <Row className='row-login-block'>
          <Col>
            <InputGroup
              onChange={(ev) => {
                console.log(ev)
                // setLogin
              }}
              onKeyPress={handlerEnter}
              placeholder="Логин"
              value={login}
            />
          </Col>
        </Row>
        <Row className='row-login-block'>
          <Col>
            <InputGroup
              type='password'
              onChange={(ev) => {
                console.log(ev)
                // setLogin
              }}
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
              intent='success'
              fill={true}
            >Авторизоваться</Button>
          </Col>
        </Row>
        <Row className='row-login-block'>
          { errors ?
              <blockquote class="bp3-blockquote error-block">
                ошибки
              </blockquote>
            : null
          }
        </Row>
      </div>
    </Container>
  ]
}

export default Login
  