import { Layout, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useRecoilValue } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import useChat from "@/hooks/useChat";
import "./index.scss";

const { Sider } = Layout;

interface SilderProps {
  collapsed: boolean;
}

const Slider = ({ collapsed }: SilderProps) => {
  const sourceData = useRecoilValue(chatSourceData);

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
            className={item.uid === sourceData.active ? "clicked" : ""}
            onClick={() => switchChat(item.uid)}
            style={{ marginBottom: "20px" }}
          >
            {item.title}
          </Button>
        ))}
      </div>
      <div className="slider-btm">
        <SettingOutlined style={{ marginRight: "10px" }} /> 设置
      </div>
    </Sider>
  );
};

export default Slider;
