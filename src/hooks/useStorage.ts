import { useRecoilState } from "recoil";
import { chatSourceData } from "@/store/chat/chat";
import { ls } from "@/utils/strage";

const LOCAL_NAME = 'CHAT'

function useStorage() {

  const [sourceData, setSourceData] = useRecoilState(chatSourceData);

  const active = sourceData.active;

  function recordLocalStorage() {
    ls.set(LOCAL_NAME, sourceData)
  }

  // console.log(sourceData)
  // if (!sourceData?.chats.length) recordLocalStorage();


  return {
    active,
    recordLocalStorage
  };
}

export default useStorage;
