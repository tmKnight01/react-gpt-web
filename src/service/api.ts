import http from "./index";
import type { GenericAbortSignal, AxiosProgressEvent } from "axios";

// 获取请求接口
export function getChatApi<T>(params: {
  prompt: string;
  signal?: GenericAbortSignal;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  const data = {
    prompt: params.prompt,
  };
  return http<T>({
    url: "/chat-process",
    method: "post",
    data,
    onDownloadProgress: params.onDownloadProgress,
    signal: params.signal,
  });
}
