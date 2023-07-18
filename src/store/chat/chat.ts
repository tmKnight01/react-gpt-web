import { atom, selectorFamily } from "recoil";
import { getLocalState } from "./tool";

const chatSourceData = atom({
  key: "chatSourceData",
  default: getLocalState() as unknown as Chat.ChatState
});

const getchatLength = selectorFamily({
  key: 'getchatLength',
  get: (uid) => ({ get }) => {
    return get(chatSourceData).chats.find(item => item.uid === Number(uid))?.data?.length || 0
  }
})



export { chatSourceData, getchatLength };
