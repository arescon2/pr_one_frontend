import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PageHeader, Col, Row, Button, Pagination, Popover, Modal, Form, Input, Collapse, Divider } from "antd";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Get, Post, Put } from "../../features/api";
import { setTicketList, setTicketPagin } from "../../features/stores/ticketsSlice";
import SelectApi from "/src/features/comps/selectApi";

import moment from 'moment';
import TextArea from "antd/lib/input/TextArea";
import DicTypeTicket from "../../features/comps/selectApi/dicType";
import FiltersTickets from "./filters";

const MainTickets = () => {
  const navigate = useNavigate();

  const url = '/issue/all';
  const urlOne = '/issue';

  const [form] = Form.useForm();
  const [filterForm] = Form.useForm();

  const [oneData, setOneData] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const { list, total, pagination } = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '80px'
    },
    {
      name: 'Тема',
      selector: row => row.title,
    },
    {
      name: 'Автор',
      selector: row => {
        let person = row.author;
        return person ? `${person.fam} ${person.im} ${person.otch || ''}` : null;
      },
    },
    {
      name: 'Дата создания',
      selector: row => moment(row.dateCreate).format('DD-MM-YYYY') 
    },
    {
      name: 'Дата обновления',
      selector: row => row.dateUpd ? moment(row.dateUpd).format('DD-MM-YYYY') : null
    },
    {
      name: 'Прошло',
      selector: row => {
        if (row.dateCreate) {
          const now = moment();
          const expiration = moment(row.dateCreate);

          const diff = now.diff(expiration);

          const diffDuration = moment.duration(diff);

          return `${diffDuration.days()} дней`;
        }
      }
    },
    {
      name: 'Действия',
      cell: (item) => {
        return <>
          {/* <Button onClick={() => handleOpenForm(item)} type='primary' ghost placeholder='Открыть' icon={<FontAwesomeIcon icon='edit' />} size='small'></Button> */}
          <Popover
            placement='leftBottom'
            trigger='click'
            content={<>Подтвердите действие: <Button onClick={() => handleDelete(item)} size='small' type='primary' danger>Удалить</Button></>}
          >
            <Button type='default' placeholder='Удалить' danger icon={<FontAwesomeIcon icon='trash' />} size='small'></Button>
          </Popover>
        </>
      },
      ignoreRowClick: true,
      right: true
    }
  ];

  const getData = async () => {
    await Get(url, pagination)
      .then((res) => dispatch(setTicketList(res.data)) );
  }

  const handleRefresh = () => getData();

  const onShowSizeChange = (curPage, newSize) => {
    dispatch(setTicketPagin({ size: newSize, page: curPage }));
  }

  const onChangePage = (page) => {
    dispatch(setTicketPagin({ page: page }))
  }

  const PaginBlock = () => {
    return <Pagination
      size='small'
      total={total}
      showTotal={total => `Всего ${total} записей`}
      defaultPageSize={pagination.limit}
      defaultCurrent={pagination.page}
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      onChange={onChangePage}
    />
  }

  // -- modal
  const handleCloseModal = () => {
    setOneData({});
    setIsOpen(false);
  }

  const handleSendForm = () => {
    const values = form.getFieldsValue();
    if (oneData.id) {
      Put(urlOne, values).then(el => {
        getData();
        handleCloseModal();
      }).catch(error => {
        console.log(error)
      });
    } else {
      Post(urlOne, values).then(el => {
        getData();
        handleCloseModal();
      }).catch(error => {
        console.log(error)
      });
    }
  }

  const handleOpenForm = (item = {}) => {
    if (item.id) {
      setOneData(item);
    }
    setIsOpen(true);
  }

  const handleSearch = (values) => {
    setRefresh(true);
  }

  const handleClear = () => {
    filterForm.resetFields();
    setRefresh(true);
  }

  const handleOpenIssue = (Issue) => {
    console.log(Issue);
    navigate('one/'+Issue.id)
  }

  useEffect(() => {
    getData();
  }, [pagination]);

  useEffect(() => {
    form.resetFields();
  }, [isOpen]);

  return [
    <Row key='s3'>
      <Col md={24}>
        <div className='wrapper-tab'>
          <PageHeader
            title='Обращения'
            subTitle='Список'
            ghost={false}
            extra={[
              <Button type='primary' ghost size='small' onClick={handleOpenForm}>Новое обращение</Button>,
              <Button icon={<FontAwesomeIcon icon='sync' />} type='primary' ghost size='small' onClick={handleRefresh}> </Button>
            ]}
          />
        </div>
        <FiltersTickets onSearch={handleSearch} onCLear={handleClear} />
        <Divider />
      </Col>
      <Col md={24}>
        {PaginBlock()}
      </Col>
      <Col md={24}>
        <DataTable
          columns={columns}
          data={list}
          className='row-hover'
          // selectableRows
          // onSelectedRowsChange={handlerSelectRow}
          onRowClicked={handleOpenIssue}
          dense
        />
      </Col>
      <Col md={24}>
        {PaginBlock()}
      </Col>
    </Row>,
    <Modal
      key='s4'
      title='Новое обращение'
      visible={isOpen}
      onOk={handleSendForm}
      onCancel={handleCloseModal}
    >
      <Form
        form={form}
        initialValues={oneData}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
      >
        <Row>
          <Col span={24}>
            <Form.Item name='title' required label='Тема'>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name='descr' required label='Текст сообщения'>
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name='type' required label='Тип'>
              <DicTypeTicket />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item name='responder' required label='Получатель'>
              <SelectApi type='organization' />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  ]
}

export default MainTickets;