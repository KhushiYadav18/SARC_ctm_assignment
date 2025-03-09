import { useState, useCallback } from 'react';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const UseFetchBlog = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [blogs, setBlogs] = useState(null);

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const userData = {
            "accessToken": localStorage.getItem('accessToken'),
        }

        try {
            // Get CSRF token from cookies
            const csrfTokenMatch = document.cookie.match(/csrftoken=([^;]+)/);
            const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : 'DUMMY_CSRF_TOKEN';

            axios.get(`/api/blog/fetch`, userData , {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    setSuccess(true);
                    setBlogs(response.data);
                }
                if (response.status === 400) {
                    const jsonData = await response.json();
                    setError(jsonData['error']);
                }
            })



        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    return { fetchBlogs, setError, loading, error, success, blogs, setBlogs };
};

export default UseFetchBlog;
