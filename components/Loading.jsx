import { Flex, Spin } from "antd";
import React from "react";

const Loading = () => (
  <div className="loading">
    <div
      style={{
        margin: "0 auto",
        display: "Flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid black",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Spin />
    </div>
  </div>
);

export default Loading;
