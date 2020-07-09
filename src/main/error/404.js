import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

export default function error_4_0_4(props) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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
