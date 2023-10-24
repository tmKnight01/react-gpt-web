import { useState, useEffect } from "react";
import { Layout, Button, Input, Modal, Form, Switch } from "antd";
import {
  SettingOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import { themeMap, setting } from "@/store/setting";
import { useChat, useStorage, useSetting } from "@/hooks";
import { switchToTheme } from "@/constants/index";
import collapse from "@/store/collpse";
import "./index.scss";

const { Sider } = Layout;

const Slider = () => {
  const sourceData = useRecoilValue(chatSourceData);
  const themColor = useRecoilValue(themeMap);
  const settingColor = useRecoilValue(setting).Theme;
  const [collapsed, setCollapsed] = useRecoilState(collapse);
  const { addHistory, changeChat } = useChat();
  const { updateHistory, deleteHistory } = useStorage();
  const { setSetting, soureSetting } = useSetting();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const [themeStyle, setThemeStyle] = useState<boolean>(
    soureSetting.Theme === "drak"
  );
  const [idx, setIdx] = useState(-1);
  const addClick = () =>
    addHistory({ uid: Date.now(), title: "New Chat", isEdit: false });

  const switchChat = (uid: number) => changeChat(uid);
  const [settingIsShow, setSettingIsShow] = useState<boolean>(false);

  const changeTitle = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: Chat.HistoryItem
  ) => {
    updateHistory(item.uid, { title: (e.target as any).value });
    setIsEdit(false);
  };
  const [form] = Form.useForm();
  useEffect(() => {
    idx !== -1 && setIsShow(true);
  }, [idx]);

  return (
    <>
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
              style={{
                ...themColor[settingColor],
                marginBottom: "20px",
                height: 40,
              }}
              className={
                item.uid === sourceData.active ? "clicked_btn" : "clicked"
              }
              onClick={() => {
                collapsed && setCollapsed((coll) => !coll);
                switchChat(item.uid);
              }}
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
              {!collapsed ? (
                !collapsed && item.uid !== sourceData.active ? (
                  item.title
                ) : (
                  <div className="clicked_edit">
                    {isEdit ? (
                      <Input
                        onPressEnter={(e) => changeTitle(e, item)}
                        defaultValue={item.title}
                      />
                    ) : (
                      item.title
                    )}

                    <span>
                      {!isEdit && (
                        <EditOutlined
                          style={{ marginRight: 10 }}
                          onClick={() => setIsEdit((val) => !val)}
                        />
                      )}
                      <DeleteOutlined
                        onClick={() => {
                          setIdx(idx);
                          setIsShow((val) => !val);
                        }}
                      />
                    </span>
                  </div>
                )
              ) : null}
            </Button>
          ))}
        </div>
        <div
          className="slider-btm"
          onClick={() => setSettingIsShow((val) => !val)}
          style={{ ...themColor[settingColor] }}
        >
          {collapsed ? (
            <SettingOutlined
              style={{
                marginRight: "10px",
                fontSize: "24px",
                ...themColor[settingColor],
              }}
            />
          ) : (
            <>
              <SettingOutlined
                style={{ marginRight: "10px", ...themColor[settingColor] }}
              />
              设置
            </>
          )}
        </div>
      </Sider>
      <Modal
        open={isShow}
        onOk={() => {
          setIsShow(false);
          deleteHistory(idx || 0);
        }}
        onCancel={() => setIsShow((val) => !val)}
      >
        {idx !== -1 && (
          <h2>您确认删除{sourceData.history[idx || 0]?.title}历史记录吗?</h2>
        )}
      </Modal>

      <Modal
        open={settingIsShow}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              console.log("value", values.theme.toString());
              setSetting({
                Theme: switchToTheme[`${themeStyle}`] as any,
              });
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
          setSettingIsShow(false);
        }}
        onCancel={() => setSettingIsShow((val) => !val)}
      >
        <h2>
          <SettingOutlined style={{ marginRight: "10px" }} /> 设置
        </h2>
        <Form form={form}>
          <Form.Item name={"theme"} label="主题">
            <Switch
              size="default"
              checkedChildren="🌜"
              unCheckedChildren="🌞"
              checked={themeStyle}
              onChange={(value) => setThemeStyle(value)}
              style={{
                backgroundColor: themeStyle
                  ? "rgb(23,101,174)"
                  : "rgb(187,188,188)",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Slider;
