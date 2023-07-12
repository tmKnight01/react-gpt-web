import ChatLayout from "@/view/layout";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  return (
    <>
      <RecoilRoot>
        <ChatLayout />
      </RecoilRoot>
    </>
  );
}

export default App;
