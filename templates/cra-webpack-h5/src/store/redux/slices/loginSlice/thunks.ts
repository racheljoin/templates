import { createAppAsyncThunk } from "@/store/redux/createAppAsyncThunk";
import { loginSendSms, smsLogin } from "@/service/models/load";
import { isValidPhone } from "./util";

export const loginAsync = createAppAsyncThunk(
  "login/loginAsync",
  async ({
    code,
    userPhone,
    acceptNotes,
  }: {
    code: string;
    userPhone: string;
    acceptNotes: "Y" | "N";
  }) => {
    if (!isValidPhone(userPhone)) {
      return Promise.reject("请输入合法的手机号码");
    }

    if (!code) {
      return Promise.reject("请填写验证码");
    }

    const response = await smsLogin({
      code,
      userPhone,
      acceptNotes,
    });

    if (response.data.code !== "100000") {
      return Promise.reject(response.data.msg);
    }

    return response;
  }
);

export const loginSendSmsAsync = createAppAsyncThunk(
  "login/loginSendSmsAsync",
  async ({
    code,
    userPhone,
    acceptNotes,
  }: {
    code?: string;
    userPhone: string;
    acceptNotes: "Y" | "N";
  }) => {
    if (!isValidPhone(userPhone)) {
      return Promise.reject("请输入合法的手机号码");
    }

    if (acceptNotes !== "Y") {
      return Promise.reject("请同意用户协议");
    }

    const response = await loginSendSms({
      code,
      userPhone,
      acceptNotes,
    });

    return response;
  }
);
