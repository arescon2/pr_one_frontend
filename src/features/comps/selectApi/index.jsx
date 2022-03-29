import { useEffect } from "react";
import { Get } from "../../api";
import DicOrganizations from "./dicOrganizations";

import _ from 'lodash';

const SelectApi = ({ type, value, onChange }) => {

  value = _.isObject(value) ? value.id : value;
  
  switch (type) {
    case 'organization':
      return <DicOrganizations value={value} onChange={onChange} />
    default:
      break;
  }

  return 'select';
}

export default SelectApi;