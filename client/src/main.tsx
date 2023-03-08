import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';

import router from './router';

import('antd/dist/reset.css').then(() => {
  import('./index.css');
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
