import { createRef, useEffect, useState } from 'react';
import {
  useNavigate, useParams,
  useLocation, useSearchParams
} from 'react-router-dom';

import { Container, Row, Col } from 'react-grid-system';

import {
  Classes, InputGroup, FormGroup,
  Button, Menu, MenuDivider, MenuItem,
  Tabs, Tab, Dialog, H5, Position,
  Classes as CoreClasses,
  Divider,
} from '@blueprintjs/core';

import { Popover2, Tooltip2 } from "@blueprintjs/popover2";
import { Select } from '@blueprintjs/select';

import { toast } from 'react-toastify';

import { nanoid } from 'nanoid';

import './style.scss';

const blocks = {
  Row: {
    id: null,
    orderBy: 1,
    element: 'block',
    type: 'Row',
    parent: 'root'
  }
};

blocks['Col'] = {
  ...blocks['Row'],
  type: 'Col',
  md: 12
};

blocks['Div'] = {
  ...blocks['Row'],
  type: 'Div',
  classes: '',
};

const Creator = ({ config_name, onUpdate }) => {
  const [ ready, setReady ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  const [ config, setConfig ] = useState([]);

  const getConfig = (name) => {
    // to api, config_name
    // setConfig([
    //   {
    //     element: 'block',
    //     type: 'Row',
    //     child: [
    //       {
    //         id: 2,
    //         element: 'block',
    //         type: 'Col',
    //         md: 12,
    //         classes: '',
    //       },
    //     ]
    //   }
    // ]);
    setReady(true);
  }

  useEffect(() => {
    if(!ready) {
      console.log('init')
      getConfig(config_name);
    }
  }, [ready]);

  const handleSetConfig = (new_state) => {
    setLoading(false);
    setConfig(new_state);
    setLoading(true);
  }

  let rootConf = [...config];

  console.log(rootConf)

  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ newBlock, setNewBlock ] = useState({});
  const [ newBlockParent, setNewBlockParent ] = useState({
    parent: 'root',
    orderBy_prev: null
  });

  const handleAddBlock = (block, upd = false) => {
    // id_prev - id prev block OR null, id пред-го блока
    // upd - true/false, блок редактируется

    let _config = [...config];
    if(upd) { // меняем блок
      let index = _config.findIndex( el => el.id === block.id);
      _config.splice(index, 1, {...block});
    } else {
      // ресортировка
      let blocksFromParent = _config.filter(el => el.parent === block.parent)
        .sort((a,b) => a.orderBy - b.orderBy);
        
      if(blocksFromParent.length > 0) {
        let startOrderBy = block.orderBy; // начальное значение

        blocksFromParent.map( el => {
          if(el.orderBy >= startOrderBy) {
            startOrderBy++;
            el.orderBy = startOrderBy;
            let index = _config.findIndex( _el => _el.id === el.id);

            _config.splice(index, 1, {...el});
          };
        });
        // добавляем блок
        _config.push({...block});
      } else {
        // добавляем блок
        _config.push({...block});
      }
    } 
    // save and reload
    console.log(_config)
    setConfig([..._config]);
  };
  
  const handlePlusButton = (parentId, orderBy_prev = 0) => {
    let orderBy = orderBy_prev ? orderBy_prev + 1 : 1;

    if(parentId === 'root') {
      let b = {...blocks['Row']}
      b.id = nanoid();
      b.parent = parentId;
      b.orderBy = orderBy
      handleAddBlock(b)
    } else {
      handleOpenDialog(parentId, orderBy_prev)
    }
  };

  const handleCloseDialog = () => {
    setNewBlock({})
    setNewBlockParent({
      parent: 'root',
      orderBy_prev: null
    });
    setIsOpenDialog(false)
  };

  const handleOpenDialog = (parentId, orderBy_prev) => {
    setNewBlockParent({
      parent: parentId,
      orderBy_prev: orderBy_prev
    });
    setIsOpenDialog(true);
  };

  const handleAdd = (type) => {
    let b = {...blocks[type]};
    b.id = nanoid();
    b.parent = newBlockParent.parent;
    b.orderBy = newBlockParent.orderBy_prev ? newBlockParent.orderBy_prev + 1 : 1;

    handleAddBlock(b);

    handleCloseDialog();
  };

  const handleUpdOpenBlock = (id = null) => {
    if(!id) {
      toast('id is null', { type: 'error' });
      return
    };

  }

  const renderButtons = () => {

    let parentBlock = config.find( el => el.id === newBlockParent.parent);

    if(!parentBlock || !isOpenDialog) return 'null'; else {

      let groups = ['Grid', 'Data Display', 'Form'];

      let arrayButtons = [
        {
          type: 'Row',
          group: 'Grid',
          visible: []
        },
        {
          type: 'Col',
          group: 'Grid',
          visible: ['Row', 'Col']
        },
        {
          type: 'Div',
          group: 'Grid',
          visible: ['Row', 'Col', 'Div']
        },
      ];

      let _arrayButtons = arrayButtons.filter( el => {
        if(el.visible.findIndex( _ => _ === parentBlock.type ) > -1)
          return el;
      });

      return <>
      {
        groups.map(group => {
          return [
            <Col md={12} key={nanoid()} >
              <h6 className='bp3-heading'>{group}</h6>
            </Col>,
            <Col md={12} >
              {
                _arrayButtons.filter( button => button.group == group)
                  .map(button => {
                    return <Button
                      key={nanoid()}
                      outlined
                      intent='primary'
                      text={button.type}
                      onClick={()=>handleAdd(button.type)}
                      style={{ marginRight: '5px' }}
                    />
                  })
              }
            </Col>,
            <Divider key={nanoid()}/>
          ]
        })
      }
      </>
    }
  };

  return <Col>
    {!loading ? 
      <>loading</>
    : <>
      <Generator
        parent='root'
        config={rootConf}
        setConfig={(_) => handleSetConfig(_) }
        handlePlusButton={handlePlusButton}
        handleUpdOpenBlock={handleUpdOpenBlock}
      />
      <Dialog
        isOpen={isOpenDialog}
        onClose={handleCloseDialog}
        title={'Добавление блока, ' + newBlockParent.parent}
      >
        <div style={{ marginTop: '10px' }} />
        { isOpenDialog ? renderButtons() : null}
      </Dialog>
    </>}
  </Col>
};

const Generator = ({
  parent = 'root',
  config = [],
  setConfig,
  handlePlusButton,
  handleUpdOpenBlock
}) => {

  const handleDeleteBlock = (id) => {
    let _config = [...config];

    let block = _config.find( el => el.id === id );

    const delBlock = (_id) => {
      // удаляем элемент
      _config = _config.filter( el => el.id !== id);
      // ищем и удаляем дочек
      _config.map( el => {
        if(el.parent === _id) delBlock(el.id)
      });
    };

    delBlock(id);

    let blocksFromParent = _config.filter(el => el.parent === block.parent)
      .sort((a,b) => a.orderBy - b.orderBy);

    let startOrderBy = block.orderBy;

    blocksFromParent.map( el => {
      if(el.orderBy >= startOrderBy) {
        console.log('tut')
        el.orderBy = startOrderBy;
        let index = _config.findIndex( _el => _el.id === el.id);

        startOrderBy++;

        _config.splice(index, 1, {...el});
      };
    });

    setConfig(_config);
  }

  let button_plus = (parent, orderBy_prev) => {    
    return <div className='creator-button-block'>
      <Button
        onClick={() => handlePlusButton(parent, orderBy_prev) }
        className='creator-plus-button'
        intent='primary'
        small
        text='+'
      />
    </div>
  }

  const GBlock = ({ el_conf }) => {
    let params = {};

    if(el_conf.type === 'Col') {
      params.md = el_conf.md || 12
    };

    el_conf.classes ? params.className = el_conf.classes : null;

    const child_render = <Generator
      parent={el_conf.id}
      config={config}
      setConfig={setConfig}
      handlePlusButton={handlePlusButton}
      handleUpdOpenBlock={handleUpdOpenBlock}
    />;

    const headerBlock = (name) => <div className='creator-block-name'>
        <span className='name-block'>{el_conf.orderBy} - {name} - {el_conf.id}</span>
        
        <div style={{ float: 'right'}}>
          <Button
            intent='warning' small icon='cog'
            onClick={() => handleUpdOpenBlock(el_conf.id) }
          />
          
          <Popover2
            className='bp3-dark'
            popoverClassName={'delete-popoper'}
            content={<div key="text">
              <span>Подтвердите удаление</span>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                <Button small intent='danger' onClick={() => handleDeleteBlock(el_conf.id)} >
                  Удалить
                </Button>
              </div>
            </div>
            }
          >
            <Button intent='danger' small icon='trash'/>
          </Popover2>
        </div>
      </div>

    return {
      Row: <Row style={{ border: '1px solid #ffcfcf', padding: '3px', marginBottom: '2px' }} {...params}>
          {headerBlock('Row')}
          {child_render}
        </Row>,
      Col: <Col style={{
            border: '1px solid rgb(83 171 185)',
            padding: '3px',
            marginTop: '7px'
          }}
          className={el_conf.classes} {...params}
        >
          {headerBlock('Col')}
          {child_render}
        </Col>,
      Div: <div className={el_conf.classes} {...params}>
          {headerBlock('Div')}
          {child_render}
        </div>,
    }[el_conf.type]
  };

  const GSwitcher = ({ el_conf, orderBy_prev }) => {
    return {
      block: <>
        <GBlock el_conf={el_conf}/>
        {button_plus(parent, orderBy_prev)}
      </>,
      // select: <GSelect el_conf={el_conf} />
    }[el_conf.element] || <> Компонент {el_conf.element} недоступен </>
  };

  let _config = config.filter( _ => _.parent === parent).sort((a, b) => a.orderBy - b.orderBy);

  if(_config.length > 0) {
    return <>
      {_config.map((el, i) => {
        return <GSwitcher
          key={nanoid()}
          el_conf={el}
          orderBy_prev={el.orderBy}
          last={_config.length === i+1}
        />
      })}
    </>
  } else return <span>
      empty {parent}
      {button_plus(parent, null)}
    </span>
};

export default Creator;
