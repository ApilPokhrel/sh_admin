import React from "react";
import { withRouter } from "react-router-dom";
import { apiRoutes, Call } from "./Services.js";
import Api from "../../services/ApiService";
import { Table, PageHeader, Divider, Tag, Button, message, Modal, Form, Radio } from "antd";

const { confirm } = Modal;

class Category extends React.Component {
  state = {
    status: "all",
    columns: [
      { title: "From", dataIndex: "from", key: "from" },
      { title: "Status", dataIndex: "status", key: "status" },
      {
        title: "Active",
        dataIndex: null,
        key: "status",
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
        render: c => (
          <span>
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
          </span>
        )
      }
    ],
    data: [],
    pagination: { pageSize: 10, current: 1 },
    loading: false,
    contact: null
  };

  remove = u => {
    let get = this.get;
    confirm({
      title: "Do you want to delete these Contact?",
      okText: "Delete",
      onOk() {
        Call.remove(u._id)
          .then(d => {
            get();
          })
          .catch(e => message.error(e.message));
      },
      onCancel() {}
    });
  };

  componentDidMount() {
    this.get();
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
      status: this.state.status,
      ...filters
    });
  };

  get = params => {
    this.setState({ loading: true });

    const { pagination } = this.state;
    let start = pagination.current * pagination.pageSize - pagination.pageSize;

    if (!params)
      params = {
        limit: pagination.pageSize,
        page: pagination.current,
        start,
        status: this.state.status
      };
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

  onChangeStatus = (e, id) => {
    let get = this.get;
    let checked = e.target.checked;
    confirm({
      title: "Are you sure to change?",
      content: "Active Status will be " + !e.target.checked,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Call.update(id, { status: !checked ? "inactive" : "active" })
          .then(data => {
            get();
          })
          .catch(err => message.error(err.response.data.message));
      },
      onCancel() {}
    });
  };

  handlePaginationChange = e => {
    const { value } = e.target;

    const { pagination } = this.state;
    let start = pagination.current * pagination.pageSize - pagination.pageSize;
    this.get({ limit: pagination.pageSize, page: pagination.current, start, status: value });
    this.setState({
      status: value
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
          title="  System Contacts"
          subTitle=""
          extra={[]}
        />
        <Form
          layout="inline"
          className="components-table-demo-control-bar"
          style={{ marginBottom: 16 }}
        >
          <Form.Item>
            <Radio.Group
              value={this.state.pagination ? this.state.pagination.position : "none"}
              onChange={this.handlePaginationChange}
            >
              <Radio.Button value="all">All</Radio.Button>
              <Radio.Button value="active">Active</Radio.Button>
              <Radio.Button value="inactive">Inactive</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Form>
        <Table
          tableLayout="fixed"
          columns={this.state.columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.message}</p>}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default withRouter(Category);
