import React from "react";
import { withRouter } from "react-router-dom";
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
  Upload,
  Modal,
  Spin,
  PageHeader,
  message
} from "antd";
const { TextArea } = Input;
const { Option } = Select;
let idk = 0,
  ids = 0,
  idu = 0,
  idp = 0,
  idc = 0;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    subtypes: undefined,
    desc: "",
    size: "",
    spin: { tip: "Loading", loading: false },
    priceUnit: "npl",
    fileList: [],
    uploading: false,
    previewVisible: false,
    previewImage: ""
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
    // can use data-binding to get
    const keys = form.getFieldValue("pkeys");
    // We need at least one passenger
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

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let parsed = await this.parsePayload(values);
        this.setState({ spin: { tip: "Uploading", loading: true } });
        Call.add(parsed)
          .then(d => {
            this.setState({ spin: { tip: "Uploading", loading: false } });
            this.props.history.push("/product");
          })
          .catch(error => {
            this.setState({ spin: { tip: "Uploading", loading: false } });
            message.error(error.message);
          });
      }
      if (err) {
        message.error("Fill all fields");
      }
    });
  }

  parsePayload = payload => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("c");
    payload.sub_type = id;
    let prices = [];
    let p_discounts = payload.p_discounts;
    if (p_discounts && p_discounts.length) {
      p_discounts.map((e, i) => {
        prices.push({
          discount: parseInt(e),
          qty: parseInt(payload.p_qtys[i]),
          label: payload.p_labels[i]
        });
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
      let features = [];
      for (let f of payload.f_values) {
        if (f && f.trim().length) {
          features.push(f);
        }
      }
      payload.features = features;
      delete payload.f_values;
      delete payload.f_ranks;
    }

    let specs = [];
    if (payload.s_names && payload.s_names.length) {
      payload.s_names.map((e, i) => {
        if (e && e.length)
          specs.push({ key: e, value: payload.s_values[i], rank: parseInt(payload.s_ranks[i]) });
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
          units.push({
            name: e,
            value: parseInt(payload.u_values[i]),
            standard: payload.u_standards[i]
          });
      });

      payload.units = units;
      delete payload.u_names;
      delete payload.u_values;
      delete payload.u_standards;
    }

    if (payload.profile.length && payload.files.length) {
      let pf = payload.profile[0];
      if (payload.files.indexOf(pf) < 0) {
        payload.files.unshift(pf);
        delete payload.profile;
      }
    }

    if (payload.tags && payload.tags.length) {
      payload.tags = payload.tags.split(",").map(item => item.trim());
    }

    return payload;
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

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
    getFieldDecorator("fkeys", { initialValue: [] });
    const fkeys = getFieldValue("fkeys");

    getFieldDecorator("skeys", { initialValue: [] });
    const skeys = getFieldValue("skeys");

    getFieldDecorator("ukeys", { initialValue: [] });
    const ukeys = getFieldValue("ukeys");

    getFieldDecorator("pkeys", { initialValue: [] });
    const pkeys = getFieldValue("pkeys");

    getFieldDecorator("ckeys", { initialValue: [] });
    const ckeys = getFieldValue("ckeys");

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
        <Col span={10}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
          >
            {getFieldDecorator(`f_values[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input feature value"
                }
              ]
            })(<Input placeholder="Feature value" style={{ width: "100%", marginRight: 8 }} />)}
            {fkeys.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.removeF(k)}
              />
            ) : null}
          </Form.Item>
        </Col>
        <Col span={5}>
          <Form.Item
            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
            label={index === 0 ? "" : ""}
            required={false}
            key={k}
            style={{ width: "100%" }}
          >
            {getFieldDecorator(`f_ranks[${k}]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input feature rank"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input specification name"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input specification value"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input specification rank"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Unit name"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Unit value"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Unit Standard"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Discount in percent"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Quantity"
                }
              ]
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
              validateTrigger: ["onChange", "onBlur"],
              rules: [
                {
                  required: true,
                  whitespace: true,
                  message: "Please input Label name"
                }
              ]
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

    const { fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };

    const { previewVisible, previewImage } = this.state;

    return (
      <>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          onBack={() => {
            this.props.history.goBack();
          }}
          title="Go Back"
          subTitle=""
        />
        <Spin tip={this.state.spin.tip} spinning={this.state.spin.loading}>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form col-md-8 col-xs-11 col-sm-10 col-lg-8"
          >
            <Form.Item>
              {getFieldDecorator("name", {
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
                    initialValue: true
                  })(<Checkbox>Product Available</Checkbox>)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  {getFieldDecorator("is_discount", {
                    valuePropName: "checked",
                    initialValue: false
                  })(<Checkbox>Discount Available</Checkbox>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[8, 8]}>
              <Col span={8}>
                <Form.Item hasFeedback>
                  {getFieldDecorator("priceUnit", {
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
                    rules: [{ required: true, message: "Please provide product Price!" }]
                  })(<InputNumber min={1} style={{ width: "100%" }} placeholder="Price" />)}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator("discount", {
                    rules: [{ required: true, message: "Please provide product Discount!" }]
                  })(
                    <InputNumber
                      style={{ width: "100%" }}
                      min={1}
                      placeholder="Discount in percent"
                    />
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
                    rules: [
                      { required: true, message: "Please provide minimum product required to buy!" }
                    ]
                  })(
                    <InputNumber min={1} style={{ width: "100%" }} placeholder="Minimum required" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  {getFieldDecorator("max", {
                    rules: [
                      {
                        required: false,
                        message: "Please provide maximum product required to buy!"
                      }
                    ]
                  })(
                    <InputNumber min={2} style={{ width: "100%" }} placeholder="Maximum product" />
                  )}
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
              {getFieldDecorator(
                "tags",
                {}
              )(
                <Input
                  prefix={<Icon type="tags" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Product tags"
                />
              )}
            </Form.Item>

            <Form.Item label="Profile">
              {getFieldDecorator("profile", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload.Dragger
                  name="profile"
                  {...props}
                  listType="picture-card"
                  onPreview={this.handlePreview}
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single only.</p>
                </Upload.Dragger>
              )}
              {
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: "100%" }} src={previewImage} />
                </Modal>
              }
            </Form.Item>

            <Form.Item label="Files">
              {getFieldDecorator("files", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload {...props} listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                className="login-form-button"
              >
                Add
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </>
    );
  }
}

export default withRouter(Form.create({ name: "add_product" })(AddProduct));
