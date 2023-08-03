import { useRecoilValue, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { chatSourceData } from "@/store/chat/chat";
import { cloneDeep } from "lodash";
import { ls } from "@/utils/strage";
const LOCAL_NAME = "CHAT";






function useStorage() {
  const sourceData = useRecoilValue(chatSourceData);
  const setSoureceData = useSetRecoilState(chatSourceData);
  const navigate = useNavigate();
  // const copySourceData = useMemo(()=>cloneDeep(sourceData),[sourceData]);
  const active = sourceData.active;

  function recordLocalStorage(ChatData: Chat.ChatState) { // 因为异步的原因 所以需要将最新的data数据传递给recordStorage\
    // setSoureceData(ChatData);
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

  function updateHistory(uid: number, item: Partial<Chat.HistoryItem>) {
    const idx = sourceData.history.findIndex(item => item.uid === uid);
    let copyData = cloneDeep(sourceData);


    if (idx !== -1)
      copyData.history[idx] = { ...copyData.history[idx], ...item }
    recordLocalStorage(copyData);
    setSoureceData(copyData);

  }
  function deleteHistory(idx: number) {
    const copyData = cloneDeep(sourceData);
    copyData.history.splice(idx, 1);
    console.log('idx,length', idx, copyData.history.length)

    if (copyData.history.length === 0) {
      copyData.active = null;
      reload(copyData);
      return;
    }

    if (idx === 0 && copyData.history.length !== 0) {
      copyData.active = copyData.history[0].uid;

      reload(copyData);
      return;
    }

    if (idx > 0 && copyData.history.length > 0) {
      copyData.active = copyData.history[idx - 1].uid;

      reload(copyData);
      return;
    }


  }




  function reload(Data: Chat.ChatState) {
    setSoureceData(Data)
    recordLocalStorage(Data);
    navigate(`/chat/${Data.active}`, {
      replace: true,
    });
  }

  return {
    active,
    recordLocalStorage,
    getChatsByUid,
    updateHistory,
    deleteHistory,

  };
}

export default useStorage;
