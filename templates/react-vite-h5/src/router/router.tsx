import { createBrowserRouter } from 'react-router-dom';
import App from '@/pages/App/index.tsx';
import Counter from '@/pages/Counter.tsx';
import Login from '@/pages/Login.tsx';
import Nav from '@/pages/Nav.tsx';
import ErrorPage from './errorPage.tsx';
import { authLoader } from './auth.tsx';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Nav />,
    children: [
      {
        path: 'stateDemo',
        element: <App />,
      },
      {
        path: 'reduxDemo',
        loader: authLoader,
        element: <Counter />,
      },
    ],
  },
]);

export default router;
