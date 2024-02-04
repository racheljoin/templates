/* Core */
import { createSlice } from "@reduxjs/toolkit";
import { token } from "./selectors";
import {
  clearLoginLocalStorage,
  getLoginLocalStorage,
  setLoginLocalStorage,
} from "./util";

const initToken = getLoginLocalStorage();

const initialState: LoginSliceState = {
  token: initToken?.token ?? "",
};

export const loginSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state) => {
      state.token = "loginToken";
      setLoginLocalStorage({
        token,
      });
    },
    logout: (state) => {
      state.token = "";
      clearLoginLocalStorage();
    },
  },
});

/* Types */
export interface LoginSliceState {
  token: string;
}

