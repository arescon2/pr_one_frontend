import { useState } from 'react';
import { Container, Row, Col } from 'react-grid-system';

import Generator from '../../features/generator';

const Page = (props) => {
  const { data, setData } = useState({});

  let json = [
    {
      id: 1,
      element: 'block',
      type: 'Row',
      classes: '',
      child: [
        {
          id: 2,
          element: 'block',
          type: 'Col',
          md: 2,
          classes: '',
          child: [
            {
              id: 3,
              element: 'input',
              type: 'Text',
              classes: '',
              
              title: 'Заголовок',
              placeholder: 'Заголовок',
              size: 'small',
              input_type: 'Text',

              value: 'text text',
              disable: false,

            }
          ]
        },
        {
          id: 2,
          element: 'block',
          type: 'Col',
          md: 2,
          classes: '',
          child: [
            {
              id: 3,
              element: 'input',
              type: 'Text',
              classes: '',
              
              title: 'Заголовок',
              placeholder: 'Заголовок',
              input_type: 'Text',

              value: 'text text',
              disable: false,

            }
          ]
        },
        {
          id: 4,
          element: 'block',
          type: 'Col',
          md: 2,
          classes: '',
          child: [
            {
              id: 5,
              element: 'button',
              type: 'button',
              classes: '',
              
              text: 'Сохранить',
              placeholder: 'Сохранить, сохр',
              icon: 'refresh',
              rightIcon: 'copy',
              intent: 'success',

              alignText: 'center',
              fill: false,

              disable: false,

            }
          ]
        },
        {
          id: 6,
          element: 'block',
          type: 'Col',
          md: 2,
          classes: '',
          child: [
            {
              id: 5,
              element: 'select',
              type: 'select',
              classes: '',
            
              disable: false,

            }
          ]
        }
      ]
    }
  ];

  return (
    <Container fluid>
      <Generator
        config={json}
        data={data}
        updData={(new_data) => setData(new_data)}
      />
    </Container>
  )
}

export default Page;
