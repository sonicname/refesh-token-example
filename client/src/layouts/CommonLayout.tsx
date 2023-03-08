import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const CommonLayout = () => {
  const navigate = useNavigate();

  const { isLoggedIn, logout, username } = useAuthContext();

  return (
    <div className='min-w-full min-h-screen'>
      <header className='px-2 shadow-md py-4 sticky top-0 flex items-center justify-between'>
        <div className='text-black font-bold text-2xl'>Refesh Token</div>

        <div className='flex items-center gap-x-4'>
          <Button
            className='bg-blue-500 hover:opacity-90 duration-150 text-white font-bold shadow-md'
            size='large'
            onClick={() => navigate('/signin')}
          >
            Sign in
          </Button>
          <Button
            className='bg-blue-500 hover:opacity-90 duration-150 text-white font-bold shadow-md'
            size='large'
            onClick={logout}
          >
            Logout
          </Button>

          <Button
            className='bg-green-600 hover:opacity-90 duration-150 text-white font-bold shadow-md'
            size='large'
            onClick={() => navigate('/private')}
          >
            Private
          </Button>
        </div>
      </header>

      <div className='pt-8 max-w-6xl px-5 mx-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default CommonLayout;
