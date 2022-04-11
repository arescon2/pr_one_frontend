import { Button, Card, Divider, Input, List, Modal, Tooltip, Typography } from "antd";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Get, Post } from "../../api";

const { Search } = Input;

const DicPosts = ({ value, onChange, initial = false }) => {
  const [ dataList, setDataList ] = useState([]);
  const [ count, setCount ] = useState(0);
  
  const [ isOpenModal, setIsOpenModal ] = useState(false);
  const [ loadingSearch, setLoadingSearch ] = useState(false);

  const [ selected, setSelected ] = useState({});

  const onOpen = () => setIsOpenModal(true);

  const onCloseModal = () => setIsOpenModal(false);

  const getData = (first = false, text) => {
    let url = '/posts?filters=';
    url += (first && value) ? JSON.stringify({ id: value }) : JSON.stringify({ name: text });

    Get(url).then((res) => {
      if (first) setSelected(res.data.data[0])
        else {
          setDataList(res.data.data);
          setCount(res.data.count);
        };
      setLoadingSearch(false);
    });
  }

  const handlerSearch = (textSearch) => {
    setLoadingSearch(true);
    getData(false, textSearch);
  }

  const handlerAddPost = (inputValue) => {
    Post('/posts', { name: inputValue }).then((res) => {
      setSelected(res);
      onChange(res.id);
      setIsOpenModal(false);
    });
  };

  const handleChange = (value) => {
    setSelected(value);
    onChange(value.id);
    setIsOpenModal(false);
  }

  useEffect(() => {
    (value || initial) ? getData(value ? true : false) : null;
  }, [value, initial]);
  
  return <>
    <Tooltip placement='bottomLeft' title={selected.name}>
      <Search onSearch={onOpen} readOnly value={selected.name} placeholder="Выберите должность" />
    </Tooltip>
    <Modal title="Выбор должности" visible={isOpenModal} onCancel={onCloseModal} footer={false}>
      <label>Введите название должности</label>
      <Search
        enterButton="Поиск"
        placeholder="Введите название должности"
        loading={loadingSearch}
        readOnly={loadingSearch}
        onSearch={handlerSearch}
      />
      <label>Если не найдена, добавьте должность</label>
      <Search
        enterButton="Добавить"
        placeholder="Введите название должности"
        onSearch={handlerAddPost}
      />
      <Card bodyStyle={{ height: '240px', overflow: 'scroll' }} title={`Найдено: ${count}`}>
        <List
          itemLayout="horizontal"
          size="small"
          dataSource={dataList}
          renderItem={item => {
            return <Tooltip key={nanoid()} placement='bottomLeft' title={selected.name}>
              <List.Item className="item-select-dic" onClick={() => handleChange(item)}>
                {item.id} - {item.name}
              </List.Item>
            </Tooltip>
          }}
        />
      </Card>
    </Modal>
  </>
}

export default DicPosts;