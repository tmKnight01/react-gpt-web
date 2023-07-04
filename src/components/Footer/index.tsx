import React from "react";
import { Layout, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function ChatFooter() {
  const { Footer } = Layout;
  const { TextArea } = Input;
  return (
    <Footer className="chat-footer">
      <TextArea
        showCount
        style={{ scrollbarWidth: "none", scrollbarColor: "red" }}
        placeholder="来说点什么吧..."
        autoSize={{ minRows: 1, maxRows: 6 }}
      />
      <p>
        <SearchOutlined style={{ color: "#fff", fontSize: "18px" }} />
      </p>
    </Footer>
  );
}

export default ChatFooter;
