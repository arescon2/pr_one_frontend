import { useEffect, useState } from "react";

const RolesAccaunt = () => {

  const [roles, setRoles] = useState([])

  const getData = () => {
    return []
  }

  useEffect(() => {
    getData();
  }, [])
  return 'roles';
}

export default RolesAccaunt;