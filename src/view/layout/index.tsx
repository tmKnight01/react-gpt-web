import React from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import Slider from "../../components/Slider";
const { Content } = Layout;
import "./index.scss";

function ChatLayout(): JSX.Element {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className={"chatLayout"}>
        <Slider />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default ChatLayout;
