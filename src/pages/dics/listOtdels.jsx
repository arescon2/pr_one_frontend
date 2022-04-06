import { Button, Col, Form, Input, message, Modal, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Post } from "../../features/api";
import SelectApi from "../../features/comps/selectApi";
import ListFieldsForDicApp from "./listFields";

const ListOtdelsForDicApp = ({ list = [] }, setRefresh) => {
  const [employeeForm] = useForm();

  const [idOtdel, setIdOtdel] = useState(null);
  const [employee, setEmployee] = useState({});

  const handleCloseModal = () => {
    setIdOtdel(null);
    employeeForm.resetFields();
  }

  const handleOk = () => {
    const values = employeeForm.getFieldsValue();

    Post('/employee', values).then((res) => {
      message.success('Сотрудник добавлен');
      handleCloseModal();
    }).catch(error => {
      message.error('Ошибка: ' + error.message)
    });
  }

  return <>
    {
      list.map((otdel) => {
        return <Row key={nanoid()} justify="center">
          <Col span={24} >
            <p style={{ textAlign: 'center', textDecoration: 'underline' }}>{otdel.name}</p>
            <Button style={{ float: 'right' }} size='small' type='primary' onClick={() => setIdOtdel(otdel.id)}>Добавить сотрудника</Button>
          </Col>
          <Col span={24}>
            <ListFieldsForDicApp list={otdel.fields} />
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
                name='fio'
                label='ФИО'
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='post'
                label='Должность'
                required
              >
                <SelectApi type='posts' />
              </Form.Item>
              <Form.Item
                name='phone'
                label='Мобильный телефон'
                required
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='workphone'
                label='Рабочий телефон'
                required
              >
                <Input />
              </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  </>
}

export default ListOtdelsForDicApp;