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
          id: 2,
          element: 'block',
          type: 'Col',
          classes: 'centered-child',
          child: [
            {
              id: 50,
              element: 'button',
              type: 'button',
              classes: '',
              size: 'large',
              icon: 'home',
              fill: false,
              minimal: true,
              disable: false,
              linkto: '/',
              placeholder: 'Главная страница'
            }
          ]
        },
        {
          id: 3,
          element: 'block',
          type: 'Col',
          classes: 'centered-child',
          child: [
            {
              id: 51,
              element: 'button',
              type: 'button',
              classes: '',
              size: 'large',
              icon: 'form',
              minimal: true,
              disable: false,
              linkto: '/page/tickets',
              placeholder: 'Тикеты',
              placeholder_position: 'right'
            }
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
