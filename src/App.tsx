import { useState } from "react";
import ChatLayout from "./view/layout/index";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>

      <ChatLayout />
    </>
  );
}

export default App;
