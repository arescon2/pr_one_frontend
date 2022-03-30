import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Col, Layout, Menu, Row, Tabs } from 'antd';
import OrgsList from './organizations';
import OrgsOne from './organizations/form';
import UserList from './users';
import UserOne from './users/form';

import _ from 'lodash';
import RolesList from './roles';
import AccessList from './roles/accesses';
import { useSelector } from 'react-redux';

const Settings = () => {
  const { pagename, id } = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.main)

  const listMenu = [
    {
      id: 1,
      text: 'Пользователи',
      placeholder: 'Пользователи',
      linkto: 'users',
      key: 'Users',
      roles: 'ALL',
      list: <UserList />,
      form: <UserOne />
    },
    {
      id: 2,
      text: 'Организации',
      placeholder: 'Организации',
      linkto: 'organizations',
      key: 'Organizations',
      roles: 'DEVELOP',
      list: <OrgsList />,
      form: <OrgsOne />
    },
    {
      id: 3,
      text: 'Роли и доступ',
      placeholder: 'Роли и доступ',
      linkto: 'roles',
      key: 'Roles',
      roles: 'DEVELOP',
      list: <RolesList />,
      form: <AccessList />
    }
  ]

  const handleGoLink = (item) => {
    pagename !== item.key && navigate(`/settings/${item.key}`);
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
          listMenu.map(elMenu => {
            let show = false;
            if (_.includes(elMenu.roles, 'ALL')) {
              show = true;
            } else {
              user.roles.forEach( role => {
                show = _.includes(elMenu.roles, role.name)
              });
            }
            return show ? <Menu.Item key={elMenu.linkto}>{ elMenu.text }</Menu.Item> : null;
          })
        }
      </Menu>
    </Layout.Sider>
    <Layout.Content className='wrapper'>
      {
        (() => {
          const curMenu = _.find(listMenu, elMenu => {
            if (elMenu.linkto === pagename) {
              let show = false;
              if (_.includes(elMenu.roles, 'ALL')) {
                show = true;
              } else {
                user.roles.forEach( role => {
                  show = _.includes(elMenu.roles, role.name)
                });
              }
              return show ? elMenu : null;
            }
          });

          return curMenu ? id ? curMenu.form : curMenu.list : null
        })()
      }
    </Layout.Content>
  </Layout>
};

export default Settings;
