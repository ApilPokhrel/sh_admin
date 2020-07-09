import React from "react";
import { Modal, Form, Input, Skeleton } from "antd";

const { TextArea } = Input;

class AddTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      show: true
    };
  }


  render() {
    const { visible, onCancel, onCreate, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new article"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Skeleton loading={!this.state.show} active>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please input name!" }]
              })(<Input placeholder="Title" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("desc", {
                rules: [{ required: true, message: "Please input description!" }]
              })(<TextArea placeholder="Description" />)}
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
    );
  }
}

const WrappedAddArticle = Form.create({ name: "add_tag_form" })(AddTag);
export default WrappedAddArticle;
