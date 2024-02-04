import axios from "axios";
// instance 和 config 的类型由 node_modules\axios\index.d.ts 文件中创建并且封装好了
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { GRequestConfig, GRequestInterceptors } from "./types";

class GRequest {
  instance: AxiosInstance;
  interceptors?: GRequestInterceptors;
  constructor(config: GRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
  }
  // 基于 Axios 封装的 request
  request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig) {
    return this.instance.request<T, R, D>(config);
  }
}

export default GRequest;
