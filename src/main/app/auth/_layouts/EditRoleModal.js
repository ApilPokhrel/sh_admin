import React from "react";
import { Modal, Form, Input, Tag, Select, Skeleton, DatePicker } from "antd";
import { apiRoutes } from "../Services";
import Api from "../../../services/ApiService";
import moment from "moment";

class EditUserModal extends React.Component {
  state = {
    tags: [],
    selectedItems: [],
    permissions: this.props.permissions,
    show: true
  };

  removePerm = p => {
    console.log(p);
    let name = this.props.role.name;
    Api(apiRoutes.removePermissions(name), { permission: p }).then(d => {
      let { permissions } = this.state;
      permissions.push(p);
      this.setState({ permissions });
    });
  };


  handleChange = selectedItems => {
    this.setState({ selectedItems });
  };
  render() {
    const { visible, onCancel, onCreate, form, role } = this.props;
    const { getFieldDecorator } = form;
    let name = role.name;
    let perms = role.permissions;
    let tags = perms.map(tag => {
      return (
        <span key={tag} style={{ display: "inline-block" }}>
          <Tag
            closable
            onClose={e => {
              this.removePerm(tag);
            }}
          >
            {tag}
          </Tag>
        </span>
      );
    });

    const { selectedItems } = this.state;
    const filteredOptions = this.state.permissions.filter(o => !selectedItems.includes(o));

    return (
      <Modal
        visible={visible}
        title="Edit User data"
        okText="Edit"
        onCancel={() => {
          this.setState({ selectedItems: [], show: true });
          onCancel();
        }}
        onOk={() => {
          onCreate();
          this.setState({ selectedItems: [], show: true });
        }}
      >
        <Skeleton loading={!this.state.show} active>
          <div style={{ marginBottom: 16 }}>{tags}</div>
          <Form layout="vertical">
            <Form.Item label="Name">
              {getFieldDecorator("name", {
                initialValue: name,
                rules: [{ required: true, message: "Please input name!" }]
              })(<Input placeholder="Name" />)}
            </Form.Item>

            <Form.Item label="Expiry Date">
              {getFieldDecorator("expiry_date", {
                initialValue: moment(role.expiry_date),
                rules: [{ type: "object" }]
              })(<DatePicker showTime format="YYYY-MM-DD" />)}
            </Form.Item>

            <Select
              mode="multiple"
              placeholder="Permissions Here..."
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
          </Form>
        </Skeleton>
      </Modal>
    );
  }
}

const WrappedEditUserModal = Form.create({ name: "edit_user_form_modal" })(EditUserModal);
export default WrappedEditUserModal;
