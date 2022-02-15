import { nanoid } from 'nanoid';
import { Helmet } from 'react-helmet';

import { Layout, Row } from 'antd';

import Header from '../../header';
import Footer from '../../footer';

import LeftBlock from './leftBlock';

import './style.scss';

const Home = (props) => {
  return <Layout className='rootLayout'>
    <Helmet key={nanoid()}>
      <meta charSet="utf-8" />
      <title>Journal</title>
      {/* <link rel="canonical" href="http://mysite.com/example" /> */}
    </Helmet>
    <LeftBlock key={nanoid()} />
    <div key={nanoid()} className='card-root-block'>
      <Header />
      <Layout.Content className='body-block'>
        {props.children}
      </Layout.Content>
    </div>
  </Layout>
}

export default Home
