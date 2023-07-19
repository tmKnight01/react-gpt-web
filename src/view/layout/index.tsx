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

  useEffect(() => {
    console.log("storage.Active", Storage.active);
    navigate(`/chat/${Storage.active}`, {
      replace: true,
    });
  }, [Storage.active]);

  return (
    <>
      <Layout className={"chatLayout"}>
        <Slider />
        <Outlet />
      </Layout>
    </>
  );
}

export default ChatLayout;
