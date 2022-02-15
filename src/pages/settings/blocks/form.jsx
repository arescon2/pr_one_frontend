import { Col, Row, Button, Popover, PageHeader } from 'antd';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Creator from '../../../features/generator/creator';

const BlocksOne = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  let BlockOne = {
    id: 2,
    name: 'asdasd',
    created: '08.02.2022',
    config: []
  };

  const handleBack = () => {
    navigate('/settings/blocks');
  };

  useEffect(() => {
    
  });

  const handleUpdate = (config) => {
    console.log(config)
  }

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
      <Creator config={BlockOne.config} onUpdate={handleUpdate} />
    </Col>
  </Row>
};

export default BlocksOne;