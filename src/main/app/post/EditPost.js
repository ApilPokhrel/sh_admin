import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
const { TextArea } = Input;

class EditPost extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form, post } = this.props;
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
          <Form.Item label="Title">
            {getFieldDecorator("title", {
              initialValue: post.title,
              rules: [{ required: true, message: "Please input Title!" }]
            })(<Input placeholder="Title" />)}
          </Form.Item>

          <Form.Item label="Status">
            {getFieldDecorator("status", {
              initialValue: post.status,
              rules: [{ required: true, message: "Please input status!" }]
            })(<Input placeholder="Status" />)}
          </Form.Item>

          <Form.Item label="Rank">
            {getFieldDecorator("rank", {
              initialValue: post.rank,
              rules: [{ required: true, message: "Please input rank!" }]
            })(<InputNumber placeholder="Rank" />)}
          </Form.Item>


          <Form.Item label="Description">
            {getFieldDecorator("desc", {
              initialValue: post.desc,
              rules: [{ required: true, message: "Please input Description!" }]
            })(<TextArea placeholder="Description" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedEditPost = Form.create({ name: "edit_post_form" })(EditPost);
export default WrappedEditPost;
