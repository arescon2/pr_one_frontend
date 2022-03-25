import { useEffect } from "react";
import { Get } from "../../api";
import DicOrganizations from "./dicOrganizations";


const SelectApi = ({ type, value, onChange }) => {
  
  switch (type) {
    case 'organization':
        return <DicOrganizations value={value} onChange={onChange} />
      break;
  
    default:
      break;
  }

  return 'select';
}

export default SelectApi;