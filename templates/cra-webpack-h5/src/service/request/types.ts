import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

// (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>

export interface GRequestInterceptors {
  requestInterceptor?: <T = any>(
    config: InternalAxiosRequestConfig<T>
  ) => InternalAxiosRequestConfig<T> | Promise<InternalAxiosRequestConfig<T>>;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}

export interface GRequestConfig extends AxiosRequestConfig {
  interceptors?: GRequestInterceptors;
}
