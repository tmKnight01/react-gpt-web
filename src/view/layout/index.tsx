import { useMemo, useRef, useState } from "react";
import { Layout, theme, Input, Button } from "antd";
import Slider from "@/components/Slider";
import { SearchOutlined } from "@ant-design/icons";
import Message from "@/components/Message";
import { getChatApi } from "@/service/api";
const { Content, Footer } = Layout;
const { TextArea } = Input;
import "./index.scss";

function ChatLayout(): JSX.Element {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [chatList, setChatList] = useState<Chat.Chat[] | []>([]);
  const loadingRef = useRef<boolean>(false);
  const addChat = async (item: Chat.Chat) => {};

  const disabled = useMemo(() => {
    if (inputValue && !loadingRef.current) return false;
    return true;
  }, [inputValue]);

  const updateChat = (idx: number, chatItem: Chat.Chat) => {
    setChatList((chatList) =>
      chatList.map((item, index) => {
        if (index === idx) return { ...chatItem };
        return item;
      })
    );
  };

  const onSubmit = async () => {
    console.log("hellp");
    console.log("InputValue", inputValue);
    if (!inputValue || inputValue.trim() === "") return;
    if (loadingRef.current) return;
    setChatList((value) => [
      ...value,
      {
        content: inputValue,
        inversion: false,
        dateTime: new Date().toLocaleString(),
      },
      {
        content: "",
        inversion: true,
        dateTime: new Date().toLocaleString(),
      },
    ]);
    loadingRef.current = true;
    let tempVlaue = inputValue;
    setInputValue(undefined);
    const data = await getChatApi<Chat.ConversationResponse>({
      prompt: tempVlaue,
      onDownloadProgress(progressEvent) {
        
        console.log("event", progressEvent);
      },
    });

    loadingRef.current = false;
    setChatList((value) => [
      ...value,
      {
        content: data?.text as string,
        inversion: true,
        dateTime: new Date().toLocaleString(),
      },
    ]);
    console.log("data", data);
  };

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
              {chatList.map((item, i) => (
                <Message
                  key={i}
                  inversion={item.inversion}
                  content={item.content}
                />
              ))}
            </div>
          </Content>
          <Footer className="chat-footer">
            <TextArea
              onChange={(e) => setInputValue(e.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.keyCode === 13) event.preventDefault();
              }}
              value={inputValue}
              onPressEnter={onSubmit}
              // showCount
              style={{ scrollbarWidth: "none", scrollbarColor: "red" }}
              placeholder="来说点什么吧..."
              autoSize={{ minRows: 1, maxRows: 6 }}
            />
            <Button
              disabled={disabled}
              type="primary"
              shape="circle"
              loading={loadingRef.current}
              icon={!loadingRef.current && <SearchOutlined />}
            />
            {/* <Button disabled={disabled} color="">
              <SearchOutlined style={{ color: "#fff", fontSize: "18px" }} />
            </Button> */}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default ChatLayout;
