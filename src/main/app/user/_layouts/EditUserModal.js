import React from "react";
import { Modal, Form, Input } from "antd";

class EditUserModal extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form, user } = this.props;
    const { getFieldDecorator } = form;
    var name = `${user.name.first} ${user.name.last}`;
    let email = user.contact.map(e => (e.type === "email" ? e.address : ""));
    let phone = user.contact.map(e => (e.type === "phone" ? e.address : ""));
    email = email.toString().replace(/,/g, '');
    phone = phone.toString().replace(/,/g, '');

    return (
      <Modal
        visible={visible}
        title="Edit User data"
        okText="Edit"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              initialValue: name,
              rules: [{ required: true, message: "Please input name!" }]
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: email,
              rules: [{ required: true, message: "Please input email!" }]
            })(<Input placeholder="Email Address" />)}
          </Form.Item>
          <Form.Item label="Phone">
            {getFieldDecorator("phone", {
              initialValue: phone,
              rules: [{ required: true, message: "Please input phone!" }]
            })(<Input placeholder="Phone No" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedEditUserModal = Form.create({ name: "edit_user_form_modal" })(EditUserModal);
export default WrappedEditUserModal;
