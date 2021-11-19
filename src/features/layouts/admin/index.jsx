import './style.scss';

import { nanoid } from 'nanoid';
import { Container, Row, Col } from 'react-grid-system';

import Header from '../../header';
import Footer from '../../footer';
import Generator from '../../generator';

const Home = (props) => {
  return [
    <LeftBlock key={nanoid()} />,
    <div key={nanoid()} className='card-root-block'>
      <Header />
      <Container fluid className='body-block'>
        {props.children}
      </Container>
    </div>,
    // <Footer key={nanoid()} />
  ]
}

const LeftBlock = () => {
  let data = {
    menu: [
      {
        id: 1,
        icon: 'home',
        placeholder: 'Главная страница',
        linkto: '/'
      },
      {
        id: 2,
        icon: 'form',
        placeholder: 'Тикеты',
        linkto: '/page/tickets'
      }
    ]
  }

  let json = [
    {
      id: 1,
      element: 'block',
      type: 'Row',
      classes: 'left-menu-wrapper',
      child: [
        {
          element: 'collection',
          data: 'menu',
          child: [
            {
              element: 'block',
              type: 'Col',
              classes: 'centered-child',
              child: [
                {
                  id: 'id',
                  element: 'button',
                  type: 'button',
                  classes: '',
                  size: 'large',
                  icon: 'icon',
                  fill: false,
                  minimal: true,
                  disable: false,
                  linkto: 'linkto',
                  placeholder: 'placeholder'
                }
              ]
            },
          ]
        }
      ]
    }
  ];

  return <div className='left-block'>
    <Generator
      config={json}
      data={data}
      // updData={(new_data) => setData(new_data)}
    />
  </div>
}

export default Home
