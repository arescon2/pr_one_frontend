import _ from 'lodash';

import DicOrganizations from "./dicOrganizations";
import DicPosts from "./dicPosts";
import DicOtdels from "./dicOtdels";

const SelectApi = ({ type, value, onChange, initial, organization }) => {

  value = _.isObject(value) ? value.id : value;
  
  switch (type) {
    case 'organization':
      return <DicOrganizations value={value} onChange={onChange} initial={initial} />
    case 'posts':
      return <DicPosts value={value} onChange={onChange} initial={initial} />
    case 'otdels':
      return <DicOtdels value={value} organization={organization} onChange={onChange} initial={initial} />
    default:
      break;
  }

  return 'select';
}

export default SelectApi;