import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UseLogin = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const Login = async (userData) => {
        setLoading(true);
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login/', userData);
            if (response.status === 200) {
                const { access, refresh } = response.data;
                
                localStorage.setItem('accessToken', access);
                Cookies.set('accessToken', access, { expires: 7 });
                Cookies.set('refreshToken', refresh, { expires: 7 });

                setSuccess(true);
                setError("");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.detail) {
                setError(error.response.data.detail);
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return { Login, error, setError, success, loading };
}

export default UseLogin;
