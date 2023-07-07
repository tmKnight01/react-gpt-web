import { useState } from "react";
import ChatLayout from "@/view/layout";
import { RecoilRoot } from "recoil";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RecoilRoot>
        <ChatLayout />
      </RecoilRoot>
    </>
  );
}

export default App;
