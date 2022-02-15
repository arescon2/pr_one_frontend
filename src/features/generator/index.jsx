import { useState } from 'react';
import {
  useNavigate, useParams,
  useLocation, useSearchParams
} from 'react-router-dom';

import { Row, Col, Input } from 'antd';

import { nanoid } from 'nanoid';

import './style.scss';
import Creator from './creator';

function DataPathParser (str) {
  console.log(str.splice('.'))
}

const Generator = ({
  config = [],
  data,
  updData,
  el_data,
}) => {

  const navigate = useNavigate();

  let _data = el_data || false;

  const GBlock = ({ el_conf }) => {
    let params = {};

    if(el_conf.type === 'Col') {
      params.md = el_conf.md || 12
    };

    el_conf.classes ? params.className = el_conf.classes : null

    const child_render = <Generator
      config={el_conf.child || []}
      data={data}
      el_data={el_data}
      updData={updData}
    />;

    return {
      Row: <Row className={el_conf.classes} {...params}>{child_render}</Row>,
      Col: <Col className={el_conf.classes} {...params}>{child_render}</Col>,
      div: <div className={el_conf.classes} {...params}>{child_render}</div>,
    }[el_conf.type]
  };

  const GInput = ({ el_conf }) => {
    let params = {};
    el_conf.placeholder ? params.placeholder = el_conf.placeholder : null;
    params.type = el_conf.input_type || 'text';
    let disable = el_conf.disable || false;
    // size: 'small',

    if(el_conf.value && el_conf.value.includes('bind.')) {
      // binding data
    } else params.defaultValue = el_conf.value;

    let b = {
      Text: <Input
        className={el_conf.classes}
        disabled={disable}
        {...params}
      />,
    }[el_conf.type];

    if(el_conf.placeholder) {
      b = <Tooltip2
        fill={true}
        content={(_data ? _data[el_conf.placeholder] : el_conf.placeholder) || '' }
        placement={(_data ? _data[el_conf.position] : el_conf.position) || 'auto'}
      >{b}</Tooltip2>
    }
    return b;
  };

  const GButton = ({ el_conf }) => {
    let disable = el_conf.disable || false;

    const handleClick = () => {
      el_conf.linkto ? navigate(_data[el_conf.linkto]) : null;
    }

    let b = <Button
      text={(_data ? _data[el_conf.text] || _data['text'] : el_conf.text) || ''}
      type={el_conf[el_conf.type] || 'button'}
      intent={(_data ? _data[el_conf.text] : el_conf.intent) || 'none' }
      icon={(_data ? _data[el_conf.icon] : el_conf.icon) || null}
      small={el_conf.size == 'small'}
      large={el_conf.size == 'large'}
      disabled={disable}
      minimal={el_conf.minimal || false}
      fill={el_conf.fill || false}
      onClick={handleClick}
    />

    if(el_conf.placeholder) {
      b = <Tooltip2
        content={(_data ? _data[el_conf.placeholder] : el_conf.placeholder) || '' }
        placement={(_data ? _data[el_conf.position] : el_conf.position) || 'auto'}
      >{b}</Tooltip2>
    }

    return b;
  };

  // const GSelect = ({ el_conf }) => {
  //   return <Select
  //     items={[]}
  //     itemPredicate={[]}
  //     itemRenderer={}
  //     noResults={<MenuItem disabled={true} text="Пусто" />}
  //     onItemSelect={() => {
  //       console.log('selected')
  //     }}
  //   />
  // }

  const GCollection = ({ el_conf }) => {
    let _data = data[el_conf.data] || []
    return _data.map((el) => {
      return <Generator
        key={nanoid()}
        config={el_conf.child || []}
        data={data}
        el_data={el}
        updData={updData}
      />
    })
  };

  const GMenu = ({ el_conf }) => {
    let _data = data[el_conf.data] || []
    return <Menu className={Classes.ELEVATION_1}>
      {
        _data.map( el => {
          return <MenuItem
            key={nanoid()}
            icon={el.icon || null}
            text={el.text || null}
          />
        })
      }
    </Menu>
  };

  const GTabs = ({ el_conf }) => {
    let _data = data[el_conf.data] || [];
    let [searchParams, setSearchParams] = useSearchParams();
    let [loading, setLoading] = useState();
    let [config, setConfig] = useState();

    const location = useLocation();
    const curTab = searchParams.get("tab");

    const handleNavbarTabChange = (navbarTabId) => {
      if (!searchParams.get("tab"))
        searchParams.append("tab", navbarTabId);
      else {
        let a = Array.from(searchParams)
        a.forEach( el => {
          el[0] === 'tab' ? el[1] = navbarTabId : null;
          return el;
        });
        
        searchParams = new URLSearchParams(a)
      }
      
      navigate(`${location.pathname}?${searchParams}`)
    };

    let json = {
      views_admin: [
        {
          id: 1,
          element: 'block',
          type: 'Row',
          classes: 'fill',
          child: [
            {
              id: 2,
              element: 'block',
              type: 'Col',
              md: 12,
              classes: '',
              child: [
                {
                  element: 'creator',
                  config: 'views_add',
                }
              ]
            },
          ]
        }
      ]
    };

    const getConfig = (el) => {
      return json[el.config];
    };

    return <Tabs
      id={nanoid()}
      className='fill generator-tab'
      animate={el_conf.animate || false}
      key={el_conf.vertical ? "vertical" : "horizontal"}
      selectedTabId={curTab ? curTab : _data[0].key}
      vertical={el_conf.vertical ? "vertical" : "horizontal"}
      onChange={handleNavbarTabChange}
    >
      {
        _data.map( el => {
          return <Tab
            key={nanoid()}
            id={el.key}
            title={el.text || ''}
            panel={
              <>
                { el_conf.title ? <Col md={12}><h3 className='bp3-heading'>
                  { el[el_conf.title] + ' - ' + el.config || '' }
                </h3></Col> : null }
                <Generator
                  config={getConfig(el)|| []}
                  el_data={el_data}
                  data={data}
                  updData={updData}
                />
              </>
            } />
        })
      }
    </Tabs>
  };

  const GCreator = ({ el_conf }) => {
    return <Creator config_name={el_conf.config} />
  };

  // switcher components
  
  const GSwitcher = ({ el_conf }) => {
    return {
      block: <GBlock el_conf={el_conf} />,
      input: <GInput el_conf={el_conf} />,
      button: <GButton el_conf={el_conf} />,
      collection: <GCollection el_conf={el_conf} />,
      menu: <GMenu el_conf={el_conf} />,
      tabs: <GTabs el_conf={el_conf} />,
      creator: <GCreator el_conf={el_conf} />,
      // select: <GSelect el_conf={el_conf} />
    }[el_conf.element] || <> Компонент {el_conf.element} недоступен </>
  };

  if(config && config.length > 0) {
    return <>
      {config.map((el_conf) => {
        return <GSwitcher key={nanoid()} el_conf={el_conf} />
      })}
    </>
  } else return <>empty</>;
}

export default Generator;