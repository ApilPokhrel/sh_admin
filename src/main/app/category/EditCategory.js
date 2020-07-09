import React from "react";
import { Modal, Form, Input } from "antd";
const { TextArea } = Input;

class AddCategory extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form, category } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Edit Category"
        okText="Edit"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              initialValue: category.name,
              rules: [{ required: true, message: "Please input name!" }]
            })(<Input placeholder="Name" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("description", {
              initialValue: category.desc,
              rules: [{ required: true, message: "Please input description!" }]
            })(<TextArea placeholder="Description" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedAddCategory = Form.create({ name: "add_category_form" })(AddCategory);
export default WrappedAddCategory;
