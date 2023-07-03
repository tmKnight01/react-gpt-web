import React from "react";
import { Layout } from "antd";
import './index.scss'
const { Sider } = Layout;
const Slider = () => {
  return (
    <Sider collapsible theme="light">
      <div className="demo-logo-vertical" />
    </Sider>
  );
};

export default Slider;
