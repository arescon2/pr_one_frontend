import { Col, Row } from "react-grid-system";

import { Card, Elevation, H4 } from '@blueprintjs/core';

const SMain = () => {
  return <Row>
    <Col md={12}>
      <H4>Настройки</H4>
    </Col>
    <Col md={6}>
      <Card elevation={Elevation.TWO}>
        this is card
      </Card>
    </Col>
  </Row>
}

export default SMain;