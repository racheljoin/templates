import { redirect } from 'react-router-dom';
import { reduxStore } from '@/store/redux';

const isLogin = () => {
  const { token } = reduxStore.getState().login;
  return !!token;
};

export async function AuthLoader() {
  if (isLogin()) {
    return {
      isLogin: true,
    };
  }
  return redirect('/login');
}
