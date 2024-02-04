import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate('/startCheck');
  };
  const handleGotoRecord = () => {
    navigate('/reportRecord');
  };

  return <div className="linerBackgroundWithPerson  px-3 pb-20">欢迎</div>;
}

export default App;
