import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu, Icon, Divider } from "antd";
import { Link } from "react-router-dom";
import Logo from "../shared-components/Logo";

const { Sider } = Layout;
const { SubMenu } = Menu;

class SideNav extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          top: 0,
          bottom: 0
        }}
      >
        <Logo collapsed={this.props.collapsed} />
        <Divider />

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to={`/`}>
              <Icon type="appstore" /> <span>Dashboard</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={`/login`}>
              <Icon type="login" /> <span>Login</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={`/category`}>
              <Icon type="user" /> <span>Category</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to={`/banner`}>
              <Icon type="user" /> <span>Banner</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to={`/post`}>
              <Icon type="user" /> <span>Post</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to={`/tag`}>
              <Icon type="user" /> <span>Tag</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={`/product`}>
              <Icon type="user" /> <span>Product</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="8">
            <Link to={`/contact`}>
              <Icon type="user" /> <span>Contact</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="9"
            title={
              <span>
                <Icon type="unordered-list" /> <span>Super Admin</span>
              </span>
            }
          >
            <Menu.Item key="admin.1">
              <Link to={`/user_list`}>
                <Icon type="user" /> Users
              </Link>
            </Menu.Item>
            <Menu.Item key="admin.2">
              <Link to={`/role_list`}>
                <Icon type="usergroup-add" /> Roles
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

SideNav.propTypes = {
  collapsed: PropTypes.bool.isRequired
};

export default SideNav;
