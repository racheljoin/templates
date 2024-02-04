/* Instruments */
import { counterSlice } from './slices';
import { loginSlice } from './slices/loginSlice';

export const reducer = {
  counter: counterSlice.reducer,
  login: loginSlice.reducer,
};
