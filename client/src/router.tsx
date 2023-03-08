import { createBrowserRouter } from 'react-router-dom';
import CommonLayout from './layouts/CommonLayout';
import PrivatePage from './pages/PrivatePage';
import SignInPage from './pages/SignInPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CommonLayout />,
    children: [
      {
        path: '/signin',
        element: <SignInPage />,
      },
      {
        path: '/private',
        element: <PrivatePage />,
      },
    ],
  },
]);

export default router;
