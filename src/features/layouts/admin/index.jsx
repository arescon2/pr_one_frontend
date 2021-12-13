import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';

import Header from '../../header';
import Footer from '../../footer';

import LeftBlock from './leftBlock';

import './style.scss';

const Home = (props) => {
  return [
    <Helmet key={nanoid()}>
      <meta charSet="utf-8" />
      <title>AllTum.Журнал</title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>,
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
