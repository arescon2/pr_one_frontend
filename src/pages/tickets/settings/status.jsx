import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, PageHeader, Popover, Row, Form, Modal, Input, Tooltip, Badge, Tag, Switch } from "antd";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Delete, Get, Post, Put } from "../../../features/api";
import ColorPicker from "../../../features/comps/colorPicker";

const TicketStatus = () => {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(true);
  const [edit, setEdit] = useState(false);
  const [oneEdit, setOneEdit] = useState({});
  const [list, setList] = useState([]);

  const url = '/dicstickets/status';

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '80px'
    },
    {
      name: 'Начальный',
      selector: row => row.main ? <Tag color='green'>Да</Tag> : '',
      width: '100px'
    },
    {
      name: 'Название',
      selector: row => <Tooltip placement="topLeft" title={row.name}>{row.name}</Tooltip>,
    },
    {
      name: 'Код',
      selector: row => <Tooltip placement="topLeft" title={row.code}>{row.code}</Tooltip>,
    },
    {
      name: 'Цвет',
      selector: row => <Tag color={row.color}>{row.color}</Tag>,
      width: '100px',
    },
    {
      name: 'Действия',
      cell: (item) => {
        return <>
          <Button type='primary' ghost placeholder='Изменить' icon={<FontAwesomeIcon icon='edit' />} onClick={() => handleOpenForm(item)} size='small'></Button>
          <Popover
            placement='leftBottom'
            trigger='click'
            content={<>Подтвердите действие: <Button onClick={() => handleDelete(item)} size='small' type='primary' danger>Удалить</Button></>}
          >
            <Button type='default' placeholder='Удалить' danger icon={<FontAwesomeIcon icon='trash' />} size='small'></Button>
          </Popover>
        </>
      },
      width: '90px',
      ignoreRowClick: true,
      right: true
    }
  ];

  const getData = () => {
    Get(url).then((res) => {
      setList(res.data.data);
    }).finally(() => {
      setRefresh(false);
    });
  }

  const handleOpenForm = (item = {}) => {
    setOneEdit(item);
    setEdit(true);
  }
  
  const handleCloseForm = () => {
    setEdit(false);
  }

  const handleSend = () => {
    let values = form.getFieldsValue();
    if (oneEdit.id) {
      Put(`${url}?id=${oneEdit.id}`, values).then((res) => {
        let _list = list.map((el) => el.id === res.id ? Object.assign(el, values) : el);

        setList(_list);
        handleCloseForm();
      });
    } else {
      Post(url, values).then((res) => {
        let _list = [...list, res];
        setList(_list);
        handleCloseForm();
      });
    }
  }

  const handleDelete = (item) => {
    Delete(url + '?id=' + item.id).then(res => {
      if (res.data.affected > 0) {
        let _list = list.filter((el) => el.id != item.id);
        setList(_list);
      };
    });
  }

  useEffect(() => {
    (refresh) && getData();
  }, [refresh]);

  useEffect(() => {
    form.resetFields();
  }, [oneEdit]);

  return <Row>
    <Col span={24}>
      <PageHeader
        ghost={false}
        style={{ padding: 0 }}
        title="Статусы обращений"
        subTitle="Настройка статусов обращений"
        extra={[
          <Button
            type='primary'
            ghost size='small' onClick={handleOpenForm}
          >Добавить</Button>
        ]}
      />
      <DataTable
        columns={columns}
        data={list}
        dense
      />
    </Col>
    <Modal
      visible={edit}
      onCancel={handleCloseForm}
      footer={false}
      title='Статус'
      ghost
    >
      <Form
        form={form}
        initialValues={oneEdit}
        onFinish={handleSend}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Row>
          <Col span={24}>
            <Form.Item name='name' label='Название'>
              <Input />
            </Form.Item>
            <Form.Item name='code' label='Код'>
              <Input />
            </Form.Item>
            <Form.Item name='color' label='Цвет'>
              <ColorPicker />
            </Form.Item>
            <Form.Item name='main' label='Начальный'>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
        <Row> 
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" size="small">
              Сохранить
            </Button>
            <Button
              style={{ margin: '0 8px' }}
              onClick={handleCloseForm}
              size="small"
            >
              Отмена
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  </Row>
}

export default TicketStatus;