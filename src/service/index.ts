import axios, {
  AxiosResponse,
  RawAxiosRequestHeaders,
  AxiosProgressEvent,
  AxiosRequestConfig,
  GenericAbortSignal,
} from "axios";
import { message } from "antd";
const intance = axios.create({
  baseURL:import.meta.env.VITE_APP_API_BASE_URL,
});
// import.meta.env.VITE_APP_API_BASE_URL
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
  beforeRequest?: () => void;
  afterRequest?: () => void; // 当请求数据失败时调用
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
  config?: AxiosRequestConfig;
  signal?: GenericAbortSignal;
}

export interface Response<T = any> {
  data: T;
  status: string;
  message: string | null; // fail response message
}

function http<T = any>({
  url,
  data,
  method,
  headers,
  onDownloadProgress,
  onUploadProgress,
  signal,
  beforeRequest,
}: //   afterRequest,
HttpOption) {
  const successHandler = (res: AxiosResponse<Response<T>>) => {
    //兼容下返回数据流的情况
    if (res.data.status === "Success" || typeof res.data === "string")
      return Promise.resolve(res.data.data);

    console.log("err mes", res.data);
    // 还有一个鉴权问题,后期处理
    message.error(res.data.message || "Error");
    throw new Error(res.data.message || "Error");
  };
  const failHandler = (err: Response<Error>) => {
    message.error(err.message || "Error");
    console.log("err.message", err.message);
    throw new Error(err.message || "Error");
  };
  method = method || "get";
  const params = Object.assign(
    typeof data === "function" ? data() : data ?? {},
    {}
  );
  // 在请求之前要做的操作
  beforeRequest?.();
  // debugger
  return method === "get"
    ? intance
        .get(url, { params, signal, onDownloadProgress })
        .then(successHandler, failHandler)
    : intance
        .post(url, params, { headers, onDownloadProgress, onUploadProgress })
        .then(successHandler, failHandler);
}

export default http;
