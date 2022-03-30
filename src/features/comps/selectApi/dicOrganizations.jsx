import { Button, Card, Divider, Input, List, Modal, Tooltip, Typography } from "antd";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Get } from "../../api";

const { Search } = Input;

const DicOrganizations = ({ value, onChange }) => {
  const [ dataList, setDataList ] = useState([]);
  const [ count, setCount ] = useState(0);
  
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ loadingSearch, setLoadingSearch ] = useState(false);

  const [ selected, setSelected ] = useState({});

  const onOpen = () => setIsOpenModal(true);

  const onCloseModal = () => setIsOpenModal(false);

  const getData = (first = false, text) => {
    let url = '/organization?filters=';
      url += first ? JSON.stringify({ id: value }) : JSON.stringify({ name: text })
    Get(url).then((res) => {
      if (first) {
        setSelected(res.data.data[0])
      } else {
        setDataList(res.data.data);
        setCount(res.data.count);
      }
      setLoadingSearch(false);
    });
  }

  const handlerSearch = (textSearch) => {
    setLoadingSearch(true);
    getData(false, textSearch);
  }

  const handleChange = (value) => {
    setSelected(value);
    onChange(value.id);
    setIsOpenModal(false);
  }

  useEffect(() => {
    value ? getData(true) : null;
  }, [value])

  
  return <>
    <Tooltip placement='bottomLeft' title={selected.name}>
      <Search onSearch={onOpen} value={selected.short} placeholder="input search loading with enterButton" />
    </Tooltip>
    <Modal title="Выбор организации" visible={isOpenModal} onCancel={onCloseModal} footer={false}>
      <label>Введите название организации</label>
      <Search
        enterButton="Поиск"
        placeholder="Введите название организации"
        loading={loadingSearch}
        readOnly={loadingSearch}
        onSearch={handlerSearch}
      />
      <Card bodyStyle={{ height: '240px', overflow: 'scroll' }} title={`Найдено: ${count}`}>
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={dataList}
          renderItem={item => {
            return <Tooltip key={nanoid()} placement='bottomLeft' title={selected.name}>
              <List.Item className="item-select-dic" onClick={() => handleChange(item)}>
                {item.id} - {item.short}
              </List.Item>
            </Tooltip>
          }}
        />
      </Card>
    </Modal>
  </>
}

export default DicOrganizations;