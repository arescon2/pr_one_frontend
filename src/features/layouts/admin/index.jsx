import './style.scss';

import { nanoid } from 'nanoid';
import { Container, Row, Col } from 'react-grid-system';

import Header from '../../header';
import Footer from '../../footer';

import LeftBlock from './leftBlock';

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

export default Home
