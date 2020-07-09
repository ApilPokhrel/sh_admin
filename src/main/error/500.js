import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function error_5_0_0(props) {
  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, the server is wrong."
      extra={
        <Button type="primary">
          <Link to="/" style={{ color: "white" }}>
            Back Home
          </Link>
        </Button>
      }
    />
  );
}
