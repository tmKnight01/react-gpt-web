import { atom, selector } from "recoil";

const chatList = atom({
  key: "chatList",
  default: [] as unknown as Chat.Chat[],  // 后续换成从
});


const changeChatList = selector({
    key: 'changeChatList',
    get: (({get})=> get(chatList)),
    set: ({set},newvalue) => set(chatList,newvalue)
});

export   {chatList,changeChatList}