import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/');
        return;
      }
      
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/auth/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        alert('Failed to fetch user profile');
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl mb-4">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Roll Number:</strong> {user.roll_number}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Hostel Number:</strong> {user.hostel_number}</div>
      <div><strong>Verified:</strong> {user.is_verified ? 'Yes' : 'No'}</div>
    </div>
  );
}

export default Profile;
