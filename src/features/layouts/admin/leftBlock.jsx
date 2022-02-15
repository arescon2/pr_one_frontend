import { useNavigate } from 'react-router-dom';

import { Menu } from 'antd';
import { nanoid } from 'nanoid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const LeftBlock = () => {
  let data = [
    {
      id: 1,
      icon: 'home',
      title: 'Главная страница',
      placeholder: 'Главная страница',
      link: '/'
    },
    {
      id: 2,
      icon: 'clipboard-list',
      title: 'Тикеты',
      placeholder: 'Тикеты',
      link: '/page/tickets'
    },
    {
      id: 3,
      icon: 'cog',
      title: 'Настройки',
      placeholder: 'Настройки',
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
        <FontAwesomeIcon style={{ width: '100%' }} size='lg' icon={elMenu.icon} />
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