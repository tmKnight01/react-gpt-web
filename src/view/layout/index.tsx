import React from "react";

import { Layout, theme } from "antd";
import Slider from "@/components/Slider";
import ChatFooter from "@/components/Footer";
import Message from "@/components/Message";
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
        <Layout>
          <Content className="layout-content">
            <div
              className="message-content"
              style={{
                background: colorBgContainer,
                height: "100%",
                overflowY: "auto",
              }}
            >
              <Message inversion={false} />
              <Message inversion={true} />
            </div>
          </Content>
          <ChatFooter />
        </Layout>
      </Layout>
    </>
  );
}

export default ChatLayout;
