import { useState, useCallback } from 'react';
import { json } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const UseFetchProjects = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [projects, setProjects] = useState(null);

    const fetchProjects = useCallback(async () => {
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

            axios.post(`http://127.0.0.1:8000/api/projects/`, userData , {
                headers: {
                    'Content-Type': 'application/json',
                    // Include CSRF token in headers
                    'X-CSRFToken': csrfToken,
                },
            }).then(async (response) => {
                if (response.status === 200) {
                    setSuccess(true);
                    setProjects(response.data);
                }
                if (response.status === 400) {
                    const jsonData = await response.json();
                    setError(jsonData['error']);
                }
            })


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

    return { fetchProjects, setError, loading, error, success, projects, setProjects };
};

export default UseFetchProjects;
