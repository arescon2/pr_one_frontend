import { Col, Row, Table } from "antd";

const ListFieldsForDicApp = ({ list = [{}] }) => {
  const columns = [
    {
      title: '#',
      dataIndex: 'id',
      render: (text, record, index) => index + 1
    },
    {
      title: 'ФИО',
      dataIndex: 'fio',
      width: '300px',
      render: (text, record) => `${record.fam} ${record.im} ${record.otch || ''}`
    },
    {
      title: 'Должность',
      dataIndex: 'position',
      render: (position) => position.name
    },
    {
      title: 'Мобильный телефон',
      dataIndex: 'mobile'
    },
    {
      title: 'Рабочий телефон',
      dataIndex: 'worktel'
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