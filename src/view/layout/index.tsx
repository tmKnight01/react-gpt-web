import { useMemo, useRef, useState } from "react";
import { Layout, theme, Input, Button } from "antd";
import Slider from "@/components/Slider";
import {
  SearchOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import Message from "@/components/Message";
import useChat from "@/hooks/useChat";
import { getChatApi } from "@/service/api";
const { Content, Footer, Header } = Layout;
const { TextArea } = Input;
import "./index.scss";

function ChatLayout(): JSX.Element {
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const prompt = useRef<string>("");
  const loadingRef = useRef<boolean>(false);
  const { addChat, updateChat, chatList } = useChat();
  const optionsList = chatList.filter(
    (item) => item.inversion && !!item.conversationOption
  );

  const lastContext = optionsList[optionsList.length - 1]?.conversationOption;
  let option = null as any;
  if (lastContext) option = lastContext;
  const disabled = useMemo(() => {
    if (inputValue && !loadingRef.current) return false;
    return true;
  }, [inputValue]);

  const onSubmit = async () => {
    if (!inputValue || inputValue.trim() === "") return;
    if (loadingRef.current) return;

    addChat({
      content: inputValue,
      inversion: false,
      dateTime: new Date().toLocaleString(),
      requestOptions: { prompt: inputValue, options: null },
    });
    addChat({
      content: "",
      inversion: true,
      dateTime: new Date().toLocaleString(),
      isLoading: true,
      requestOptions: { prompt: "", options: null },
    });
    try {
      loadingRef.current = true;
      let tempVlaue = inputValue;
      setInputValue(undefined);
      prompt.current = tempVlaue;
      await getChatApi<Chat.ConversationResponse>({
        prompt: tempVlaue,
        signal: new AbortController().signal,
        options: option,
        onDownloadProgress: ({ event }) => {
          const responseText = event.currentTarget.responseText as string;
          const textAarry = responseText
            .split("\n")
            .map((item) => JSON.parse(item));

          try {
            const data = textAarry[textAarry.length - 1];

            for (let i = 0; i < textAarry.length; i++) {
              updateChat(chatList.length - 1, {
                content: textAarry[i].text,
                inversion: true,
                dateTime: new Date().toLocaleString(),
                isLoading: false,
                conversationOption: {
                  parentMessageId: data.id,
                  conversationId: data.conversationId,
                },
                requestOptions: { prompt: prompt.current, options: option },
              });
            }
          } catch {}
          console.log("TextArrar", textAarry);
        },
      }).catch((error) => {
        updateChat(chatList.length - 1, {
          content: String(error),
          inversion: true,
          dateTime: new Date().toLocaleString(),
          isLoading: false,
          requestOptions: {
            prompt: "",
          },
        });
      });
    } catch (err) {
      updateChat(chatList.length - 1, {
        content: String(err),
        inversion: true,
        dateTime: new Date().toLocaleString(),
        isLoading: false,
        requestOptions: { prompt: "" },
      });
    } finally {
      console.log("tt", loadingRef.current);
      loadingRef.current = false;
    }
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Layout className={"chatLayout"}>
        <Slider collapsed={collapsed} />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              marginLeft: "16px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <a
              href="https://github.com/tmKnight01/react-gpt-web"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: " none",
                color: "black",
              }}
            >
              tmKnight
              <GithubOutlined style={{ fontSize: "24px", margin: "0 12px" }} />
            </a>
          </Header>
          <Content className="layout-content">
            <div
              className="message-content"
              style={{
                background: colorBgContainer,
                height: "100%",
                overflowY: "auto",
              }}
            >
              {chatList.length ? (
                chatList.map((item, i) => (
                  <Message
                    key={i}
                    inversion={item.inversion}
                    content={item.content}
                    isLoading={item.isLoading}
                    dateTime={item.dateTime}
                  />
                ))
              ) : (
                <h1 style={{ textAlign: "center" }}>期待您的发言~</h1>
              )}
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
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default ChatLayout;
