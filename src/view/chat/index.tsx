import { useState, useRef, useMemo, useEffect } from "react";
import { Layout, Input, Button, theme } from "antd";
import {
  SendOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import collapse from "@/store/collpse";
import { themeMap, setting } from "@/store/setting";
import { getChatApi } from "@/service/api";
import Message from "@/components/Message";
import { scrollToBottom } from "@/utils";
import { useChat, useStorage } from "@/hooks/index";

function ChatContent() {
  const { TextArea } = Input;
  const { Header, Content, Footer } = Layout;
  const [collapsed, setCollapsed] = useRecoilState(collapse);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);
  const themColor = useRecoilValue(themeMap);
  const settingColor = useRecoilValue(setting).Theme;
  const prompt = useRef<string>("");
  const loadingRef = useRef<boolean>(false);
  const disabled = useMemo(() => {
    if (inputValue && !loadingRef.current) return false;
    return true;
  }, [inputValue]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { addChat, updateChat, sourceData } = useChat();
  const { getChatsByUid } = useStorage();
  const { uid = "" } = useParams();
  const chatsList = useMemo(() => {
    return getChatsByUid(uid);
  }, [uid, sourceData]);

  const contentRef = useRef<HTMLDivElement>(null);

  const optionList = chatsList.filter(
    (item) => item.inversion && !!item.conversationOption
  );

  const lastContext = optionList[optionList.length - 1]?.conversationOption;

  let option = null as any;
  if (lastContext) option = lastContext;

  useEffect(() => {
    contentRef.current && scrollToBottom(contentRef.current as HTMLDivElement);
  }, [contentRef.current?.scrollHeight,chatsList.length]);

  const onSubmit = async () => {
    if (!inputValue || inputValue.trim() === "") return;
    if (loadingRef.current) return;

    addChat(uid, {
      content: inputValue,
      inversion: false,
      dateTime: new Date().toLocaleString(),
      requestOptions: { prompt: inputValue, options: null },
    });

    addChat(uid, {
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
          const textAarry = responseText.split("\n").map((item) => {
            try {
              return JSON.parse(item);
            } catch (err) {
              console.log("err", err);
            }
          });

          try {
            const data = textAarry[textAarry.length - 1];
            console.log("data.text", data.text);
            updateChat(uid, {
              content: data.text,
              inversion: true,
              dateTime: new Date().toLocaleString(),
              isLoading: false,
              conversationOption: {
                parentMessageId: data.id,
                conversationId: data.conversationId,
              },
              requestOptions: { prompt: prompt.current, options: option },
            });
          } catch {}
        },
      }).catch((error) => {
        updateChat(uid, {
          content: String(error),
          inversion: true,
          dateTime: new Date().toLocaleString(),
          isLoading: false,
          requestOptions: {
            prompt: "",
          },
        });
        loadingRef.current = false;
      });
    } catch (err) {
      updateChat(uid, {
        content: String(err),
        inversion: true,
        dateTime: new Date().toLocaleString(),
        isLoading: false,
        requestOptions: { prompt: "" },
      });
    } finally {
      loadingRef.current = false;
    }
  };

  return (
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
            color: themColor[settingColor].color,
          }}
        >
          tmKnight
          <GithubOutlined style={{ fontSize: "24px", margin: "0 12px" }} />
        </a>
      </Header>

      <Content className="layout-content">
        <div
          ref={contentRef}
          className="message-content"
          style={{
            background: colorBgContainer,
            height: "100%",
            overflowY: "auto",
          }}
        >
          {chatsList.length ? (
            chatsList.map((item, i) => (
              <Message
                key={i}
                inversion={item.inversion}
                content={item.content}
                isLoading={item.isLoading}
                dateTime={item.dateTime}
              />
            ))
          ) : (
            <h1
              style={{
                textAlign: "center",
                color: themColor[settingColor].color,
              }}
            >
              期待您的发言~
            </h1>
          )}
          {null}
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
          style={{ marginLeft: 15, width: 60 }}
          onClick={onSubmit}
          disabled={disabled}
          type="primary"
          loading={loadingRef.current}
          icon={!loadingRef.current && <SendOutlined rotate={-150} />}
        />
      </Footer>
    </Layout>
  );
}

export default ChatContent;
