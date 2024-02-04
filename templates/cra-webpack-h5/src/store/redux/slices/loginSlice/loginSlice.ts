/* Core */
import { createSlice } from "@reduxjs/toolkit";
import {
  clearLoginLocalStorage,
  getLoginLocalStorage,
  setLoginLocalStorage,
} from "./util";
import { loginAsync, loginSendSmsAsync } from "./thunks";
import { Toast } from "fe-react-pop";

const initState = getLoginLocalStorage();

const initialState: LoginSliceState = {
  ...initState,
  token: initState?.token ?? "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = "";
      clearLoginLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        const { payload } = action;
        const { detail } = payload.data;
        if (detail) {
          setLoginLocalStorage(detail);
          state.token = detail.token;
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        Toast({
          content: action.error.message ?? "",
        });
      });

    builder.addCase(loginSendSmsAsync.rejected, (state, action) => {
      Toast({
        content: action.error.message ?? "",
      });
    });
  },
});

export const { logout } = loginSlice.actions;

/* Types */
export interface LoginSliceState {
  token: string;
}

