import { Divider, Form, Input } from "antd";
import SelectApi from "../../features/comps/selectApi";


const EmployeeOne = ({ formName, employee, organization }) => {
  return <Form
    form={formName}
    initialValues={employee}
    name={formName}
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
    <Divider />
    <Form.Item
      name='otdel'
      label='Отдел'
      required
    >
      <SelectApi type='otdels' organization={organization} />
    </Form.Item>
  </Form>
}

export default EmployeeOne;