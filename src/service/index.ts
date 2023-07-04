

import axios, {
  AxiosResponse,
  RawAxiosRequestHeaders,
  AxiosProgressEvent,
  AxiosRequestConfig,
  GenericAbortSignal,
} from "axios";
import { message } from "antd";
const intance = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
});

intance.interceptors.request.use(
  (config) => {
    // 后期需要进行auth鉴权
    return config;
  },
  (error) => {
    Promise.reject(error.response);
  }
);

intance.interceptors.response.use(
  (response: AxiosResponse) => {
    // 服务端统一返回数据格式，此处进行数据过滤
    if (response.status === 200) return response;

    throw Error(response.status.toString());
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 二次封装axios实例，暴露downloadProcess,header等选项
export interface HttpOption {
  method?: string;
  url: string;
  /*  该过滤器不需要区分data与params，直接将数据写入*/
  data?: any;
  headers?: RawAxiosRequestHeaders;
  beforeRequest: () => void;
  afterRequest: () => void; // 当请求数据失败时调用
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  config?: AxiosRequestConfig;
  signal?: GenericAbortSignal;
}

export interface Response<T = any> {
  data: T;
  status: string;
  message: string | null; // fail response message
}

const successHandler = (res: AxiosResponse<Response>) => {
  if (res.data.status === "Success") {
    // 与服务端约定好
    return res.data;
  }
  // 还有一个鉴权问题,后期处理
  Promise.reject(res.data);
};
const failHandler = (err: Response<Error>) => {
  message.error(err.message || "Error");
  throw new Error(err.message || "Error");
};

function http<T = any>({
  url,
  data,
  method,
  headers,
  onDownloadProgress,
  signal,
  beforeRequest,
//   afterRequest,
}: HttpOption) {
  method = method || "get";
  const params = Object.assign(
    typeof data === "function" ? data() : data ?? {},
    {}
  );
  // 在请求之前要做的操作
  beforeRequest?.();
  method === "get"
    ? intance.get(url, { params, signal }).then(successHandler, failHandler)
    : intance.post(url, { data, headers,onDownloadProgress}).then(successHandler, failHandler);
}

export default http;