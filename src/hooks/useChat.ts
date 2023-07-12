import { useRecoilState } from "recoil";
import { MychatList } from "@/store/chat/chat";

const useChat = () => {
  const [chatList, setChatList] = useRecoilState(MychatList);
  const addChat = (newListItem: Chat.Chat) =>
    setChatList((list) => [...list, newListItem]);

  const updateChat = (idx: number, updateItem: Chat.Chat) => {
    setChatList((chatList) =>
      chatList.map((item, idx) => {
        if (idx === chatList.length - 1) return { ...updateItem };
        return item;
      })
    );
  };

  return { addChat, updateChat, chatList };
};

export default useChat;
