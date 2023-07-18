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

    console.log("sourceData", sourceData, idx);
    if (idx !== -1) {
      setSourceData((lastSource) => {
        const cloneData = cloneDeep(lastSource);
        cloneData.chats[idx].data.push(newItem);
        recordLocalStorage(cloneData);
        return cloneData;
      });

    }
  };

  const updateChat = (uid: string, idx: number, updateItem: Chat.Chat) => {
    const chatIndex = sourceData.chats.findIndex(
      (item) => item.uid === Number(uid)
    );
    if (chatIndex !== -1) {
      setSourceData((oldSource) => {
        const cloneData = cloneDeep(oldSource);
        cloneData.chats[chatIndex].data[idx] = updateItem;
        recordLocalStorage(cloneData);
        return cloneData;
      });
    }
  };

  return { addChat, updateChat, sourceData };
};

export default useChat;
