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
  ],
  settings: [
    {
      id: 1,
      element: 'block',
      type: 'Row',
      classes: '',
      child: [
        {
          id: 1,
          element: 'block',
          type: 'Col',
          md: 12,
          classes: '',
          styles: '',
          child: [
            {
              id: 2,
              element: 'tabs',
              classes: '',
              large: false,
              data: 'menu',
              title: 'text'
            },
          ]
        }
      ]
    }
  ],
};

let menu = [
  {
    id: 1,
    text: 'Views',
    placeholder: 'Views',
    linkto: '/page/views',
    key: 'views',
    config: 'views_admin'
  },
  {
    id: 2,
    text: 'Тикеты',
    placeholder: 'Тикеты',
    linkto: '/page/tickets',
    key: 'tickets'
  },
  {
    id: 3,
    text: 'Настройки asdasd asd asda sd asd',
    placeholder: 'Настройки ',
    linkto: '/page/settings',
    key: 'settings'
  }
]

const Page = ({ params, loading }) => {
  const [ data, setData ] = useState({});
  const [ ready, setReady ] = useState(false);
  const [ config, setConfig ] = useState({});

  useEffect(() => {
    if(loading && !ready) {
      let _data = {...data, menu}
      setData(_data);
      setConfig(json[params.pagename])
      setReady(true);
    }
  }, [loading, ready])
  
  return ready ? <Generator
    config={config}
    data={data}
    updData={setData}
  /> : null
}

export default Page;