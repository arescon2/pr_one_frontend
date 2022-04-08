import DicOrganizations from "./dicOrganizations";

import _ from 'lodash';
import DicPosts from "./dicPosts";

const SelectApi = ({ type, value, onChange, initial }) => {

  value = _.isObject(value) ? value.id : value;
  
  switch (type) {
    case 'organization':
      return <DicOrganizations value={value} onChange={onChange} initial={initial} />
    case 'posts':
      return <DicPosts value={value} onChange={onChange} initial={initial} />
    default:
      break;
  }

  return 'select';
}

export default SelectApi;