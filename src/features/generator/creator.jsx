import { useEffect, useState } from 'react';

import { Row, Col, Button, Modal, Popconfirm, Divider, Input } from 'antd';

import { toast } from 'react-toastify';

import { nanoid } from 'nanoid';

import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const blocks = {
  Row: {
    id: null,
    orderBy: 1,
    element: 'block',
    type: 'Row',
    parent: 'root'
  },
  Input: {
    id: null,
    orderBy: 1,
    element: 'input',
    type: 'text'
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

const Creator = ({ config, onUpdate }) => {
  const [ loading, setLoading ] = useState(true);
  const [ localConfig, setConfig ] = useState([]);

  useEffect(() => {
    setConfig(config);
  }, [])

  const handleSetConfig = (new_state) => {
    setLoading(false);
    setConfig(new_state);
    setLoading(true);
  }

  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const [ newBlock, setNewBlock ] = useState({});
  const [ newBlockParent, setNewBlockParent ] = useState({
    parent: 'root',
    orderBy_prev: null
  });

  const handleAddBlock = (block, upd = false) => {
    // id_prev - id prev block OR null, id пред-го блока
    // upd - true/false, блок редактируется

    let _config = [...localConfig];
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

    let parentBlock = localConfig.find( el => el.id === newBlockParent.parent);

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
        {
          type: 'Input',
          group: 'Form',
          visible: ['Col']
        }
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
            <Col md={12} key={nanoid()} >
              {
                _arrayButtons.filter( button => button.group == group)
                  .map(button => {
                    return <Button
                      key={nanoid()}
                      ghost
                      type='primary'
                      onClick={()=>handleAdd(button.type)}
                      style={{ marginRight: '5px' }}
                    >{button.type}</Button>
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
        config={localConfig}
        setConfig={(_) => handleSetConfig(_) }
        handlePlusButton={handlePlusButton}
        handleUpdOpenBlock={handleUpdOpenBlock}
      />
      <Modal
        visible={isOpenDialog}
        onCancel={handleCloseDialog}
        title={'Добавление блока, ' + newBlockParent.parent}
        footer={false}
      >
        <div style={{ marginTop: '10px' }} />
        { isOpenDialog ? renderButtons() : null}
      </Modal>
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

  let button_plus = (parent, orderBy_prev, type) => {    
    return <div className={`creator-button-block type-block-${type}`}>
      <Button
        onClick={() => handlePlusButton(parent, orderBy_prev) }
        className='creator-plus-button'
        type='primary'
        size='small'
      >+</Button>
    </div>
  }

  const GBlock = ({ el_conf, parent, orderBy_prev }) => {
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
            type='primary' size='small' icon={<FontAwesomeIcon icon='cog' />}
            onClick={() => handleUpdOpenBlock(el_conf.id) }
          />
          <Popconfirm
            title="Подтвердите удаление"
            onConfirm={() => handleDeleteBlock(el_conf.id)}
            okText="Да"
          >
            <Button size='small' type='primary' danger icon={<FontAwesomeIcon icon='trash' />} ></Button>
          </Popconfirm>
        </div>
      </div>

    return {
      Row: <>
          <Row style={{ border: '1px solid #ffcfcf', padding: '3px', marginBottom: '2px' }} {...params}>
            {headerBlock('Row')}
            {child_render}
          </Row>
          {button_plus(parent, orderBy_prev, 'Row')}
        </>,
      Col: <>
          <Col style={{
              border: '1px solid rgb(83 171 185)',
              padding: '3px',
              marginTop: '7px'
            }}
            className={el_conf.classes} {...params}
          >
            {headerBlock('Col')}
            {child_render}
          </Col>
          {button_plus(parent, orderBy_prev, 'Col')}
        </>,
      Div: <>
          <div className={el_conf.classes} {...params}>
            {headerBlock('Div')}
            {child_render}
          </div>
          {button_plus(parent, orderBy_prev, 'Div')}
        </>,
    }[el_conf.type]
  };

  const GInput = ({ el_conf }) => {

    return <Input></Input>
  };

  const GSwitcher = ({ el_conf, orderBy_prev }) => {
    return {
      block: <>
        <GBlock el_conf={el_conf} parent={parent} orderBy_prev= {orderBy_prev}/>
      </>,
      input: <>
        <GInput el_conf={el_conf}/>
      </>
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
