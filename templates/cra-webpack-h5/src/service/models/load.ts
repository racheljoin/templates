import { AxiosResponse } from "axios";
import r from "..";

export interface IUserData {
  id: string;
  token: string;
  userCode: string;
  userPhone: string;
}
interface ISmsLoginParams {
  code: string;
  acceptNotes: "Y" | "N";
  userPhone: string;
}
interface ISmsLoginRes {
  code: string;
  detail: null | IUserData;
  msg: string;
}

export const smsLogin = ({ code, acceptNotes, userPhone }: ISmsLoginParams) => {
  return r.request<ISmsLoginParams, AxiosResponse<ISmsLoginRes>>({
    url: "/api/user_login/smsLogin",
    method: "post",
    data: {
      acceptNotes,
      code,
      userPhone,
    },
  });
};

interface ILoginSendSmsParams {
  code?: string;
  acceptNotes: "Y" | "N";
  userPhone: string;
}
// 发验证码
export const loginSendSms = ({
  code = "",
  acceptNotes,
  userPhone,
}: ILoginSendSmsParams) => {
  return r.request<ILoginSendSmsParams, AxiosResponse<ISmsLoginRes>>({
    url: "/api/user_login/loginSendSms",
    method: "post",
    data: {
      acceptNotes,
      code,
      userPhone,
    },
  });
};
