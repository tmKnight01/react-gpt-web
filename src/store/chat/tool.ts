

const LOCAL_NAME = 'CHAT'


const defaultState = (): Chat.ChatState => {
    const uid = Date.now();
    return { active: uid, history: [{ uid, title: "Chat", isEdit: false }], chats: [{ uid, data: [] }] }
}

const getLocalState = () => {

}




export { defaultState, getLocalState };