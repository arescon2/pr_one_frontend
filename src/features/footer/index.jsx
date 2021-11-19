import './style.scss';

import { Container, Row, Col } from 'react-grid-system';

const Footer = (props) => {
  return (
    <div className='footer-block'>
      <Container fluid className='footer-content'>
        ГБУЗ РТ "Наименование организациии"
      </Container>
    </div>
  )
}

export default Footer