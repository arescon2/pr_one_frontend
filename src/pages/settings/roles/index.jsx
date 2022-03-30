import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Col, Row, Button, Popover, PageHeader, message, Pagination } from 'antd';

import moment from 'moment';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Delete, Get } from '../../../features/api';
import { useDispatch, useSelector } from 'react-redux';
import { setRolesList, setRolesForm, setRolesPagin } from '../../../features/stores/rolesSlice';

const apiUrl = 'role';

const RolesList = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const { list, total, pagination } = useSelector((state) => state.roles );
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    Delete(`/${apiUrl}?id=${item.id}`).then((result) => {
      message.success(`Организация "${item.name}" удалена`);
      getData();
    }).catch(err => {
      message.error(err.data);
    });
  };

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '50px'
    },
    {
      name: 'Название',
      selector: row => row.title,
      grow: 2
    },
    {
      name: 'Код',
      selector: row => row.name,
      grow: 2
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

  const handleOpenForm = (item) => {
    if (item === 'new') {
      dispatch(setRolesForm({}))
      navigate(`/settings/${pagename}/new`);
    } else {
      dispatch(setRolesForm(item))
      navigate(`/settings/${pagename}/${item.id}`);
    }
  };

  const handleRefresh = () => getData();

  const getData = async (first) => {
    first ? null : message.loading({ content: 'Обновление...', key: 'loading' });
    await Get(`/${apiUrl}`, pagination).then((res) => {
      dispatch(setRolesList(res.data));
      first ? null : message.success({ content: 'Обновлено', key: 'loading' });
    });
  };

  const onShowSizeChange = (curPage, newSize) => {
    dispatch(setRolesPagin({ size: newSize, page: curPage }));
  }

  const onChangePage = (page, size) => {
    dispatch(setRolesPagin({ page: page }))
  }

  useEffect(() => {
    getData(true);
  }, []);

  useEffect(() => {
    getData(true);
  }, [pagination]);

  return <Row>
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Роли и доступ'
          subTitle='Список'
          ghost={false}
          extra={[
            <Button icon={<FontAwesomeIcon icon='plus' />} type='primary' ghost size='small' onClick={() => handleOpenForm('new')}> Роль</Button>,
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

export default RolesList;