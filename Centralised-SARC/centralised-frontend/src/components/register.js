import React, { useState } from 'react';
import useRegister from '../hooks/useRegister';

const Register = () => {  // Ensure the function is properly defined
    const { registerUser, loading, error, success } = useRegister();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        roll_number: '',
        hostel_number: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(formData);
    };

    return (  // Make sure return is inside the function
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Roll Number</label>
                    <input type="text" name="roll_number" value={formData.roll_number} onChange={handleChange} required />
                </div>
                <div>
                    <label>Hostel Number</label>
                    <input type="text" name="hostel_number" value={formData.hostel_number} onChange={handleChange} required />
                </div>
                <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Register;  // Ensure this is correctly placed at the end
