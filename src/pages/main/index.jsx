import { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import Generator from '../../features/generator';

const Page = (props) => {
  const { data, setData } = useState({});

  return (
    <Container fluid>
      Main page
    </Container>
  )
}

export default Page;
