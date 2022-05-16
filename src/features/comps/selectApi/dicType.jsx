import { Select } from "antd";
import { useEffect, useState } from "react";
import { Get } from "../../api";

const { Option } = Select;

const DicTypeTicket = ({ value, onChange }) => {

  const [list, setList] = useState([]);

  const handleSelect = (selectedId) => {
    onChange(selectedId)
  }

  useEffect(() => {
    Get('/dicstickets/type').then((res) => {
      setList(res.data.data);
    })
  }, []);

  return <Select
    // showSearch
    defaultValue={value || null}
    onSelect={handleSelect}
  >
    { list.map(el => {
      return <Option value={el.id}>{el.name}</Option>
    }) }
  </Select>
}

export default DicTypeTicket;