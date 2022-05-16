import { Avatar, Col, Comment, Divider, Dropdown, Menu, PageHeader, Row, Space, Tag, Typography } from "antd"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Get } from "../../../features/api";

import moment from 'moment';

const OneTicket = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `/issue?id=${id}`;

  const [issue, setIssue] = useState({});

  const handleBack = () => {
    navigate('/tickets')
  }

  useEffect(() => {
    Get(url).then((res) => {
      setIssue(res.data.data);
    })
  }, []);

  const getAuthor = (author) => {
    return `${author.fam || ''} ${author.im || ''} ${author.otch || ''}`
  }

  const getOrgAuthor = (author) => {
    const org = author.organization || {};
    return `${org.name || ''}`;
  }

  const getStatus = () => {
    if (!issue.closed) {
      return issue.status ? <Tag color={issue.status.color}>{issue.status.name}</Tag> : '-'
    } else return <Tag color='red'>Closed</Tag>
  }

  const headMenu = () => {
    return <Menu
      items={[
        {
          label: '1111',
          key: '1'
        },
        {
          type: 'divider'
        },
        {
          label: 'Закрыть обращение',
          key: '99',
          danger: true
        }
      ]}
    />
  }

  return <Row gutter={12}>
    <Col span={24}>
      <div className='wrapper-tab'>
        <PageHeader
          onBack={handleBack}
          title='Обращение'
          subTitle={`№ ${id}`}
          ghost={false}
          extra={[
            <Space key='spaces' wrap>
              <Dropdown.Button trigger='click' size="small" type='primary' overlay={headMenu} />
            </Space>
          ]}
        />
      </div>
    </Col>
    <Col span={15}>
      <p><Typography.Title level={4}><span className='issue-header-title'>Тема: </span>{issue.title}</Typography.Title></p>
      <p><span className='issue-header-title'>Сообщение: </span></p>
      <span className='issue-block-body' dangerouslySetInnerHTML={{ __html: issue.descr }}></span>
    </Col>
    <Col span={9}>
      <div className="issue-head-title">
        <p><span>Статус: </span>{getStatus()}</p>
        <Divider />
        <p><span>От кого: </span>{(issue.author ? getAuthor(issue.author) : '')}</p>
        <p><span>Организация: </span>{(issue.author ? getOrgAuthor(issue.author) : '')}</p>
        <Divider />
        <p><span>Дата создания: </span>{moment(issue.dateCreate).format('DD-MM-YYYY')}</p>
      </div>
    </Col>
    <Col span={24}>
      <Divider />
      <Typography.Title level={5}>Комментарии</Typography.Title>
      <Comment
        className="comment-block"
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
        actions={[<span key="comment-basic-reply-to">Ответить</span>]}
        datetime={moment().format('DD-MM-YYYY')}
        author={'Admin admin'}
        content={
          <p>
            content
          </p>
        }
      />
    </Col>
  </Row>
}

export default OneTicket;