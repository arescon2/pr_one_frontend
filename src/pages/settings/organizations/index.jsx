import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Col, Row, Button, Popover, PageHeader, message, Pagination, Tooltip } from 'antd';

import moment from 'moment';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Delete, Get } from '../../../features/api';
import { useDispatch, useSelector } from 'react-redux';
import { setOrgsList, setOrgsForm, setOrgsPagin } from '../../../features/stores/orgsSlice';

const OrgsList = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const { list, total, pagination } = useSelector((state) => state.orgs);
  const dispatch = useDispatch();

  const handleDelete = (item) => {
    Delete(`/organization?id=${item.id}`).then((result) => {
      message.success(`Организация "${item.name}" удалена`);
      getData();
    });
  };

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '80px'
    },
    {
      name: 'Название',
      selector: row => <Tooltip placement="topLeft" title={row.name}>{row.name}</Tooltip>,
      width: '200px',
    },
    {
      name: 'Короткое название',
      selector: row => <Tooltip placement="topLeft" title={row.short}>{row.short}</Tooltip>,
      width: '200px',
    },
    {
      name: 'ИНН',
      selector: row => row.inn,
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
      dispatch(setOrgsForm({}))
      navigate(`/settings/${pagename}/new`);
    } else {
      dispatch(setOrgsForm(item))
      navigate(`/settings/${pagename}/${item.id}`);
    }
  };

  const handleRefresh = () => getData();

  const getData = async (first) => {
    first ? null : message.loading({ content: 'Обновление...', key: 'loading' });
    await Get('/organization', pagination).then((res) => {
      dispatch(setOrgsList(res.data));
      first ? null : message.success({ content: 'Обновлено', key: 'loading' });
    });
  };

  const onShowSizeChange = (curPage, newSize) => {
    dispatch(setOrgsPagin({ size: newSize, page: curPage }));
  }

  const onChangePage = (page, size) => {
    dispatch(setOrgsPagin({ page: page }))
  }

  // useEffect(() => {
  //   getData(true);
  // }, []);

  useEffect(() => {
    getData(true);
  }, [pagination]);

  return <Row>
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Организации'
          subTitle='Список'
          ghost={false}
          extra={[
            <Button type='primary' ghost size='small' onClick={() => handleOpenForm('new')}>Добавить</Button>,
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

export default OrgsList;