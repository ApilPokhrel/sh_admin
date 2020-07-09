import React from "react";
import { withRouter } from "react-router-dom";
import { apiRoutes, Call } from "./Services.js";
import Api from "../../services/ApiService";
import { Table, PageHeader, Divider, Tag, Button, message, Modal } from "antd";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import EditProfile from "../banner/EditProfile";
const { confirm } = Modal;


class Post extends React.Component {

  //


  state = {
    visible: { add: false, edit: false, profile: false },
    columns: [
      { title: "", dataIndex: "profile", key: "profile", render: p => (<img src={`${p.url}${p.name}_small.jpg`} />) },
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Rank", dataIndex: "rank", key: "rank" },
      {
        title: "Action",
        dataIndex: null,
        key: "action",
        render: c => (
          <span>
            <Divider type="vertical" />
            <Tag
              color="blue"
              key="edit_post_tag"
              onClick={e => {
                this.showEditModal(e, c);
              }}
              style={{ cursor: "pointer" }}
            >
              Edit
            </Tag>
            <Divider type="vertical" />
            <Tag
              color="blue"
              key="edit_user_tag"
              onClick={e => {
                this.remove(c);
              }}
              style={{ cursor: "pointer" }}
            >
              Delete
            </Tag>
            <Divider type="vertical" />
            <Tag
              color="blue"
              key="edit_user_tag"
              onClick={e => {
                this.showEditProfileModal(e, c);
              }}
              style={{ cursor: "pointer" }}
            >
              Profile
            </Tag>
          </span>
        )
      }
    ],
    data: [],
    pagination: { pageSize: 10, current: 1 },
    loading: false,
    post: null
  };


  handleAddOk = e => {
    this.setState({
      visible: { add: false, edit: false }
    });
  };

  showEditModal = (e, c) => {
    this.setState({ post: c, visible: { add: false, edit: true, profile: false } });
  };

  showEditProfileModal = (e, c) => {
    this.setState({ post: c, visible: { add: false, edit: false, profile: true } });
  };


  handleCancel = e => {
    this.setState({
      visible: { add: false, edit: false, profile: false }
    });
  };

  componentDidMount() {
    this.get();
  }

  handleChange = selectedItems => {
    this.setState({ selectedItems });
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

  remove = u => {
    let get = this.get;
    confirm({
      title: 'Do you want to delete these Product?',
      okText: 'Delete',
      onOk() {
        Call.remove(u._id).then(d => {
          get();
        }).catch(e => message.error(e.message)
        );
      },
      onCancel() { },
    });
  }

  handleAdd = () => {
    const { form } = this.addForm.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      Call.add(values)
        .then(d => {
          form.resetFields();
          this.handleCancel();
          this.get();
        })
        .catch(e => {
          console.log(e);
          message.error(e.message);
        });
    });
  };

  handleEdit = () => {
    const { form } = this.editForm.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      Call.update(this.state.post._id, values)
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

  handleProfileEdit = () => {
    const { form } = this.editProfileForm.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      Call.updateProfile(this.state.post._id, values)
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
          title="  System Categories"
          subTitle=""
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
                this.setState({ visible: { add: true, edit: false } });
              }}
            >
              Add
            </Button>
          ]}
        />
        <Table
          tableLayout="fixed"
          columns={this.state.columns}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />

        <AddPost
          wrappedComponentRef={addForm => (this.addForm = addForm)}
          visible={this.state.visible.add}
          onCreate={this.handleAdd}
          onCancel={this.handleCancel}
        />

        {this.state.post ? (
          <EditPost
            wrappedComponentRef={editForm => (this.editForm = editForm)}
            visible={this.state.visible.edit}
            onCreate={this.handleEdit}
            onCancel={this.handleCancel}
            post={this.state.post}
          />
        ) : (
            <div></div>
          )}

        {this.state.post ? (
          <EditProfile
            wrappedComponentRef={editForm => (this.editProfileForm = editForm)}
            visible={this.state.visible.profile}
            onCreate={this.handleProfileEdit}
            onCancel={this.handleCancel}
            post={this.state.post}
          />
        ) : (
            <div></div>
          )}
      </>
    );
  }
}

export default withRouter(Post);
