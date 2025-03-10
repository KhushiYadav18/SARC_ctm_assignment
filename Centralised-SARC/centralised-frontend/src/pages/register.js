import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    roll_number: '',
    hostel_number: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Sent:", formData);

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/auth/register/',
            JSON.stringify(formData),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        alert(response.data.message);
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error("Backend Error:", error.response.data);
            alert(`Registration failed: ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // Request was made but no response received
            console.error("No Response Received:", error.request);
            alert('No response from the backend. Please check if the server is running.');
        } else {
            // Something else caused the error
            console.error("Error:", error.message);
            alert('An unknown error occurred. Please try again.');
        }
    }
};


  return (
    <div className="bg-white p-8 rounded shadow-md w-96">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="mb-4" key={key}>
            <input
              type={key === 'password' ? 'password' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={key}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
        <button className="w-full p-2 bg-blue-500 text-white rounded">Register</button>
      </form>
    </div>
  );
}

export default Register;
