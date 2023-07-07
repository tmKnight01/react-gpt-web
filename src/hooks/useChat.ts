import { useRecoilState } from "recoil";
import { changeChatList } from "@/store/chat/chat";


const useChat = () => {
  const [chatList, setChatList] = useRecoilState(changeChatList);

  const addChat = (newListItem: Chat.Chat) => {
    console.log("chatList", chatList);
    setChatList([...chatList, newListItem]);
  };
  const updateChat = (idx: number, updateItem: Chat.Chat) => {
    const newList = chatList.map((item, idx) => {
      if ((idx = chatList.length - 1)) return { ...updateItem }; //
      return item;
    });
    setChatList(newList);
  };

  return { addChat, updateChat, chatList };
};

export default useChat;
// const updateChat = useCallback(
//     (idx: number, chatItem: Chat.Chat) => {
//       // const newChatList  =
//       setTimeout(
//         () =>
//           setChatList((value) => {
//             console.log("chatList", value);
//             const newList = value.map((item, index) => {
//               console.log("itemText", chatItem.content);
//               if (index === value.length - 1) return { ...chatItem };
//               return item;
//             });
//             console.log("newList", newList);
//             return newList;
//           }),
//         1000
//       );
//     },
//     [chatList]
//   );
