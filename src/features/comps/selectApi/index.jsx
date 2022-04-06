import DicOrganizations from "./dicOrganizations";

import _ from 'lodash';
import DicPosts from "./dicPosts";

const SelectApi = ({ type, value, onChange }) => {

  value = _.isObject(value) ? value.id : value;
  
  switch (type) {
    case 'organization':
      return <DicOrganizations value={value} onChange={onChange} />
    case 'posts':
      return <DicPosts value={value} onChange={onChange} />
    default:
      break;
  }

  return 'select';
}

export default SelectApi;