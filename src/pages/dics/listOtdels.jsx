import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useSelector } from "react-redux";

import _ from 'lodash';

import { Post, Put } from "../../features/api";
import SelectApi from "../../features/comps/selectApi";
import ListFieldsForDicApp from "./listFields";

const ListOtdelsForDicApp = ({ list = [], organization, setRefresh }) => {
  const [employeeForm] = useForm();

  const user = useSelector(state => state.main.user);

  const isDevelop = user.roles.some( uRole => _.includes('DEVELOP', uRole.name));
  const isMyOrg = (user.person.organization.uid === organization.uid);

  const [idOtdel, setIdOtdel] = useState(null);
  const [employee, setEmployee] = useState({});

  const handleCloseModal = () => {
    setIdOtdel(null);
    setEmployee({})
    employeeForm.resetFields();
  }

  const handleUpdPerson = (id_otdel, person) => {
    setEmployee(person);
    setIdOtdel(id_otdel);
    employeeForm.resetFields();
  }

  const handleOk = () => {
    const values = employeeForm.getFieldsValue();

    values.otdel = idOtdel;

    if (employee.id) {
      Put('/employes?id=' + employee.id, values).then((res) => {
        message.success('Сотрудник обновлен');
        setRefresh(true);
        handleCloseModal();
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    } else {
      Post('/employes', values).then((res) => {
        message.success('Сотрудник добавлен');
        setRefresh(true);
        handleCloseModal();
      }).catch(error => {
        message.error('Ошибка: ' + error.message)
      });
    }
  }

  return <>
    {
      list.map((otdel) => {
        return <Row key={nanoid()} style={{ margin: '0 5px' }} justify="center">
          <Col span={24} >
            <p></p>
            <span style={{ marginLeft: '15px', textDecoration: 'underline' }}>{otdel.name}</span>
            {
              isDevelop || isMyOrg ?
                <Button style={{ float: 'right' }} size='small' type='primary' onClick={() => setIdOtdel(otdel.id)}>Добавить сотрудника</Button>
                : null
            }
          </Col>
          <Col span={24}>
            <ListFieldsForDicApp organization={organization} list={otdel.fields} handleUpdPerson={handleUpdPerson} id_otdel={otdel.id} />
          </Col>
        </Row>
      })
    }
    <Modal
      title='Сотрудник отдела'
      visible={idOtdel ? true : false}
      onCancel={handleCloseModal}
      onOk={handleOk}
      footer={<>
        <Button type='primary' onClick={handleOk}>Сохранить</Button>
        <Button onClick={handleCloseModal}>Отменить</Button>
      </>}
    >
      <Row>
        <Col span={24}>
          <Form
            form={employeeForm}
            initialValues={employee}
            name='employeeForm'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
              <Form.Item
                name='fam'
                label='Фамилия'
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='im'
                label='Имя'
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='otch'
                label='Отчество'
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='position'
                label='Должность'
                required
              >
                <SelectApi type='posts' />
              </Form.Item>
              <Form.Item
                name='mobile'
                label='Мобильный телефон'
                extra='Ввод без кода страны. Пример: 9133333333'
                rules={[
                  {
                    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: 'Есть символы не соответствующие мобильному номеру'
                  }
                ]}
                required
              >
                <Input type='tel' maxLength={10} />
              </Form.Item>
              <Form.Item
                name='worktel'
                label='Рабочий телефон'
                extra='Ввод без кода страны. Пример: 9133333333'
                rules={[
                  {
                    pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                    message: 'Есть символы не соответствующие мобильному номеру'
                  }
                ]}
                required
              >
                <Input type='tel' maxLength={10} />
              </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  </>
}

export default ListOtdelsForDicApp;