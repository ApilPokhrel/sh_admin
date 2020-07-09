import React from "react";
import { Modal, Form, Input, Icon, Select, DatePicker, Divider } from "antd";

class AddRoleModal extends React.Component {
  state = {
    selectedItems: []
  };

  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { visible, onCancel, onCreate, form, options } = this.props;
    const { getFieldDecorator } = form;
    const { selectedItems } = this.state;
    const filteredOptions = options.filter(o => !selectedItems.includes(o));
    return (
      <Modal
        visible={visible}
        title="Create a new role"
        okText="Create"
        onCancel={() => {
          this.setState({ selectedItems: [] });
          onCancel();
        }}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <Select
            mode="multiple"
            placeholder="Permissions are here..."
            value={selectedItems}
            onChange={this.handleChange}
            style={{ width: "100%" }}
          >
            {filteredOptions.map(item => (
              <Select.Option key={item} value={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
          <Divider type="horizontal" />

          <Form.Item>
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "Please input role name!" }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="Name"
              />
            )}
          </Form.Item>
          <Form.Item label="Expiry Date">
            {getFieldDecorator("expiry_date", {
              rules: [{ type: "object" }]
            })(<DatePicker showTime format="YYYY-MM-DD" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedAddRoleModal = Form.create({ name: "add_role_form_modal" })(AddRoleModal);
export default WrappedAddRoleModal;
