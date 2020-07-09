import React from "react";
import { Form, Icon, Input, Button, Checkbox, Row, Col, message } from "antd";
import { Link } from "react-router-dom";
import Api from "../../services/ApiService";
import { apiRoutes } from "./Services";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.doLogin(values);
      }
    });
  };

  doLogin(payload) {
    Api(apiRoutes.login, payload)
      .then(d => {
        window.localStorage.setItem("token", d.accessToken);
        window.location.href = "/";
      })
      .catch(e => {
        console.log(e);
        message.error(e.message);
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" align="middle" style={{ height: "100%" }}>
        <Col style={{ left: "50%", top: "10%", transform: "translate(-50%, -50%)" }}>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: "300px" }}>
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [{ required: true, message: "Please input your Email or Phone!" }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                  placeholder="Email or Phone"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "Please input your Password!" }]
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <Link className="login-form-forgot" style={{ float: "right" }} to="/forgot-password">
                Forgot password
              </Link>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Log in
              </Button>
              Or{" "}
              <Link to="/register" style={{ color: "blue" }}>
                register now!
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "login_form" })(Login);
export default WrappedLoginForm;
