import { Button, Col, Collapse, Form, Input, Layout, PageHeader, Row, Switch, Typography } from "antd";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Delete, Get } from '../../features/api';
import ListOrgsForDicApp from "./listOrgs";

import _ from 'lodash';
import SelectApi from "../../features/comps/selectApi";

const DicsApp = () => {
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);

  const [filterForm] = Form.useForm();

  useEffect(() => {
    if (refresh) {
      let filters = filterForm.getFieldsValue();
      filters = _.omitBy(filters, _.isNil)
      Get('/employes?filters=' + JSON.stringify(filters)).then((result) => {
        setList(result.data.data[0])
        setCount(result.data.data[1])
      }).finally(() => setRefresh(false))
    }
  }, [refresh]);

  const handleSearch = (values) => {
    setRefresh(true);
  }

  const handleClear = () => {
    filterForm.resetFields();
    setRefresh(true);
  }

  const handleChangeOrg = (ev) => {
    const values = filterForm.getFieldsValue();
    console.log(values)
    filterForm.setFieldsValue({
      organization: ev.target.value,
      myorg: undefined
    });
  }

  const handleChangeMyOrg = (value) => {
    if (value) {
      filterForm.setFieldsValue({
        organization: undefined,
        myorg: value
      });
    }
  }

  return <Layout className='wrapper'>
    <Typography.Title level={4}></Typography.Title>
    <PageHeader
      ghost={false}
      style={{ padding: 0 }}
      title="Справочник контактов"
    />
    <Row style={{ marginBottom: '10px' }}>
      <Col span={24}>
        <Collapse >
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
                <Col span={12}>
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
                </Col>
                <Col span={24}>
                  <Button type='primary' size='small' htmlType="submit">Поиск</Button>
                  <Button type='default' size='small' onClick={handleClear}>Очистить</Button>
                </Col>
              </Row>
            </Form>
          </Collapse.Panel>
        </Collapse>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <ListOrgsForDicApp list={list} setRefresh={setRefresh} />
      </Col>
    </Row>
  </Layout>
};

export default DicsApp;