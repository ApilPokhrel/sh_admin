import React from "react";
import { Modal, Form, Input, InputNumber, Skeleton } from "antd";
const { TextArea } = Input;

class EditTag extends React.Component {
  state = {
    options: [],
    show: true
  };

  componentDidMount() {
  }


  render() {
    const { visible, onCancel, onCreate, form, tag } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Edit a article"
        okText="Edit"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Skeleton loading={!this.state.show} active>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                initialValue: tag.name,
                rules: [{ required: true, message: "Please input name!" }]
              })(<Input placeholder="Name" />)}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("status", {
                initialValue: tag.status,
                rules: [{ required: true, message: "Please input status!" }]
              })(
                (<Input placeholder="Status" />)
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("index", {
                initialValue: tag.index,
                rules: [{ required: true, message: "Please input index!" }]
              })(
                (<InputNumber placeholder="Index" />)
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator("desc", {
                initialValue: tag.desc,
                rules: [{ required: true, message: "Please input description!" }]
              })(<TextArea placeholder="Description" />)}
            </Form.Item>
          </Form>
        </Skeleton>
      </Modal>
    );
  }
}

const WrappedEditArticle = Form.create({ name: "edit_article_form" })(EditTag);
export default WrappedEditArticle;
