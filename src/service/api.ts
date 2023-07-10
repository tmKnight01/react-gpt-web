import http from "./index";
import type { GenericAbortSignal, AxiosProgressEvent } from "axios";

// 获取请求接口
export function getChatApi<T>(params: {
  prompt: string;
  signal?: GenericAbortSignal;
  options?: Chat.ConversationRequest;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const data = {
    prompt: params.prompt,
    options: params.options,
  };
  return http<T>({
    url: "/chat-process",
    method: "post",
    data,
    onDownloadProgress: params.onDownloadProgress,
    onUploadProgress: params.onUploadProgress,
    signal: params.signal,
  });
}
