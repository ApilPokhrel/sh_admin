import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { apiRoutes, Call } from "./Services.js";
import Api from "../../services/ApiService";
import { Table, PageHeader, Divider, Tag, Modal, message, Button, Badge } from "antd";

const { confirm } = Modal;

class Product extends React.Component {
  state = {
    columns: [
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Category",
        dataIndex: "sub_type",
        key: "sub_type",
        render: (a, i) => {
          return <span>{a && a.name ? a.name : ""}</span>;
        }
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status"
      },
      {
        title: "Condition",
        dataIndex: "condition",
        key: "condition"
      },
      {
        title: "Available",
        dataIndex: null,
        key: "available",
        render: (a, i) => {
          console.log(a);
          return (
            <input
              type="checkbox"
              checked={a.is_available}
              onChange={e => {
                this.onChangeAvailable(e, a._id);
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
              key="edit_product"
              onClick={e => {
                this.editProduct(e, u);
              }}
              style={{ cursor: "pointer" }}
            >
              Edit
            </Tag>
            <Divider type="vertical" />
            <Tag
              color="blue"
              key="delete_product"
              onClick={e => {
                this.deleteProduct(e, u);
              }}
              style={{ cursor: "pointer" }}
            >
              Delete
            </Tag>
          </span>
        )
      }
    ],
    selectedItems: [],
    data: [],
    pagination: { pageSize: 10, current: 1 },
    loading: false,
    user: null
  };

  editProduct = (e, u) => {
    this.props.history.push("/edit_product?p=" + u._id);
  };

  deleteProduct = (e, u) => {
    let get = this.get;
    confirm({
      title: "Do you want to delete these Product?",
      okText: "Delete",
      onOk() {
        Call.delete(u._id)
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

  onChangeAvailable = (e, id) => {
    let checked = !e.target.checked;
    var target = e.target;
    let get = this.get;
    e.target.checked = checked;
    confirm({
      title: "Are you sure to change?",
      content: "Product available will be " + e.target.checked,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        Api(apiRoutes.change_available(id), { is_available: !checked })
          .then(data => {
            target.checked = !checked;
            get();
          })
          .catch(err => message.error(err.message));
      },
      onCancel() {}
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
          title="  Products"
          subTitle=""
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
                this.props.history.push("/choose_category");
              }}
            >
              Add Product
            </Button>
          ]}
        />
        <Table
          tableLayout="fixed"
          columns={this.state.columns}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.desc}</p>}
          dataSource={this.state.data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange}
        />
      </>
    );
  }
}

export default withRouter(Product);
