import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Col, Row, Button, Popover, Radio, PageHeader } from 'antd';

import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Blocks = () => {
  const navigate = useNavigate();

  const handleDelete = (item) => {
    console.log(item)
  };

  const columns = [
    {
      name: '#',
      selector: row => row.id,
      width: '100px'
    },
    {
      name: 'Название',
      selector: row => row.name,
      grow: 2
    },
    {
      name: 'Дата создания',
      selector: row => row.created,
    },
    {
      name: 'Действия',
      cell: (item) => {
        return <>
          <Button onClick={() => handleOpenForm(item.name)} type='primary' ghost placeholder='Редактировать' icon={<FontAwesomeIcon icon='edit' />} size='small'></Button>
          <Popover
            placement='leftBottom'
            trigger='click'
            content={<>Подтвердите действие: <Button onClick={() => handleDelete(item)} size='small' type='primary'>Да</Button></>}
          >
            <Button type='default' placeholder='Удалить' danger icon={<FontAwesomeIcon icon='trash' />} size='small'></Button>
          </Popover>
        </>
      },
      ignoreRowClick: true,
      right: true
    }
  ];

  const data = [
    {
      id: 1,
      name: 'views_form',
      created: '08.02.2022',
      config: []
    },
    {
      id: 2,
      name: 'asdasd',
      created: '08.02.2022',
      config: []
    },
  ];

  const handleButtonClick = () => {

  };

  const handlerSelectRow = (args) => {
    console.log(args)
  };

  const handleOpenForm = (name) => {
    navigate(`/settings/blocks/${name}`);
  };

  const handleRefresh = () => {
    console.log('refresh')
  }

  return <Row>
    <Col md={24}>
      <div className='wrapper-tab'>
        <PageHeader
          title='Блоки'
          subTitle='Список'
          ghost={false}
          extra={[
            <Button icon={<FontAwesomeIcon icon='plus' />} type='primary' ghost size='small' onClick={() => handleOpenForm('new')}>Новый блок</Button>,
            <Button icon={<FontAwesomeIcon icon='sync' />} type='primary' ghost size='small' onClick={handleRefresh}> </Button>
          ]}
        />
      </div>
      
    </Col>
    <Col md={24}>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        onSelectedRowsChange={handlerSelectRow}
        dense
      />
    </Col>
  </Row>
};

export default Blocks;