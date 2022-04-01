import { Button, Col, Divider, Form, Input, List, message, PageHeader, Row, Skeleton, Space, Switch, Table, Typography } from "antd"
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { Get, Post, Put } from "../../../features/api";

const AccessList = () => {
  const navigate = useNavigate();
  const { pagename, id } = useParams();

  const [form] = Form.useForm();

  const [role, setRole] = useState({});
  const [loading, setLoading] = useState(false);

  const [accesses, setAccesses] = useState([
    {
      id: 1,
      name: 'Название',
      url: '/role/1',
      read: true,
      create: false,
      update: false,
      delete: false,
    }
  ]);

  const onSwitch = (record, type) => {
    let data = accesses.map(el => {
      el.id === record.id ? el[type] = !el[type] : null;
      return el;
    });
    setAccesses(data);
  };

  const columns = [
    {
      name: 'Название',
      selector: row => row.name
    },
    {
      name: 'Путь',
      selector: row => row.url
    },
    {
      name: 'Чтение | запись | изменение | удаление',
      cell: (record) => (
        <>
          <Switch checked={record.read} onChange={() => onSwitch(record, 'read') } title='Чтение' />
          <Switch checked={record.create} onChange={() => onSwitch(record, 'create')} title='Запись' />
          <Switch checked={record.update} onChange={() => onSwitch(record, 'update')} title='Изменение' />
          <Switch checked={record.delete} onChange={() => onSwitch(record, 'delete')} title='Удаление' />
        </>
      ),
      ignoreRowClick: true,
    },
  ];

  const handleBack = () => navigate(`/settings/${pagename}`);

  const onSaveOne = async (data) => {
    // setLoading(true);
    if (id !== 'new') {
      await Put(`/role?id=${id}`, data).then((res) => {
        message.success('Изменения сохранены');
        setLoading(false);
      }).catch(err => {
        message.error('Ошибка: ')
      });
    } else {
      await Post('/role', data).then((res) => {
        message.success('Роль создан');
        setLoading(false);
        navigate(`/settings/${pagename}/${res.id}`)
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    }
  };

  useEffect(() => {
    if (id !== 'new') {
      setLoading(true)
      Get('/role?filters=' + JSON.stringify({ id: id })).then((res) => {
        setRole(res.data.data[0]);
        setLoading(false)
      });
    }
  }, [id]);

  return [
  <Row key='f1' >
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Роль'
          subTitle={id ? 'Настройка' : 'Создание'}
          onBack={handleBack}
        />
      </div>
    </Col>
    <Col md={12} xs={24} sm={24}>
      {
        loading ? <Skeleton active /> : <Form
        size='small'
        initialValues={role}
        form={form}
        name='form_role'
        className="ant-advanced-search-form"
        onFinish={onSaveOne}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name='title'
          label='Название'
          required={id === 'new'}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='name'
          label='Код'
          required={id === 'new'}
        >
          <Input readOnly={id !== 'new'} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Сохранить
        </Button>
      </Form>
      }
      <Divider />
    </Col>
  </Row>,
  // <Row key='f2'>
  //   <Col md={24}>
  //     <Typography.Title level={4}>
  //       Доступы
  //     </Typography.Title>
  //   </Col>
  //   <Col span={24}>
  //     <DataTable
  //       data={accesses}
  //       columns={columns}
  //       dense
  //     />
  //   </Col>
  // </Row>
  ]
};

export default AccessList;