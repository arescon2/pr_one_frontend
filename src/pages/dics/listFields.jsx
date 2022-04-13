import { Button, Col, Popconfirm, Radio, Row, Table, Tag } from "antd";
import moment from 'moment';
import { nanoid } from "nanoid";

import _ from 'lodash';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";

const ListFieldsForDicApp = ({ list = [{}], organization, handleUpdPerson, id_otdel }) => {
  const user = useSelector(state => state.main.user);

  const handleUpdField = (person) => {
    handleUpdPerson(id_otdel, person);
  }

  const isDevelop = user.roles.some( uRole => _.includes('DEVELOP', uRole.name));
  const isMyOrg = (user.person.organization.uid === organization.uid);

  const handleDelField = (person) => {
    console.log(person)
  }

  const columns = [
    {
      title: 'Статус',
      dataIndex: 'id',
      render: (text, record, index) => {
        const now = moment();
        let duration = undefined;
        if (record.dateUpd) duration = moment.duration(now.diff(moment(record.dateUpd)));
          else duration = moment.duration(now.diff(moment(record.dateCreate)));

        const tagStatus = {
          color: 'green',
          text: 'Актуальный'
        };

        if (duration.days() >= 30) {
          tagStatus.color = 'orange';
          tagStatus.text = 'Просрочен';
        }
        if (duration.days() >= 45) {
          tagStatus.color = 'error';
          tagStatus.text = 'Уточнить!';
        }

        return <Tag color={tagStatus.color}>{tagStatus.text}</Tag>
      }
    },
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
    {
      title: 'Действия',
      render: (record) => {
        return isDevelop || isMyOrg ?
          [
            <Button size="small" icon={<EditOutlined/>} key={nanoid()} type='primary' onClick={() => handleUpdField(record)} ></Button>,
            <Popconfirm key={nanoid()} placement="topLeft" title='Подтвердите удаление' onConfirm={handleDelField(record)} okText="Да" cancelText="Нет">
              <Button size="small" icon={<DeleteOutlined />}  type="danger" ></Button>
            </Popconfirm>
          ] : null;
      }
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