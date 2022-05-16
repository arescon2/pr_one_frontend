import { Button, Col, Collapse, Form, Row } from "antd";


const FiltersTickets = ({ handleClear, handleSearch }) => {
  const [filterForm] = Form.useForm();

  return <Col span={24}>
    <Collapse ghost >
      <Collapse.Panel key='filters' header='Фильтры'>
        <Form
          form={filterForm}
          onFinish={handleSearch}
          name='filter-form'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          size='small'
        >
          <Row gutter={12}>
            {/* <Col span={12}>
              <Form.Item
                label="Организация"
                name="organization"
              >
                <Input onChange={handleChangeOrg} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Моя организация"
                name="myorg"
                valuePropName="checked"
              >
                <Switch onChange={handleChangeMyOrg} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="ФИО"
                name="fio"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Должности"
                name="position"
              >
                <SelectApi type='posts' initial />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Button type='primary' size='small' htmlType="submit">Поиск</Button>
              <Button type='default' size='small' onClick={handleClear}>Очистить</Button>
            </Col>
          </Row>
        </Form>
      </Collapse.Panel>
    </Collapse>
  </Col>
};

export default FiltersTickets;