import { Layout, Menu, PageHeader, Tooltip } from "antd"
import { Content } from "antd/lib/layout/layout";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import { Route, useNavigate, Routes } from "react-router-dom";
import MainTickets from "./main";
import OneTicket from "./oneTicket";
import TicketCategory from "./settings/category";
import TicketsSettingMain from "./settings/main";
import TicketStatus from "./settings/status";
import TicketType from "./settings/type";

const TicketsMain = () => {
  const user = useSelector((store) => store.main.user);

  const items = [
    {
      id: 1,
      title: 'Мои обращения',
      placeholder: 'Мои обращения',
      roles: ['ALL'],
      link: '/tickets'
    },
    {
      id: 2,
      title: 'Ответственные обращения',
      placeholder: 'Ответственные обращения',
      roles: ['ALL'],
      link: '/tickets'
    },
    {
      id: 3,
      title: 'Настройки',
      placeholder: 'Настройки',
      roles: ['DEVELOP'],
      link: '/tickets/settings',
      children: [
        {
          id: 1,
          title: 'Статусы',
          placeholder: 'Статусы',
          roles: ['ALL'],
          link: '/tickets/settings/status'
        },
        {
          id: 2,
          title: 'Категории',
          placeholder: 'Категории',
          roles: ['ALL'],
          link: '/tickets/settings/category'
        },
        {
          id: 3,
          title: 'Типы',
          placeholder: 'Типы',
          roles: ['ALL'],
          link: '/tickets/settings/type'
        },
        {
          id: 4,
          title: 'Способы связи',
          placeholder: 'Способы связи',
          roles: ['ALL'],
          link: '/tickets/settings/communication'
        },
      ]
    },
  ];

  const navigate = useNavigate();

  const handlerGoLink = (elMenu) => {
    navigate(elMenu.link)
  };

  const MenuItemsCreator = (menuItems) => {
    return menuItems.map( elMenu => {
      if (elMenu.children) {
        return <Menu.SubMenu
          key={nanoid()}
          style={{ paddingLeft: 'none' }}
          placeholder={elMenu.placeholder}
          title={elMenu.title}
        >
          {MenuItemsCreator(elMenu.children)}
        </Menu.SubMenu>
      } else {
        return <Menu.Item
            key={nanoid()}
            style={{ paddingLeft: 'none' }}
            placeholder={elMenu.placeholder}
            onClick={() => handlerGoLink(elMenu)}
          >
            <Tooltip placement='right' title={elMenu.title}>
              {elMenu.title}
            </Tooltip>
          </Menu.Item>
      }
    })
  };

  return <Layout className="wrapper-main">
    <Menu
      className="tickets-menu"
      defaultSelectedKeys={['1']}
      mode="inline"
    >
      {MenuItemsCreator(items)}
    </Menu>
    <Content className='wrapper-tickets'>
      <Routes>
        <Route path="/" element={<MainTickets />} />
        {/* <Route path="/settings" element={<TicketsSettingMain />} /> */}
        <Route path="/settings/status" element={<TicketStatus />} />
        <Route path="/settings/category" element={<TicketCategory />} />
        <Route path="/settings/type" element={<TicketType />} />
        <Route path="/one/:id" element={<OneTicket />} />
      </Routes>
    </Content>
  </Layout>
}

export default TicketsMain;