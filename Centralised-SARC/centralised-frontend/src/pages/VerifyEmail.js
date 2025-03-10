import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function VerifyEmail() {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/auth/verify-email/${token}/`);
        alert(response.data.message);
      } catch (error) {
        alert('Invalid or expired token.');
      }
    };
    
    verifyEmail();
  }, [token]);

  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl mb-4">Verifying Email...</h2>
    </div>
  );
}

export default VerifyEmail;
