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

const Registration = () => {
  const navigate = useNavigate();
  
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

  return [
    <div className='bkg-login'></div>,
    <Container>
      <div className='login-form-block'>
        <Row>
          <Col>
            <Card>
              <Row className='row-login-title'>
                <Col md={12}>
                  <H3>Регистрация в системе</H3>
                  <span>или <Link to='/login'>авторизуйтесь</Link></span>
                  
                </Col>
              </Row>
              <Row className='row-login-block'>
                <Col>
                  <FormGroup
                    label="Email"
                    labelFor="email"
                  >
                    <InputGroup
                      id='email'
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
                    label="Придумайте пароль"
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
                  >Зарегистрироваться</Button>
                </Col>
              </Row>
              <Row className='row-login-forgot'>
                <Col>
                  --
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  ]
}

export default Registration;