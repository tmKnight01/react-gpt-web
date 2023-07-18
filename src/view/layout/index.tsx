import { useEffect } from "react";
import { Layout } from "antd";
import Slider from "@/components/Slider";
import { useRecoilValue } from "recoil";
import { useStorage } from "@/hooks/index";
import collapsed from "@/store/collpse";
import { useNavigate, Outlet } from "react-router-dom";
import "./index.scss";

function ChatLayout(): React.ReactNode {
  const Storage = useStorage();
  const navigate = useNavigate();
  const collapse = useRecoilValue(collapsed);
  // const optionsList = chatList.filter(
  //   (item) => item.inversion && !!item.conversationOption
  // );

  // const lastContext = optionsList[optionsList.length - 1]?.conversationOption;

  // if (lastContext) option = lastContext;

  useEffect(() => {
    navigate(`/chat/${Storage.active}`, {
      replace: true,
    });
  }, []);

  return (
    <>
      <Layout className={"chatLayout"}>
        <Slider collapsed={collapse} />
        <Outlet />
      </Layout>
    </>
  );
}

export default ChatLayout;
