import axios from 'axios';
import { useLocalStorage } from 'usehooks-ts';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  signIn: (payload: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  fetchPrivate: () => Promise<void>;
  token: string | undefined;
  username: string | undefined;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  signIn: () => {
    throw new Error('signIn method is empty!');
  },
  logout: () => {
    throw new Error('logout method is empty!');
  },
  fetchPrivate: () => {
    throw new Error('fetchPrivate method is empty!');
  },
  token: undefined,
  username: undefined,
});

const AuthProvider = (props: any) => {
  const [accessToken, setAccessToken] = useLocalStorage<string | undefined>(
    'accessToken',
    undefined,
  );
  const [refeshToken, setRefeshToken] = useLocalStorage<string | undefined>(
    'refeshToken',
    undefined,
  );

  const client = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  client.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response?.status === 401) {
        client
          .post<{ message: string; token: string }>('/refesh-token', {
            refeshToken,
          })
          .then((res) => {
            setAccessToken(res.data.token);
          })
          .catch(console.error);
      }
    },
  );

  const signIn = useCallback(async (payload: { username: string; password: string }) => {
    try {
      const { data } = await client.post<{ message: string; refeshToken: string; token: string }>(
        '/login',
        {
          username: payload.username,
          password: payload.password,
        },
      );

      setAccessToken(data.token);
      setRefeshToken(data.refeshToken);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(undefined);
    setRefeshToken(undefined);
  }, []);

  const fetchPrivate = async () => {
    try {
      await client.get('/private');
    } catch (e) {
      throw e;
    }
  };

  const value = {
    signIn,
    logout,
    token: accessToken,
    fetchPrivate,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used in AuthProvider');
  }

  return context;
};

export { AuthProvider, useAuthContext };
