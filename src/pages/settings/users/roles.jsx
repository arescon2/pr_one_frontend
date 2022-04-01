import { Button, Card, Col, message, Row, Switch } from "antd";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Get, Put } from "../../../features/api";

const RolesAccaunt = ({ accaunt }) => {

  const [roles, setRoles] = useState([])
  const [personRoles, setPersonRoles] = useState(accaunt.roles)

  const getRoles = () => {
    Get(`/role`).then((res) => {
      setRoles(res.data.data);
    });
  };

  const onSetRole = (role) => {
    let newRoles = [...personRoles];
    if (personRoles.find(el => el.name === role.name)) {
      newRoles = newRoles.filter(el => el.name !== role.name);
    } else {
      newRoles.push({
        id: role.id,
        name: role.name,
        title: role.title,
      });
    }
    setPersonRoles(newRoles);
  }

  const handleSaveRoles = () => {
    Put(`/accaunt?id=${accaunt.id}`, {
      roles: personRoles
    }).then((res) => {
      message.success('Роли сохранены');
    });
  }

  useEffect(() => {
    getRoles();
  }, []);

  return <Row>
    {
      roles.map((role) => {
        return <Col key={nanoid()} span={24}>
          <Card size="small">
            <Switch checked={personRoles.find(el => el.name === role.name)} onChange={()=>onSetRole(role)} />
            {role.name}
          </Card>
        </Col>
      })
    }
    <Col span={24}>
      <Button type="primary" onClick={handleSaveRoles}>
        Сохранить
      </Button>
    </Col>
  </Row>;
}

export default RolesAccaunt;
