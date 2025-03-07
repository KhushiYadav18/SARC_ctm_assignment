// useRegister.js
import { useState } from 'react';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const registerUser = async (formData) => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Registration successful! Check your email for verification.');
            } else {
                setError(data.error || 'An error occurred during registration.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error, success };
};

export default useRegister;
