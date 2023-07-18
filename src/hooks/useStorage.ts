import { useRecoilValue } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import { ls } from "@/utils/strage";

const LOCAL_NAME = "CHAT";

function useStorage() {
  const sourceData = useRecoilValue(chatSourceData);
  const active = sourceData.active;

  function recordLocalStorage(ChatData: Chat.ChatState) { // 因为异步的原因 所以需要将最新的data数据传递给recordStorage
    ls.set(LOCAL_NAME, ChatData);
  }

  function getChatsByUid(uid: string) {
    if (uid)
      return (
        sourceData.chats.find((item) => item.uid === Number(uid))?.data ?? []
      );
    return (
      sourceData.chats.find((item) => Number(item.uid) === sourceData.active)?.data ??
      []
    );
  }

  return {
    active,
    recordLocalStorage,
    getChatsByUid,
  };
}

export default useStorage;
