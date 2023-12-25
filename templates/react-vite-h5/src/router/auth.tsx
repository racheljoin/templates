import { redirect } from 'react-router-dom';

const isLogin = () => false;

export async function authLoader() {
  if (isLogin()) {
    return {
      isLogin: true,
    };
  } else {
    return redirect('/login');
  }
}
