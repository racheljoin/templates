import { useState } from 'react';
import './index.scss';
import { useDispatch } from '@/store/redux';

function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    // const res = await dispatch()
  };

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPhoneNumber(e.target.value);
  };

  return (
    <div className="login container bg-fixed bg-cover bg-top flex flex-col items-center">
      <div className="aspect-square w-44 mt-14 mb-3" />
      <p className="italic font-bold text-xl font-sans mb-1">您好，欢迎登录</p>
      <div className="w-full px-6 leading-10 mb-4">
        <input
          className="w-full border-b outline-none text-base rounded-none  bg-transparent"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="手机号码"
          type="tel"
          pattern="tel"
        />
      </div>

      <div className="w-full px-12 mt-6">
        <button onClick={handleLogin}>登录</button>
      </div>
    </div>
  );
}

export default Login;
