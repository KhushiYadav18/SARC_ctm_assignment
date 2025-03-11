import { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

const useEditProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const editProfile = async (updatedProfile) => {
    setLoading(true);
    setError(null);
    const token = Cookies.get('jwt_token');

    try {
      const response = await axios.put('http://127.0.0.1:8001/api/profile/', updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return { editProfile, loading, error };
};

export default useEditProfile;