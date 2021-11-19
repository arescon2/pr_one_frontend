import { useEffect, useState } from 'react';

import './style.scss';
import Generator from '../../../features/generator';

let json = {
  new_ticket: [
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
  ]
}

const Page = ({ config }) => {
  const { data, setData } = useState({});

  return <Generator
    config={config}
    data={data}
    updData={setData}
  />;
}

export default Page;