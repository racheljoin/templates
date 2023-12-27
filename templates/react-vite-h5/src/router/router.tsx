import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './errorPage.tsx';
import { AuthLoader } from './auth.tsx';
import App from '@/pages/App/index.tsx';
import Counter from '@/pages/Counter.tsx';
import Login from '@/pages/Login.tsx';
import Nav from '@/pages/Nav.tsx';
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
        loader: AuthLoader,
        element: <Counter />,
      },
    ],
  },
]);

export default router;
