import { Card, Col, Layout, Popover, Row, Tooltip } from 'antd';
import { EditOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../../features/api';
import { useNavigate } from 'react-router-dom';
import { setLogined } from '../../features/stores/mainSlice';

import './styles.scss';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(state => state.main.user);

  console.log(user)

  const username = `${user.person.fam || ''} ${user.person.im || ''} ${user.person.otch || ''}`
  const orgname = `${user.person.organization.short}`

  const handleLogOut = () => {
    Post('/auth/logout').then( () => {
      navigate('/login');      
      dispatch(setLogined(false));
    });
  }

  return (
    <Layout className='wrapper main-page'>
      <Row gutter={10}>
        <Col span={16}>
        
        </Col>
        <Col span={8}>
          фвы
        </Col>
      </Row>
    </Layout>
  )
}

export default MainPage;
