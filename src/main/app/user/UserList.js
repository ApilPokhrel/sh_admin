import React from "react";
import { withRouter } from "react-router-dom";
import { apiRoutes, Call } from "./Services.js";
import Api from "../../services/ApiService";
import { Table, PageHeader, Divider, Tag, Modal, Input, Button, message, Badge } from "antd";
import AddUserModal from "./_layouts/AddUserModal";
import EditUserModal from "./_layouts/EditUserModal";
const { confirm } = Modal;
const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: { add: false, edit: false, role: false },
      columns: [
        {
          title: "Name",
          dataIndex: "name",
          key: "name",
          render: u => <span>{`${u.first} ${u.last}`}</span>
        },
        {
          title: "Phone",
          dataIndex: "contact",
          key: "phone",
          render: u => (
            <span>
              {u.map((e, i) => {
                if (e.type === "phone") {
                  if (e.is_verified)
                    return (
                      <Badge key={i} status="success">
                        {e.address}
                      </Badge>
                    );
                  else
                    return (
                      <Badge key={i} status="error">
                        {e.address}
                      </Badge>
                    );
                }
              })}
            </span>
          )
        },
        {
          title: "Email",
          dataIndex: "contact",
          key: "email",
          render: u => (
            <span>
              {u.map((e, i) => {
                if (e.type === "email") {
                  if (e.is_verified)
                    return (
                      <Badge key={i} status="success">
                        {e.address}
                      </Badge>
                    );
                  else
                    return (
                      <Badge key={i} status="error">
                        {e.address}
                      </Badge>
                    );
                }
              })}
            </span>
          )
        },
        {
          title: "Verified",
          dataIndex: null,
          key: "is_verified",
          render: (a, i) => {
            return (
              <input
                type="checkbox"
                checked={a.is_verified}
                onChange={e => {
                  this.onChangeVerification(e, a._id);
                }}
              />
            );
          }
        },
        {
          title: "Active",
          dataIndex: null,
          key: "active",
          render: (a, i) => {
            return (
              <input
                type="checkbox"
                checked={a.status && a.status == "active" ? true : false}
                onChange={e => {
                  this.onChangeStatus(e, a._id);
                }}
              />
            );
          }
        },
        {
          title: "Action",
          dataIndex: null,
          key: "action",
          render: u => (
            <span>
              <Tag
                color="blue"
                key="add_role_tag"
                onClick={e => {
                  this.showAddRoleModal(e, u);
                }}
                style={{ cursor: "pointer" }}
              >
                Add Roles
              </Tag>
              <Divider type="vertical" />
              <Tag
                color="blue"
                key="edit_user_tag"
                onClick={e => {
                  this.showUserEditModal(e, JSON.stringify(u));
                }}
                style={{ cursor: "pointer" }}
              >
                Edit
              </Tag>
            </span>
          )
        }
      ],
      selectedItems: [],
      data: [],
      pagination: { pageSize: 10, current: 1 },
      loading: false,
      user: undefined,
      roles: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  showAddRoleModal = (e, user) => {
    console.log(user.roles);
    this.setState({
      visible: { add: false, edit: false, role: true },
      selectedItems: user.roles,
      roles: user.roles.toString(),
      user
    });
  };

  handleAddRoleOk = e => {
    let roles = this.state.roles.split(",").map(item => item.trim());
    Call.update(this.state.user._id, { roles })
      .then(d => {
        this.setState({
          visible: { add: false, edit: false, role: false }
        });
        this.get();
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  showUserEditModal = (e, u) => {
    u = JSON.parse(u);
    this.setState({ user: u, visible: { add: false, edit: true, role: false } });
  };

  handleCancel = e => {
    this.setState({
      visible: { add: false, edit: false, role: false }
    });
  };

  componentDidMount() {
    this.get();
  }

  handleChange = e => {
    this.setState({ roles: e.target.value });
  };

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
    Api(apiRoutes.list, params)
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

  onChangeStatus = (e, id) => {
    let checked = !e.target.checked;
    var target = e.target;
    let get = this.get;
    e.target.checked = checked;
    confirm({
      title: "Are you sure to change?",
      content: "Active Status will be " + e.target.checked,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Call.update(id, { status: !checked ? "inactive" : "active" })
          .then(data => {
            target.checked = !checked;
            get();
          })
          .catch(err => message.error(err.message));
      },
      onCancel() {}
    });
  };

  onChangeVerification = (e, id) => {
    let checked = !e.target.checked;
    var target = e.target;
    let get = this.get;
    e.target.checked = checked;
    confirm({
      title: "Are you sure to change?",
      content: "Verification will be " + !e.target.checked,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Call.update(id, { is_verified: !checked })
          .then(data => {
            target.checked = !checked;
            get();
          })
          .catch(err => message.error(err.message));
      },
      onCancel() {}
    });
  };

  handleAddUser = () => {
    const { form } = this.addUserForm.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      Api(apiRoutes.register, values)
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

  handleEditUser = () => {
    const { form } = this.editUserForm.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      let email = this.state.user.contact.find(o => o.type === "email");

      let phone = this.state.user.contact.find(o => o.type === "phone");

      if (email) values.email_verified = email.is_verified;

      if (phone) values.phone_verified = phone.is_verified;
      Call.update(this.state.user._id, values)
        .then(d => {
          form.resetFields();
          this.handleCancel();
          this.get();
        })
        .catch(e => {
          console.log("Error : ", e);
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
          title="  System Users"
          subTitle=""
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
                this.setState({ visible: { add: true, edit: false } });
              }}
            >
              Add User
            </Button>
          ]}
        />
        <Table
          tableLayout="fixed"
          columns={this.state.columns}
          expandedRowRender={record => (
            <p style={{ margin: 0 }}>{record.roles.map(r => r).join(" | ")}</p>
          )}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
        <Modal
          title="Add Roles"
          visible={this.state.visible.role}
          onOk={this.handleAddRoleOk}
          onCancel={this.handleCancel}
        >
          <Input
            placeholder="Name"
            defaultValue={this.state.user ? this.state.user.roles.toString() : ""}
            onChange={this.handleChange}
          />
        </Modal>

        <AddUserModal
          wrappedComponentRef={addUserForm => (this.addUserForm = addUserForm)}
          visible={this.state.visible.add}
          onCreate={this.handleAddUser}
          onCancel={this.handleCancel}
        />

        {this.state.user ? (
          <EditUserModal
            wrappedComponentRef={editUserForm => (this.editUserForm = editUserForm)}
            visible={this.state.visible.edit}
            onCreate={this.handleEditUser}
            onCancel={this.handleCancel}
            user={this.state.user}
          />
        ) : (
          <div></div>
        )}
      </>
    );
  }
}

export default withRouter(UserList);
