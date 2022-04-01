import { useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { Menu, Tooltip } from 'antd';
import { nanoid } from 'nanoid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';

const LeftBlock = () => {
  const user = useSelector((store) => store.main.user);

  const data = [
    {
      id: 1,
      icon: 'home',
      title: 'Главная страница',
      placeholder: 'Главная страница',
      roles: ['ALL'],
      link: '/'
    },
    {
      id: 2,
      icon: 'address-book',
      title: 'Справочник контактный',
      placeholder: 'Справочник контактный',
      roles: ['ALL'],
      link: '/dictionary'
    },
    {
      id: 3,
      icon: 'clipboard-list',
      title: 'Тикеты',
      placeholder: 'Тикеты',
      roles: ['DEVELOP'],
      link: '/page/tickets'
    },
    {
      id: 999,
      icon: 'cog',
      title: 'Настройки',
      placeholder: 'Настройки',
      roles: ['DEVELOP'],
      link: '/settings'
    }
  ];

  const navigate = useNavigate();

  const handlerGoLink = (elMenu) => {
    navigate(elMenu.link)
  };

  const MenuItemsCreator = () => {
    return data.map( elMenu => {
      return <Menu.Item
          key={nanoid()}
          style={{ paddingLeft: 'none' }}
          placeholder={elMenu.placeholder}
          onClick={() => handlerGoLink(elMenu)}
        >
          <Tooltip placement='right' title={elMenu.title}>
            <FontAwesomeIcon style={{ width: '100%' }} size='lg' icon={elMenu.icon} />
          </Tooltip>
        </Menu.Item>
    })
  };

  return <div className='left-block'>
    <Menu
      className='root-menu'
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="vertical"
    >
      { MenuItemsCreator() }
    </Menu>
  </div>
};

export default LeftBlock;