import ChatLayout from "@/view/layout";
import ChatContent from "@/view/chat";
import { HashRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <>
      <RecoilRoot>
        <HashRouter>
          <Routes>
            <Route path="/" element={<ChatLayout />}>
              <Route path="/chat/:uid" element={<ChatContent />} />
            </Route>
          </Routes>
        </HashRouter>
      </RecoilRoot>
    </>
  );
}

export default App;
