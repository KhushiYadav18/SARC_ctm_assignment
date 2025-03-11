import { useState, useCallback } from 'react';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const UseDeleteFromWishlist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const deleteProject = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const userData = {
            "accessToken": localStorage.getItem('accessToken'),
            "mentor": id,
        }

        try {
            // Get CSRF token from cookies
            const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]+)/);
          const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : 'DUMMY_CSRF_TOKEN';

            const response = await axios.post(`http://127.0.0.1:8001/api/registration/wishlist/`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token in headers
                    'X-CSRFToken': csrfToken,
                },
            })

            if (response.status === 200) {
                setSuccess(true);
                Swal.fire({
                    icon: 'success',
                    title: 'Project Removed to wishlist',
                    showConfirmButton: false,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data,
                })
                setError(response.data);
            }



            // const response = await fetch('/api/mentors/', {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         // Include CSRF token in headers
            //         'X-CSRFToken': csrfToken,
            //     },
            //     body: JSON.stringify(userData),
            // });



        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { deleteProject, success };
};

export default UseDeleteFromWishlist;
