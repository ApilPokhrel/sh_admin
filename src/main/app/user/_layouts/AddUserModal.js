import React from "react";
import { Modal, Form, Input, Icon } from "antd";

class AddUserModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new user"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input name!" }]
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input email!" }]
            })(<Input placeholder="Email Address" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("phone", {
              rules: [{ required: true, message: "Please input phone no!" }]
            })(<Input placeholder="Phone no" />)}
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

          <Form.Item label="Roles">
            {getFieldDecorator("roles", {
              rules: [{ required: true, message: "Please input roles!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Roles"
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedAddUserModal = Form.create({ name: "add_user_form_modal" })(AddUserModal);
export default WrappedAddUserModal;
