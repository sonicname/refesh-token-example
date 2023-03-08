import { Button, Input } from 'antd';
import { FormEvent, useState } from 'react';
import { useAuthContext } from '../contexts/authContext';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuthContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn({
      username,
      password,
    });
  };

  return (
    <div className='text-center flex items-center flex-col select-none'>
      <h1 className='font-bold text-3xl text-center'>Sign In</h1>

      <div className='mt-10'>
        <form
          className='flex flex-col gap-y-5 items-center shadow-lg p-10 rounded-md border border-gray-200'
          onSubmit={handleSubmit}
        >
          <div className='flex items-center gap-x-5'>
            <label htmlFor='username'>Username</label>
            <Input id='username' name='username' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='flex items-center gap-x-5'>
            <label htmlFor='password'>Password</label>
            <Input id='password' name='password' onChange={(e) => setPassword(e.target.value)} />
          </div>

          <Button htmlType='submit' className='max-w-[100px] font-bold bg-blue-600 text-white'>
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
