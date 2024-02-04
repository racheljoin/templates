import { createHashRouter } from 'react-router-dom';
import { getIndexData, getReportData } from './loaders.tsx';
import App from '@/pages/App/index.tsx';
import Login from '@/pages/Login/index.tsx';
const router = createHashRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    children: [
      {
        path: '/',
        id: 'indexData',
        loader: getIndexData,
        element: <App />,
      },
    ],
  },
]);

export default router;
