import { Layout, Button } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import "./index.scss";
const { Sider } = Layout;

interface SilderProps {
  collapsed: boolean;
}

const Slider = ({ collapsed }: SilderProps) => {
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
        <Button type="dashed" style={{ marginBottom: "20px" }}>
          New Chat
        </Button>
      </div>
      <div className="slider-btm">
        <SettingOutlined style={{ marginRight: "10px" }} /> 设置
      </div>
    </Sider>
  );
};

export default Slider;
