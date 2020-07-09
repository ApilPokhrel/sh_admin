import React from "react";
import { Layout, Menu, Icon, Input, Avatar, Badge } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const { Header } = Layout;
const { Search } = Input;
const { SubMenu } = Menu;

class TopNav extends React.Component {
  render() {
    return (
      <Header className="header" style={{ background: "#fff", padding: 0 }}>
        <Menu theme="light" mode="horizontal" style={{ lineHeight: "64px" }}>
          <Menu.Item
            key="0"
            onClick={this.props.toogle}
            style={{ borderBottom: "none", color: "rgba(0, 0, 0, 0.65)", marginRight: 60 }}
          >
            <Icon
              className="trigger"
              type={this.props.collapsed ? "menu-unfold" : "menu-fold"}
              style={{ marginLeft: 20 }}
            />
          </Menu.Item>

          <Menu.Item key="1" style={{ borderBottom: "none" }}>
            <Search
              placeholder="Search...."
              onSearch={value => console.log(value)}
              style={{ width: 500 }}
            />
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                Adam Sam
              </span>
            }
            key="2"
            style={{ marginLeft: 150 }}
          >
            <Menu.Item key="user:1">
              <Icon type="user" /> Profile
            </Menu.Item>
            <Menu.Item key="setting:2">
              <Icon type="setting" /> Settings
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="3" title="Notification">
            <Badge
              count={15}
              overflowCount={99}
              style={{
                backgroundColor: "#fff",
                color: "#999",
                boxShadow: "0 0 0 1px #d9d9d9 inset"
              }}
            >
              <Icon type="notification" />
            </Badge>
          </Menu.Item>
          <Menu.Item key="4" title="Logout">
            <Icon
              onClick={() => {
                window.localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              type="logout"
            />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

TopNav.propTypes = {
  toogle: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired
};

export default TopNav;
