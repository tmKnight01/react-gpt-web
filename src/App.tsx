import ChatLayout from "@/view/layout";
import ChatContent from "@/view/chat";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { RecoilRoot, useRecoilValue } from "recoil";
import { themeMap } from "@/store/setting";
import "./App.css";

function App() {
  const RecoilComponent = () => {
    const AntdTheme = useRecoilValue(themeMap).antdTheme;

    return (
      <ConfigProvider
        theme={{
          algorithm: AntdTheme,
        }}
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<ChatLayout />}>
              <Route path="/chat/:uid" element={<ChatContent />} />
            </Route>
          </Routes>
        </HashRouter>
      </ConfigProvider>
    );
  };

  return (
    <>
      <RecoilRoot>
        <RecoilComponent />
      </RecoilRoot>
    </>
  );
}

export default App;
