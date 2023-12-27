import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSlice } from '../store/redux/slices/loginSlice/loginSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = () => {
    dispatch(loginSlice.actions.login());
    navigate('/');
  };

  return (
    <div>
      <p>登录页面</p>
      <button onClick={handleLogin}>点击登录</button>
    </div>
  );
}

export default Login;
