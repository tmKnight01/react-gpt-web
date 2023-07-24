import { useEffect } from "react";
import { Layout } from "antd";
import Slider from "@/components/Slider";
import { useStorage } from "@/hooks/index";
import { useNavigate, Outlet } from "react-router-dom";
import "./index.scss";

function ChatLayout(): JSX.Element {
  const Storage = useStorage();
  const navigate = useNavigate();

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
