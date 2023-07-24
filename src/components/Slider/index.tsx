import { useState, useEffect } from "react";
import { Layout, Button, Input, Modal } from "antd";
import {
  SettingOutlined,
  PlusSquareOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import { useChat, useStorage } from "@/hooks";
import collapse from "@/store/collpse";
import "./index.scss";

const { Sider } = Layout;

const Slider = () => {
  const sourceData = useRecoilValue(chatSourceData);
  const [collapsed, setCollapsed] = useRecoilState(collapse);
  const { addHistory, changeChat } = useChat();
  const { updateHistory, deleteHistory } = useStorage();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isShow, setIsShow] = useState(false);
  const [idx, setIdx] = useState(-1);
  const addClick = () =>
    addHistory({ uid: Date.now(), title: "New Chat", isEdit: false });

  const switchChat = (uid: number) => changeChat(uid);

  const changeTitle = (
    e: React.KeyboardEvent<HTMLInputElement>,
    item: Chat.HistoryItem
  ) => {
    updateHistory(item.uid, { title: (e.target as any).value });
    setIsEdit(false);
  };

  // const deleteChatHistory =  (idx:number) =>
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
              className={
                item.uid === sourceData.active ? "clicked_btn" : "clicked"
              }
              onClick={() => {
                collapsed && setCollapsed((coll) => !coll);
                switchChat(item.uid);
              }}
              style={{ marginBottom: "20px", height: 40 }}
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
        <div className="slider-btm">
          {collapsed ? (
            <SettingOutlined
              style={{ marginRight: "10px", fontSize: "24px" }}
            />
          ) : (
            <>
              <SettingOutlined style={{ marginRight: "10px" }} /> 设置
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
    </>
  );
};

export default Slider;
