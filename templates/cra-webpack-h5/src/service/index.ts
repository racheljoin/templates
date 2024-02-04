// src\service\index.ts
// service 统一出口
import { AxiosResponse } from "axios";
import GRequest from "./request";
import { IRequest } from "./types";
import { reduxStore } from "@/store/redux";
import { loginSlice } from "@/store/redux/slices/loginSlice";
import { getLoginLocalStorage } from "@/store/redux/slices/loginSlice/util";
// 配置 BASE_URL
// import { BASE_URL, TIME_OUT } from "./request/config";

const responseInterceptor = (res: AxiosResponse<IRequest<unknown>>) => {
  if (res.data.code === "200000") {
    reduxStore.dispatch(loginSlice.actions.logout());
    window.location.hash = "#/login";
  }
  return res;
};

const r = new GRequest({
  interceptors: {
    responseInterceptor,
  },
});
// 加token校验的
const t = new GRequest({
  interceptors: {
    requestInterceptor(config) {
      const userData = getLoginLocalStorage();
      if (userData?.token) {
        config.headers.token = userData.token;
      }
      return config;
    },
    responseInterceptor,
  },
});

export { t };

// 导出
export default r;
