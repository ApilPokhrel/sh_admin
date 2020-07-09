import React from "react";
import { Call } from "./Services";
import {
  Form,
  Icon,
  Input,
  Button,
  Select,
  InputNumber,
  Row,
  Col,
  Checkbox,
  Radio,
  message,
  Spin
} from "antd";
const { TextArea } = Input;
const { Option } = Select;
let idk = 0,
  ids = 0,
  idu = 0,
  idp = 0,
  idc = 0;



class EditProductDetail extends React.Component {
  state = {
    subtypes: undefined,
    desc: "",
    size: "",
    priceUnit: "npl",
    loading: false,
    id: ""
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  removeC = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("ckeys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      ckeys: keys.filter(key => key !== k)
    });
  };

  removeP = k => {
    const { form } = this.props;
    const keys = form.getFieldValue("pkeys");
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      pkeys: keys.filter(key => key !== k)
    });
  };

  removeF = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("fkeys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      fkeys: keys.filter(key => key !== k)
    });
  };

  removeS = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("skeys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      skeys: keys.filter(key => key !== k)
    });
  };

  removeU = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("ukeys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      ukeys: keys.filter(key => key !== k)
    });
  };

  addC = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("ckeys");
    const nextKeys = keys.concat(idc++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      ckeys: nextKeys
    });
  };

  addP = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("pkeys");
    const nextKeys = keys.concat(idp++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      pkeys: nextKeys
    });
  };

  addF = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("fkeys");
    const nextKeys = keys.concat(idk++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      fkeys: nextKeys
    });
  };

  addS = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("skeys");
    const nextKeys = keys.concat(ids++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      skeys: nextKeys
    });
  };

  addU = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("ukeys");
    const nextKeys = keys.concat(idu++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      ukeys: nextKeys
    });
  };

  normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        let parsed = await this.parsePayload(values);
        console.log("Parsed values ", parsed);
        Call.update(this.props._id, parsed).then(d => {
          this.setState({ loading: false, product: d.data })
        }).catch(error => {
          this.setState({ loading: false })
          message.error(error.message)
        });
      }
    });
  };

  parsePayload = (payload) => {
    let prices = [];
    let p_discounts = payload.p_discounts;
    if (p_discounts && p_discounts.length) {
      p_discounts.map((e, i) => {
        if (e)
          prices.push({ discount: e, qty: payload.qtys[i], label: payload.labels[i] });
      });
      payload.prices = prices;
      delete payload.p_discounts;
      delete payload.p_qtys;
      delete payload.p_labels;
    }

    let colors = [];
    if (payload.c_names && payload.c_names.length) {
      payload.c_names.map((e, i) => {
        colors.push({ name: e, value: payload.c_values[i] });
      });
      payload.colors = colors;
      delete payload.c_names;
      delete payload.c_values;
    }

    if (payload.f_values && payload.f_values.length) {
      payload.features = payload.f_values;
      delete payload.f_values;
      delete payload.f_ranks;
    }

    let specs = [];
    if (payload.s_names && payload.s_names.length) {
      payload.s_names.map((e, i) => {
        if (e && e.length)
          specs.push({ key: e, value: payload.s_values[i], rank: payload.s_ranks[i] });
      });

      payload.specs = specs;
      delete payload.s_names;
      delete payload.s_values;
      delete payload.s_ranks;
    }

    let units = [];
    if (payload.u_names && payload.u_names.length) {
      payload.u_names.map((e, i) => {
        if (e && e.length)
          units.push({ name: e, value: payload.u_values[i], standard: payload.u_standards[i] });
      });

      payload.units = units;
      delete payload.u_names;
      delete payload.u_values;
      delete payload.u_standards;
    }

    if (payload.tags && payload.tags.length) {
      payload.tags = payload.tags.split(",").map(item => item.trim());
    }

    return payload;

  }


  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator("fkeys", { initialValue: this.props.product.features });
    const fkeys = getFieldValue("fkeys");

    getFieldDecorator("skeys", { initialValue: this.props.product.specs });
    const skeys = getFieldValue("skeys");

    getFieldDecorator("ukeys", { initialValue: this.props.product.units });
    const ukeys = getFieldValue("ukeys");

    getFieldDecorator("pkeys", { initialValue: this.props.product.prices });
    const pkeys = getFieldValue("pkeys");

    getFieldDecorator("ckeys", { initialValue: this.props.product.colors });
    const ckeys = getFieldValue("ckeys") || [];

    const colorFormItems = ckeys.map((k, index) => (
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`c_names[${k}]`, {
              initialValue: k.name,

              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Color name"
                }
              ]
            })(<Input placeholder="Color name" style={{ width: "60%", marginRight: 8 }} />)}
            {ckeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeC(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`c_values[${k}]`, {
              initialValue: k.value,

              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Color value"
                }
              ]
            })(<Input placeholder="Color value" style={{ width: "60%", marginRight: 8 }} />)}
            {ckeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeC(k)}
              />
            ) : null}
          </Form.Item>
        </Col>

      </Row>
    ));

    const featureFormItems = fkeys.map((k, index) => (
      <Row gutter={[16, 16]}>
        <Col span={15}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}

          >
            {getFieldDecorator(`f_values[${k}]`, {
              initialValue: k,
              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Feature value" style={{ width: "100%", marginRight: 2 }} />)}
            {fkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeF(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
            style={{ width: "100%" }}
          >
            {getFieldDecorator(`f_ranks[${k}]`, {
              initialValue: 1,
              validateTrigger: ["onChange", "onBlur"],

            })(<InputNumber placeholder="Feature Rank" style={{ width: "60%", marginRight: 8 }} />)}
            {fkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeF(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    ));

    const specFormItems = skeys.map((k, index) => (
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`s_names[${k}]`, {
              initialValue: k.key,
              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Spec name" style={{ width: "60%", marginRight: 8 }} />)}
            {skeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeS(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`s_values[${k}]`, {
              initialValue: k.value,

              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Spec value" style={{ width: "60%", marginRight: 8 }} />)}
            {skeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeS(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`s_ranks[${k}]`, {
              initialValue: k.rank,
              validateTrigger: ["onChange", "onBlur"],

            })(<InputNumber placeholder="Spec Rank" style={{ width: "60%", marginRight: 8 }} />)}
            {skeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeS(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    ));

    const unitFormItems = ukeys.map((k, index) => (
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Units" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`u_names[${k}]`, {
              initialValue: k.name,
              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Unit name" style={{ width: "60%", marginRight: 8 }} />)}
            {ukeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeU(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Units" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`u_values[${k}]`, {
              initialValue: k.value,

              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Unit value" style={{ width: "60%", marginRight: 8 }} />)}
            {ukeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeU(k)}
              />
            ) : null}
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "Units" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`u_standards[${k}]`, {
              initialValue: k.standard,

              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Unit Standard" style={{ width: "60%", marginRight: 8 }} />)}
            {ukeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeU(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    ));

    const pricesFormItems = pkeys.map((k, index) => (
      <Row gutter={[8, 8]}>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`p_discounts[${k}]`, {
              initialValue: k.discount,

              validateTrigger: ["onChange", "onBlur"],

            })(<InputNumber placeholder="Discount" style={{ width: "100%" }} />)}
            {pkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeP(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`p_qtys[${k}]`, {
              initialValue: k.qty,

              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Quantity" style={{ width: "100%" }} />)}
            {pkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeP(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`p_labels[${k}]`, {
              initialValue: k.label,

              validateTrigger: ["onChange", "onBlur"],

            })(<Input placeholder="Label Name" style={{ width: "100%" }} />)}
            {pkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeP(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
      </Row>
    ));


    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form col-md-8 col-xs-11 col-sm-10 col-lg-8"
      >
        <Spin tip="Updating..." spinning={this.state.loading}>

          <Form.Item>
            {getFieldDecorator("name", {
              initialValue: this.props.product.name,

              rules: [{ required: true, message: "Please product name!" }]
            })(
              <Input
                prefix={<Icon type="shop" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Product name"
              />
            )}
          </Form.Item>

          <Form.Item label="Condition">
            {getFieldDecorator("condition", {
              initialValue: this.props.product.condition,

              rules: [{ required: true, message: "Please provide product condition!" }]
            })(
              <Radio.Group>
                <Radio value="new">New</Radio>
                <Radio value="used">Used</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("desc", {
              initialValue: this.props.product.desc,

              rules: [{ required: true, message: "Please provide product Description!" }]
            })(
              <TextArea
                value={this.state.desc}
                onChange={this.onChange}
                placeholder="Description"
                autoSize={{ minRows: 3 }}
              />
            )}
          </Form.Item>

          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("is_available", {
                  valuePropName: "checked",
                  initialValue: this.props.product.is_available,
                })(<Checkbox>Product Available</Checkbox>)}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                {getFieldDecorator("is_discount", {
                  valuePropName: "checked",
                  initialValue: this.props.product.is_discount
                })(<Checkbox>Discount Available</Checkbox>)}
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item hasFeedback>
                {getFieldDecorator("priceUnit", {
                  initialValue: this.props.product.priceUnit,
                  rules: [{ required: true, message: "Please select a price unit!" }]
                })(
                  <Select placeholder="Price unit">
                    <Option value="NPR">Neplese Rupee</Option>
                    <Option value="INR">Indian Rupee</Option>
                    <Option value="USD">US Dollar</Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("price", {
                  initialValue: this.props.product.price,

                  rules: [{ required: true, message: "Please provide product Price!" }]
                })(<InputNumber min={1} style={{ width: "100%" }} placeholder="Price" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("discount", {
                  initialValue: this.props.product.discount,

                  rules: [{ required: true, message: "Please provide product Discount!" }]
                })(
                  <InputNumber style={{ width: "100%" }} min={1} placeholder="Discount in percent" />
                )}
              </Form.Item>
            </Col>
          </Row>

          {pricesFormItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addP} style={{ width: "100%" }}>
              <Icon type="plus" /> Add Wholesale
          </Button>
          </Form.Item>

          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("min", {
                  initialValue: this.props.product.min,

                  rules: [
                    { required: true, message: "Please provide minimum product required to buy!" }
                  ]
                })(<InputNumber min={1} style={{ width: "100%" }} placeholder="Minimum required" />)}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item>
                {getFieldDecorator("max", {
                  initialValue: this.props.product.max,

                  rules: [
                    { required: false, message: "Please provide maximum product required to buy!" }
                  ]
                })(<InputNumber min={2} style={{ width: "100%" }} placeholder="Maximum product" />)}
              </Form.Item>
            </Col>
          </Row>



          {colorFormItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addC} style={{ width: "100%" }}>
              <Icon type="plus" /> Add Colors
          </Button>
          </Form.Item>

          {featureFormItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addF} style={{ width: "100%" }}>
              <Icon type="plus" /> Add features
          </Button>
          </Form.Item>

          {specFormItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addS} style={{ width: "100%" }}>
              <Icon type="plus" /> Add Specs
          </Button>
          </Form.Item>
          {unitFormItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.addU} style={{ width: "100%" }}>
              <Icon type="plus" /> Add Units
          </Button>
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("tags",
              {
                initialValue: this.props.product.tags ? this.props.product.tags.toString() : "",
              })(
                <Input
                  prefix={<Icon type="tags" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Product tags"
                />
              )}
          </Form.Item>


          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              className="login-form-button"
            >
              Update
          </Button>
          </Form.Item>
        </Spin>
      </Form>
    );
  }
}

EditProductDetail.defaultProps = {
  product: {
    features: [],
    specs: [],
    prices: [],
    units: [],
    colors: [],
    tags: ""
  }
}

export default Form.create({ name: "edit_product_detail" })(EditProductDetail);
