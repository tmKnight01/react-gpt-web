import { useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import useStorage from "./useStorage";
import { cloneDeep } from "lodash";

const useChat = () => {
  const [sourceData, setSourceData] = useRecoilState(chatSourceData);
  const { recordLocalStorage } = useStorage();

  const addChat = (uid: string, newItem: Chat.Chat) => {
    const idx = sourceData.history.findIndex(
      (item) => item.uid === Number(uid)
    );
    if (idx !== -1) {
      const cloneData = cloneDeep(sourceData);
      cloneData.chats[idx].data.unshift(newItem);
      setSourceData(cloneData);
      recordLocalStorage();
    }
  };

  const updateChat = (idx: number, updateItem: Chat.Chat) => {
    // setChatList((chatList) =>
    //   chatList.map((item, idx) => {
    //     if (idx === chatList.length - 1) return { ...updateItem };
    //     return item;
    //   })
    // );
  };

  return { addChat, updateChat, sourceData };
};

export default useChat;
