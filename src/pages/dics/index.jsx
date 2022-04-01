import { Button, Col, Layout, PageHeader, Row, Typography } from "antd";
import DataTable from "react-data-table-component";


const DicsApp = () => {
  return <Layout className='wrapper'>
    <Typography.Title level={4}></Typography.Title>
    <PageHeader
      ghost={false}
      style={{ padding: 0 }}
      title="Справочник контактов"
      extra={[
        <Button key="3">Operation</Button>,
        <Button key="2">Operation</Button>,
        <Button key="1" type="primary">
          Primary
        </Button>,
      ]}
    ></PageHeader>
    <Row>
      <Col span={24}>
        <DataTable
          columns={[]}
          data={[]}
          dense
        />
      </Col>
    </Row>
  </Layout>
};

export default DicsApp;