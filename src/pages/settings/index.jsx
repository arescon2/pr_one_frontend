import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Col, Row, Tabs } from 'antd';
import Blocks from './blocks';
import BlocksOne from './blocks/form';

const Settings = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const listMenu = [
    {
      id: 1,
      text: 'Блоки',
      placeholder: 'Блоки',
      linkto: 'blocks',
      key: 'Blocks',
      list: <Blocks />,
      form: <BlocksOne />
    }
  ]

  const handleTabChange = (navbarTabId) => {
    navigate(`/settings/${navbarTabId}`);
  };

  useEffect(() => {
    if(!pagename) {
      navigate(`/settings/${listMenu[0].linkto}`);
    }
  }, [])

  return <Tabs
    id={nanoid()}
    className='fill generator-tab'
    tabPosition='left'
    onChange={handleTabChange}
  >
    {
      listMenu.map( menuItem => {
        return <Tabs.TabPane
          key={nanoid()}
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