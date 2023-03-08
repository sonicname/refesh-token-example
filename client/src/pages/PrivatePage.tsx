import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/authContext';

const PrivatePage = () => {
  const { fetchPrivate, token } = useAuthContext();

  useEffect(() => {
    fetchPrivate();
  }, [token]);

  return (
    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui doloribus aut placeat fugit,
      repellat officiis, inventore magnam natus, optio provident magni corrupti cum consequuntur vel
      dignissimos quo voluptate sit. Consectetur.
    </div>
  );
};

export default PrivatePage;
