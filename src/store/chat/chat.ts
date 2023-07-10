import { atom, selector } from "recoil";

const MychatList = atom({
  key: "chatList",
  default: [] as unknown as Chat.Chat[], // 后续换成从
});

// const changeChatList = selector({
//   key: "changeChatList",
//   get: ({ get }) => {
//     // console.log("chatList", get(chatList));
//     return get(chatList);
//   },
//   set: ({ set }, newvalue) => {
//     // console.log(" newValue", newvalue);
//     return set(chatList, newvalue);
//   },
// });

export { MychatList };
