import { ls } from "@/utils/strage";
const LOCAL_NAME = "CHAT";

const defaultState = (): Chat.ChatState => {
    const uid = Date.now();
    return {
        active: uid,  // 初始化uid
        history: [{ uid, title: "Chat", isEdit: false }],
        chats: [{ uid, data: [] }],
    };
};

const getLocalState = () => {
    const localStrage = ls.get(LOCAL_NAME);

    return localStrage && localStrage.history.length !== 0 ? localStrage : defaultState()
};

export { defaultState, getLocalState };
