import React from "react";
import { withRouter } from "react-router-dom";

import { Table, PageHeader, Divider, Tag, Modal, Button, message } from "antd";
import Api from "../../services/ApiService";
import { apiRoutes, Call } from "./Services";
import AddRoleModal from "./_layouts/AddRoleModal";
import EditRoleModal from "./_layouts/EditRoleModal";
const PERMS = [
  "users_read",
  "users_update",
  "users_write",
  "articles_read",
  "articles_write",
  "articles_update"
];
const { confirm } = Modal;

class RoleList extends React.Component {
  state = {
    visible: { add: false, edit: false },
    columns: [
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Expiry Date", dataIndex: "expiry_date", key: "expiry_date" },
      {
        title: "Action",
        dataIndex: null,
        key: "action",
        render: r => (
          <span>
            <Tag
              color="blue"
              key="edit_role_tag"
              onClick={e => this.showEditModal(e, r)}
              style={{ cursor: "pointer" }}
            >
              Edit
            </Tag>
            <Divider type="vertical" />
            <Tag
              color="volcano"
              onClick={e => this.onDeleteRole(e, r)}
              key="delete_role_tag"
              style={{ cursor: "pointer" }}
            >
              Delete
            </Tag>
          </span>
        )
      }
    ],
    data: [],
    pagination: { pageSize: 10, current: 1 },
    loading: false,
    role: null
  };

  componentDidMount() {
    this.get();
  }

  showEditModal = (e, r) => {
    this.setState({
      visible: { add: false, edit: true },
      role: r
    });
  };

  handleEditOk = e => {
    this.setState({
      visible: { add: false, edit: false }
    });
  };

  handleCancel = e => {
    this.setState({
      visible: { add: false, edit: false }
    });
  };

  onDeleteRole(e, r) {
    let get = this.get;
    confirm({
      title: "Are you sure delete this role?",
      content: "Delete " + r.name,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Api(apiRoutes.deleteRole(r._id), {})
          .then(d => {
            get();
          })
          .catch(e => {
            message.error(e.message);
          });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    let start = pagination.current * pagination.pageSize - pagination.pageSize;
    this.get({
      limit: pagination.pageSize,
      sortField: sorter.field,
      sortOrder: sorter.order,
      page: pagination.current,
      start,
      ...filters
    });
  };

  get = params => {
    this.setState({ loading: true });

    const { pagination } = this.state;
    let start = pagination.current * pagination.pageSize - pagination.pageSize;

    if (!params) params = { limit: pagination.pageSize, page: pagination.current, start };
    Api(apiRoutes.listRole, params)
      .then(data => {
        console.log(data);
        const pagination = { ...this.state.pagination };
        pagination.total = data.total;
        this.setState({
          loading: false,
          data: data.data,
          pagination
        });
      })
      .catch(err => message.error(err.message));
  };

  handleAddRole = () => {
    const { form } = this.addRoleForm.props;
    const permissions = this.addRoleForm.state.selectedItems;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      Api(apiRoutes.addRole, { ...values, permissions })
        .then(d => {
          form.resetFields();
          this.handleCancel();
          this.get();
        })
        .catch(e => {
          message.error(e.message);
        });
    });
  };

  handleEditRole = () => {
    const { form } = this.editRoleForm.props;
    const permissions = this.editRoleForm.state.selectedItems;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      values.permissions = permissions;
      Call.update(this.state.role._id, values)
        .then(d => {
          form.resetFields();
          this.handleCancel();
          this.get();
        })
        .catch(e => {
          message.error(e.message);
        });
    });
  };

  render() {
    return (
      <>
        <PageHeader
          style={{
            border: "1px solid rgb(235, 237, 240)"
          }}
          onBack={() => {
            this.props.history.goBack();
          }}
          title="  System Roles"
          subTitle="  Please select a role to display available permissions."
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
                this.setState({ visible: { add: true, edit: false } });
              }}
            >
              Add Role
            </Button>
          ]}
        />
        <Table
          tableLayout="fixed"
          columns={this.state.columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.permissions.map(e => e).join(" | ")}</p>
          )}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />

        {this.state.role ? (
          <EditRoleModal
            wrappedComponentRef={editRoleForm => (this.editRoleForm = editRoleForm)}
            visible={this.state.visible.edit}
            onCreate={this.handleEditRole}
            onCancel={this.handleCancel}
            role={this.state.role}
            permissions={PERMS}
          />
        ) : (
            <div></div>
          )}
        <AddRoleModal
          wrappedComponentRef={addRoleForm => (this.addRoleForm = addRoleForm)}
          visible={this.state.visible.add}
          onCreate={this.handleAddRole}
          onCancel={this.handleCancel}
          options={PERMS}
        />
      </>
    );
  }
}

export default withRouter(RoleList);
