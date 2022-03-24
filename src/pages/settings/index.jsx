import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Col, Row, Tabs } from 'antd';
import Blocks from './blocks';
import BlocksOne from './blocks/form';
import OrgsList from './organizations';
import OrgsOne from './organizations/form';
import UserList from './users';
import UserOne from './users/form';

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

  const handleTabChange = (navbarTabId) => {
    navigate(`/settings/${navbarTabId}`);
  };

  useEffect(() => {
    if (!pagename) {
      navigate(`/settings/${listMenu[0].linkto}`);
    }
  }, [])

  return <Tabs
    size='small'
    defaultActiveKey={pagename ? pagename : listMenu[0].linkto}
    id={nanoid()}
    className='fill generator-tab'
    tabPosition='left'
    onChange={handleTabChange}
  >
    {
      listMenu.map( menuItem => {
        return <Tabs.TabPane
          key={menuItem.key}
          tab={menuItem.text || ''}
        >
          <Col md={24}>
            {
              id ? menuItem.form : menuItem.list
            }
            
          </Col>
        </Tabs.TabPane>
      })
    }
  </Tabs>
};

export default Settings;
