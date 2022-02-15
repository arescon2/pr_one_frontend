import { Col, Row, Button, Popover, PageHeader } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlocksOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBack = () => {
    navigate('/settings/blocks');
  };

  useEffect(() => {
    
  });

  return <Row>
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Блок'
          subTitle={id !== 'new' ? 'Редактирование' : 'Новый'}
          onBack={handleBack}
        />
      </div>
    </Col>
    <Col md={24}>
      Form
    </Col>
  </Row>
};

export default BlocksOne;