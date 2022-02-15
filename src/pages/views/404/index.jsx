import { Button, Col, Empty, Row } from 'antd';
import { useNavigate } from 'react-router';

import './style.scss';

const NotPage = () => {
  const navigate = useNavigate();
  return (
    <Row>
      <Col md={24}>
        <Empty
          description={'Страница не существует'}
        >
          <Button type='primary' onClick={()=> navigate('/')} >На главную страницу</Button>
        </Empty>
      </Col>
    </Row>
  )
}

export default NotPage;
