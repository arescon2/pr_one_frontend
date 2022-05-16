import { Select } from "antd";
import { useEffect, useState } from "react";
import { Get } from "../../api";

const { Option } = Select;

const DicCategory = ({ value, onChange }) => {

  const [list, setList] = useState([]);

  useEffect(() => {
    Get('/dicstickets/category').then((res) => {
      setList(res.data.data);
    })
  }, []);

  return <Select
    // showSearch
  >
    { list.map(el => {
      return <Option value={el.id}>{el.name}</Option>
    }) }
  </Select>
}

export default DicCategory;