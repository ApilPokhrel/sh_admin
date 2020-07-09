import React from "react";
import { Form, Input, Button, Checkbox, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import Api from "../../services/ApiService";
import { apiRoutes } from "./Services";

class Register extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.doRegister(values);
      }
    });
  };

  doRegister(payload) {
    Api(apiRoutes.register, payload)
      .then(d => {
        window.location.href = "/login";
      })
      .catch(e => {
        message.error(e.message);
      });
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Row type="flex" align="middle" style={{ height: "100%" }}>
        <Col style={{ left: "50%", top: "-10%", transform: "translate(-50%, 15%)" }}>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="name">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Phone">
              {getFieldDecorator("phone", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Phone no!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="E-mail">
              {getFieldDecorator("email", {
                rules: [
                  {
                    type: "email",
                    message: "The input is not valid E-mail!"
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!"
                  }
                ]
              })(<Input />)}
            </Form.Item>



            <Form.Item label="Password" hasFeedback>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your password!"
                  },
                  {
                    validator: this.validateToNextPassword
                  }
                ]
              })(<Input.Password />)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator("confirm", {
                rules: [
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  {
                    validator: this.compareToFirstPassword
                  }
                ]
              })(<Input.Password onBlur={this.handleConfirmBlur} />)}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator("agreement", {
                rules: [
                  {
                    required: true,
                    message: "Must read agreement!"
                  }
                ],
                valuePropName: "checked"
              })(
                <Checkbox>
                  I have read the <Link to="/">agreement</Link>
                </Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegisterForm = Form.create({ name: "register_form" })(Register);
export default WrappedRegisterForm;
