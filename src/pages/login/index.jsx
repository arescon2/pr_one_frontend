import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss';

import { Container, Row, Col } from 'react-grid-system';

import {
  InputGroup,
  Button,
  FormGroup,
  Card,
  H3
} from "@blueprintjs/core";

const Login = () => {
  const navigate = useNavigate();
  const { logined, loadingGlobal } = useSelector((state) => state.main);
  
  const { login, setLogin } = useState('');
  const { password, setPassword } = useState('');
  const { errors, setErrors } = useState([]);
  
  const handlerEnter = (ev) => {
    ev.keycode === 13 ? handlerGo() : null;
  };

  const handlerGo = () => {
    alert('go');
    navigate('/');
  };

  useEffect(() => {
    logined ? navigate('/') : null;
  }, [])

  return [
    <div className='bkg-login'></div>,
    <Container>
      <div className='login-form-block'>
        <Row>
          <Col>
            <Card>
              <Row className='row-login-title'>
                <Col md={12}>
                  <H3>Авторизация в системе</H3>
                  <span>или <Link to='/registration'>зарегистрируйтесь </Link></span>
                  
                </Col>
              </Row>
              <Row className='row-login-block'>
                <Col>
                  <FormGroup
                    label="Логин"
                    labelFor="login"
                  >
                    <InputGroup
                      id='login'
                      onChange={(ev) => {
                        console.log(ev)
                        // setLogin
                      }}
                      onKeyPress={handlerEnter}
                      placeholder="Логин"
                      value={login}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className='row-login-block'>
                <Col>
                  <FormGroup
                    label="Пароль"
                    labelFor="password"
                  >
                    <InputGroup
                      id='password'
                      type='password'
                      onChange={(ev) => {
                        console.log(ev)
                        // setLogin
                      }}
                      onKeyPress={handlerEnter}
                      placeholder="Пароль"
                      value={password}
                    />
                  </FormGroup>
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
              <Row className='row-login-forgot'>
                <Col>
                  <a link>Забыли пароль?</a>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  ]
}

export default Login
  