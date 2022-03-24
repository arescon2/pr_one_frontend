import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Col, Layout, Menu, Row, Tabs } from 'antd';
import OrgsList from './organizations';
import OrgsOne from './organizations/form';
import UserList from './users';
import UserOne from './users/form';

import _ from 'lodash';

const Settings = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const listMenu = [
    {
      id: 1,
      text: 'Пользователи',
      placeholder: 'Пользователи',
      linkto: 'users',
      key: 'Users',
      list: <UserList />,
      form: <UserOne />
    },
    {
      id: 2,
      text: 'Организации',
      placeholder: 'Организации',
      linkto: 'organizations',
      key: 'Organizations',
      list: <OrgsList />,
      form: <OrgsOne />
    }
  ]

  const handleGoLink = (item) => {
    navigate(`/settings/${item.key}`);
  };

  useEffect(() => {
    if (!pagename) {
      navigate(`/settings/${listMenu[0].linkto}`);
    }
  }, [])

  return <Layout className='wrapper'>
    <Layout.Sider theme='light'>
      <Menu onClick={handleGoLink} selectedKeys={[pagename]} mode='vertical'>
        {
          listMenu.map(el => {
            return <Menu.Item key={el.linkto}>{ el.text }</Menu.Item>
          })
        }
      </Menu>
    </Layout.Sider>
    <Layout.Content className='wrapper'>
      {
        (() => {
          const curMenu = _.find(listMenu, el => el.linkto === pagename);

          return curMenu ? id ? curMenu.form : curMenu.list : null
        })()
      }
    </Layout.Content>
  </Layout>
};

export default Settings;
