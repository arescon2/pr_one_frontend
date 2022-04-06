import { Col, Divider, Row, Table, Tooltip, Typography } from "antd";
import { nanoid } from "nanoid";
import DataTable from "react-data-table-component";

const ListFieldsForDicApp = ({ list = [{}] }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
    },
    {
      title: 'ФИО',
      dataIndex: 'fio',
      width: '300px',
    },
    {
      title: 'Должность',
      dataIndex: 'post'
    },
    {
      title: 'Мобильный телефон',
      dataIndex: 'phone'
    },
    {
      title: 'Рабочий телефон',
      dataIndex: 'workphone'
    },
  ];

  return <Row>
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={list}
        size='small'
        bordered
      />
    </Col>
  </Row>
}

export default ListFieldsForDicApp;