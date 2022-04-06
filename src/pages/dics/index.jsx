import { Button, Col, Layout, PageHeader, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Delete, Get } from '../../features/api';
import ListOrgsForDicApp from "./listOrgs";

const DicsApp = () => {
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (refresh) {
      Get('/dicapp').then((result) => {
        setList(result.data.data[0])
        setCount(result.data.data[1])
      }).finally(() => setRefresh(false))
    }
  }, [refresh]);

  return <Layout className='wrapper'>
    <Typography.Title level={4}></Typography.Title>
    <PageHeader
      ghost={false}
      style={{ padding: 0 }}
      title="Справочник контактов"
    ></PageHeader>
    <Row>
      <Col span={24}>
        <ListOrgsForDicApp list={list} setRefresh={setRefresh} />
      </Col>
    </Row>
  </Layout>
};

export default DicsApp;