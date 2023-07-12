declare namespace Chat {
  interface Chat {
    content: string;
    dateTime: string;
    inversion: boolean;
    isLoading?: boolean;
    conversationOption?: ConversationRequest;
    requestOptions: { prompt: string; options?: ConversationRequest | null };
  }

  interface HistoryItem {
    isEdit: boolean,
    title: string,
    uid: number
  }

  interface chatItem {
    uid: number,
    data: Chat.Chat
  }

  interface ChatState {
    active: number,
    history: Array<HistoryItem>,
    chats: Array<chatItem | {}>
  }



  interface ConversationRequest {
    parentMessageId?: string;
    conversationId?: string;
  }

  interface ConversationResponse {
    conversationId: string;
    detail: {
      choices: {
        finish_reason: string;
        index: number;
        logprobs: any;
        text: string;
      }[];
      created: number;
      id: string;
      model: string;
      object: string;
      usage: {
        completion_tokens: number;
        prompt_tokens: number;
        total_tokens: number;
      };
    };
    id: string;
    parentMessageId: string;
    role: string;
    text: string;
  }
}
