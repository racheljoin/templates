import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Providers } from './store/providers.tsx';
import './index.css';
import router from './router/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>,
);
