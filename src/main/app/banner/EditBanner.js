import React from "react";
import { Modal, Form, Input, InputNumber } from "antd";
const { TextArea } = Input;

class EditBanner extends React.Component {
  render() {
    const { visible, onCancel, onCreate, form, banner } = this.props;
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
          <Form.Item label="Sub1">
            {getFieldDecorator("sub1", {
              initialValue: banner.sub1,
              rules: [{ required: true, message: "Please input Sub1!" }]
            })(<Input placeholder="Sub1" />)}
          </Form.Item>
          <Form.Item label="link">
            {getFieldDecorator("link", {
              initialValue: banner.link,
              rules: [{ required: true, message: "Please input link!" }]
            })(<Input placeholder="Link" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("sub2", {
              initialValue: banner.sub2,
              rules: [{ required: true, message: "Please input sub2!" }]
            })(<TextArea placeholder="Sub2" />)}
          </Form.Item>

          <Form.Item label="Rank">
            {getFieldDecorator("rank", {
            })(<InputNumber placeholder="Rank" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("color", {
              initialValue: banner.color,
            })(<Input placeholder="Color" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("btnColor", {
              initialValue: banner.btnColor,
            })(<Input placeholder="Button Color" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("btnBackground", {
              initialValue: banner.btnBackground,
            })(<Input placeholder="Button Background" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("btnText", {
              initialValue: banner.btnText,
            })(<Input placeholder="Button Text" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedEditBanner = Form.create({ name: "edit_banner_form" })(EditBanner);
export default WrappedEditBanner;
