import React from "react";
import { Avatar } from "antd";

function Logo(props) {
  if (props.collapsed) {
    return (
      <div
        className="logo"
        style={{
          height: "65px",
          width: "100%",
          padding: "20px",
          justifyContent: "center"
        }}
      >
        <Avatar shape="square" size="large" src="/sh_logo2.png" />
      </div>
    );
  } else {
    return (
      <div
        className="logo"
        style={{
          width: "100%",
          padding: "5px",
          justifyContent: "center"
        }}
      >
        <img
          style={{
            width: "100%",
            padding: "20px",
            justifyContent: "center"
          }}
          alt="logo"
          src="/sh_logo2.png"
        />
      </div>
    );
  }
}
export default Logo;
