import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import RsApp from "./app";

export default function NestingExample() {
  return (
    <Router>
      <RsApp />
    </Router>
  );
}
