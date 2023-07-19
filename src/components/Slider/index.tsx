import { Layout, Button } from "antd";
import { SettingOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import useChat from "@/hooks/useChat";
import collapse from "@/store/collpse";

import "./index.scss";

const { Sider } = Layout;

const Slider = () => {
  const sourceData = useRecoilValue(chatSourceData);
  const [collapsed, setCollapsed] = useRecoilState(collapse);
  const { addHistory, changeChat } = useChat();

  const addClick = () =>
    addHistory({ uid: Date.now(), title: "New Chat", isEdit: false });

  const switchChat = (uid: number) => changeChat(uid);

  return (
    <Sider
      className="slider-cls"
      collapsible
      theme="light"
      trigger={null}
      collapsed={collapsed}
      style={{ overflow: "hidden" }}
    >
      <div className="slider-top">
        <Button
          type="dashed"
          style={{ marginBottom: "20px" }}
          onClick={addClick}
        >
          New Chat
        </Button>
        {sourceData.history.map((item, idx) => (
          <Button
            key={idx}
            className={
              item.uid === sourceData.active ? "clicked_btn" : "clicked"
            }
            onClick={() => {
              collapsed && setCollapsed((coll) => !coll);
              switchChat(item.uid);
            }}
            style={{ marginBottom: "20px" }}
            icon={
              collapsed ? (
                <PlusSquareOutlined
                  onClick={() => {
                    setCollapsed((coll) => !coll);
                    switchChat(item.uid);
                  }}
                />
              ) : null
            }
          >
            {!collapsed && item.title}
          </Button>
        ))}
      </div>
      <div className="slider-btm">
        {collapsed ? (
          <SettingOutlined style={{ marginRight: "10px", fontSize: "24px" }} />
        ) : (
          <>
            <SettingOutlined style={{ marginRight: "10px" }} /> 设置
          </>
        )}
      </div>
    </Sider>
  );
};

export default Slider;
