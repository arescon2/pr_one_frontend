import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Col, Row, Button, Popover, PageHeader, message, Pagination } from 'antd';

import moment from 'moment';

import _ from 'lodash';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Delete, Get } from '../../../features/api';
import { useDispatch, useSelector } from 'react-redux';
import { setUsersList, setUsersPagin, setUsersForm } from '../../../features/stores/usersSlice';

const UserList = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const { list, total, pagination } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    Delete(`/person?id=${item.id}`).then((result) => {
      message.success(`Организация "${item.name}" удалена`);
      getData();
    });
  };

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '100px'
    },
    {
      name: 'ФИО',
      selector: row => `${row.fam} ${row.im} ${row.otch ? row.otch : ''}`,
      grow: 2
    },
    {
      name: 'ДР',
      selector: row => moment(row.dateBirth).format('DD-MM-YYYY'),
    },
    {
      name: 'Дата создания',
      selector: row => moment(row.dateCreate).format('DD-MM-YYYY'),
    },
    {
      name: 'Действия',
      cell: (item) => {
        return <>
          <Button onClick={() => handleOpenForm(item)} type='primary' ghost placeholder='Редактировать' icon={<FontAwesomeIcon icon='edit' />} size='small'></Button>
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

  const handlerSelectRow = (args) => {
    console.log(args)
  };

  const handleOpenForm = (data) => {
    let item = {...data}
    if (item === 'new') {
      dispatch(setUsersForm({}))
      navigate(`/settings/${pagename}/new`);
    } else {
      item.dateBirth = moment(item.dateBirth);
      dispatch(setUsersForm(item))
      navigate(`/settings/${pagename}/${item.id}`);
    }
  };

  const handleRefresh = () => getData();

  const getData = async (first) => {
    first ? null : message.loading({ content: 'Обновление...', key: 'loading' });
    await Get('/person', pagination).then((res) => {
      first ? null : message.success({ content: 'Обновлено', key: 'loading' });
      dispatch(setUsersList(res.data));
    });
  };

  const onShowSizeChange = (curPage, newSize) => {
    dispatch(setUsersPagin({ size: newSize, page: curPage }));
  }

  const onChangePage = (page, size) => {
    dispatch(setUsersPagin({ page: page }))
  }

  useEffect(() => {
    getData(true);
  }, []);

  return <Row>
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Пользователи'
          subTitle='Список'
          ghost={false}
          extra={[
            <Button icon={<FontAwesomeIcon icon='plus' />} type='primary' ghost size='small' onClick={() => handleOpenForm('new')}>Новый пользователь</Button>,
            <Button icon={<FontAwesomeIcon icon='sync' />} type='primary' ghost size='small' onClick={handleRefresh}> </Button>
          ]}
        />
      </div>
      
    </Col>
    <Col md={24}>
      <Pagination
        size='small'
        total={total}
        showTotal={total => `Всего ${total} записей`}
        defaultPageSize={pagination.limit}
        defaultCurrent={pagination.page}
        showSizeChanger
        onShowSizeChange={onShowSizeChange}
        onChange={onChangePage}
      />
    </Col>
    <Col md={24}>
      <DataTable
        columns={columns}
        data={list}
        selectableRows
        onSelectedRowsChange={handlerSelectRow}
        dense
      />
    </Col>
  </Row>
};

export default UserList;