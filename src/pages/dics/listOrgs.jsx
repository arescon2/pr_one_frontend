import { Card, Col, Divider, List, PageHeader, Row, Typography } from "antd";
import Title from "antd/lib/typography/Title";
import { nanoid } from "nanoid";
import ListOtdelsForDicApp from "./listOtdels";

const ListOrgsForDicApp = ({ list = [], setRefresh }) => {
  return list.map((org) => {
    const subTitle = `${org.index || ''}, ${org.address || ''}, тел. ${org.tel || ''}, эл.почта: ${org.email || ''}`;
    return <Row key={nanoid()} style={{ border: '1px solid #caccce', marginBottom: '15px' }}>
      <Col span={24} style={{ backgroundColor: '#2537b714' }}>
        <Title level={5} style={{ textAlign: 'center' }}>
          {org.name}
        </Title>
        <p style={{ textAlign: 'center', color: '#979797' }}>{subTitle}</p>
      </Col>
      <Col span={24}>
        <ListOtdelsForDicApp list={org.otdels} setRefresh={setRefresh} organization={org} />
      </Col>
    </Row>
  })
}

export default ListOrgsForDicApp;
