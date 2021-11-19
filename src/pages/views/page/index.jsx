import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  NonIdealState, Slider, Spinner, SpinnerSize
} from "@blueprintjs/core";

import Renderer from './renderer';

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

function Page() {
  const params = useParams();
  const [ location, setLocation ] = useState({});
  const [ config, setConfig ] = useState({});
  const [ loading, setLoading ] = useState(true);

  const rerender = () => {
    setLoading(true);
    setConfig(json[params.pagename]);
    setLocation(params.pagename)
  };

  useEffect(() => {
    if(params.pagename !== location) {
      rerender();
    };
    // get page config
  }, [params.pagename]);

  return !loading ? <NonIdealState
    className='spinner-page'
    icon={<Spinner size={SpinnerSize.STANDARD} />}
    description="Подождите, идет загрузка данных"
  /> : <Renderer params={params} config={config} />
};

export default Page;