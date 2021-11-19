import { useNavigate } from 'react-router-dom';

import { InputGroup, FormGroup, Button } from '@blueprintjs/core';
import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { Container, Row, Col } from 'react-grid-system';

import { nanoid } from 'nanoid';
import { Select } from '@blueprintjs/select';

import './style.scss';

function DataPathParser (str) {
  console.log(str.splice('.'))
}

const Generator = ({
  config = [],
  data,
  updData,
  el_data
}) => {

  const navigate = useNavigate();

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

    return {
      Text: <InputGroup
        className={el_conf.classes}
        disabled={disable}
        {...params}
      />,
    }[el_conf.type]
  };

  const GButton = ({ el_conf }) => {
    let disable = el_conf.disable || false;

    const handleClick = () => {
      el_conf.linkto ? navigate(_data[el_conf.linkto]) : null;
    }

    let _data = el_data || false;

    let b = <Button
      text={(_data ? _data[el_conf.text] : el_conf.text) || ''}
      type={el_conf[el_conf.type] || 'button'}
      intent={(_data ? _data[el_conf.text] : el_conf.intent) || 'none' }
      icon={(_data ? _data[el_conf.icon] : el_conf.icon) || null}
      small={el_conf.size == 'small'}
      large={el_conf.size == 'large'}
      disabled={disable}
      minimal={el_conf.minimal || false}
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
    return data[el_conf.data].map((el) => {
      return <Generator
        key={nanoid()}
        config={el_conf.child || []}
        data={data}
        el_data={el}
        updData={updData}
      />
    })
  }

  // switcher components
  
  const GSwitcher = ({ el_conf }) => {
    return {
      block: <GBlock el_conf={el_conf} />,
      input: <GInput el_conf={el_conf} />,
      button: <GButton el_conf={el_conf} />,
      collection: <GCollection el_conf={el_conf} />,
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