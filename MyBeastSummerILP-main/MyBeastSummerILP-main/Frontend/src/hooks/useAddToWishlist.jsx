import { useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const UseAddToWishlist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const addProject = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const userData = {
            "accessToken": localStorage.getItem('accessToken'),
            "mentor": id,
        };

        try {
            // Get CSRF token from cookies
            const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]+)/);
            const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : 'DUMMY_CSRF_TOKEN';

            const response = await axios.put(`http://127.0.0.1:8000/api/registration/wishlist/`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            });

            if (response.status === 201) {
                setSuccess(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Project added to wishlist',
                    showConfirmButton: false,
                });
            } else if (response.status === 400) {
                const errorMessage = response.data;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage,
                });
                setError(errorMessage);
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { addProject, success };
};

export default UseAddToWishlist;
