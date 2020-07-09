import React from "react";
import { Layout, BackTop, Spin } from "antd";

import SideNav from "../navigation/SideNav";
import TopNav from "../navigation/TopNav";
import CheckAuth from "../../auth/CheckAuth";

const { Content, Footer } = Layout;

class RsLayout extends React.Component {
  constructor(props) {
    super();
    this.toogle = this.toggle.bind(this);
  }
  state = {
    collapsed: false
  };

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <CheckAuth>
        <Layout>
          <SideNav collapsed={this.state.collapsed} />
          <Layout style={{ overflowY: "scroll", height: "100vh" }}>
            <TopNav toogle={this.toogle} collapsed={this.state.collapsed} />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                background: "#fff",
                overflowY: "auto",
                overflowX: "hidden"
              }}
            >
              {this.props.children}
              <BackTop />
            </Content>
            <div style={{ textAlign: "center", paddingBottom: 15 }}>
              SH Steels ©2020 Created by Apil
            </div>
          </Layout>
        </Layout>
      </CheckAuth>
    );
  }
}




export default RsLayout;
