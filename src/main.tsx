import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/components/App/App';
import { RouterProvider } from 'react-router-dom';
import { router } from 'src/utills/router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
