import { atom, selector } from "recoil";
import { getLocalState } from "./tool";

const chatSourceData = atom({
  key: "chatSourceData",
  default: getLocalState() as unknown as Chat.ChatState
});



export { chatSourceData };
