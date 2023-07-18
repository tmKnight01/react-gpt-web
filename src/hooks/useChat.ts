import { useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import { useNavigate } from "react-router-dom";
import useStorage from "./useStorage";
import { clone, cloneDeep } from "lodash";



const useChat = () => {
  const navigate = useNavigate();
  const [sourceData, setSourceData] = useRecoilState(chatSourceData);
  const { recordLocalStorage } = useStorage();

  const addChat = (uid: string, newItem: Chat.Chat) => {
    const idx = sourceData.history.findIndex(
      (item) => item.uid === Number(uid)
    );
    console.log('idx,uid', idx, uid)
    if (idx !== -1) {
      setSourceData((lastSource) => {
        const cloneData = cloneDeep(lastSource);
       
        cloneData.chats[idx].data.push(newItem);
        console.log('chats', cloneData);
        recordLocalStorage(cloneData);
        return cloneData;
      });
    }
  };

  const updateChat = async (
    uid: string,
    idx: number,
    updateItem: Chat.Chat
  ) => {
    console.log("sourceData1", sourceData);
    const chatIndex = sourceData.chats.findIndex(
      (item) => item.uid === Number(uid)
    );
    if (chatIndex !== -1) {
      setSourceData((oldSource) => {
        const cloneData = cloneDeep(oldSource);
        const dataLength = cloneData.chats[chatIndex].data.length || 0;
        cloneData.chats[chatIndex].data[dataLength - 1] = updateItem;
        recordLocalStorage(cloneData);
        return cloneData;
      });
    }
  };

  const changeChat = (uid: number) =>
    setSourceData((oldSource) => {
      const cloneData = { ...oldSource, active: Number(uid) };
      recordLocalStorage(cloneData);
      return cloneData;
    });

  const addHistory = (history: Chat.HistoryItem) =>
    setSourceData((oldSource) => {
      const cloneData = cloneDeep(oldSource);
      cloneData.history.unshift(history);
      cloneData.active = history.uid;
      cloneData.chats.push({ uid: history.uid, data: [] });
      recordLocalStorage(cloneData);
      navigate(`/chat/${history.uid}`, {
        replace: true,
      });
      return cloneData;
    });

  return { addChat, updateChat, sourceData, addHistory, changeChat };
};

export default useChat;
